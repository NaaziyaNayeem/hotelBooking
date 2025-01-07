const express = require('express');
const router = express.Router();
const fs = require('fs');

const hotel_bookings_data = require('../constants/hotel_bookings.json');
const hotels_data = require('../constants/hotels.json');

const hotel_bookings_file_path = 'constants/hotel_bookings.json';

router.use(express.json());

router.get('/api/bookings/:userId', (req, res) => {
    const userId = req.params.userId || null;
    if (!userId) {
        res.status(422).json({ message: "UserId is Required" })
    }
    const hotelBookings = hotel_bookings_data.data;
    const hotels = hotels_data.data;
    const userHotelBookings = hotelBookings.filter((val) => val.userId == userId)
        .map((bookings) => {
            return {
                ...bookings,
                hotel: hotels.find((h) => h.id == bookings.hotelId)
            }
        });
    res.json(userHotelBookings);
});

router.post('/api/booking/createOrEdit', (req, res) => {
    const body = req.body;
    let allBookings = hotel_bookings_data;
    
    let bookingIndex = allBookings.data.findIndex((val) => val.id == body.id);

    if (bookingIndex !== -1) {
        allBookings.data[bookingIndex] = body;
    } else {
        allBookings.data.push(body);
    }

    const hotels = hotels_data.data;

    fs.writeFile(hotel_bookings_file_path, JSON.stringify(allBookings, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(400).send("Server error while writing to file");;
        } else {
            const resData = body;
            resData.hotel = hotels.find((h) => h.id == resData.hotelId)
            return res.status(200).send({
                data: resData
            });
        }
    });
});

router.post('/api/booking/cancel/:bookingId', (req, res) => {
    const bookingId = req.params.bookingId;

    let allBookings = hotel_bookings_data;

    let bookingIndex = allBookings.data.findIndex((val) => val.id == bookingId);
    let booking = allBookings.data[bookingIndex];
    booking.status = 'CANCELLED';

    allBookings.data[bookingIndex] = booking;

    const hotels = hotels_data.data;

    fs.writeFile(hotel_bookings_file_path, JSON.stringify(allBookings, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(400).send("Server error while writing to file");;
        } else {
            const resData = booking;
            resData.hotel = hotels.find((h) => h.id == resData.hotelId)
            return res.status(200).send({
                data: resData
            });
        }
    });
});

module.exports = router;