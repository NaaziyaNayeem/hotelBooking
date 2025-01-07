const express = require('express');
const router = express.Router();
const fs = require('fs');

const hotel_bookings_data = require('../constants/hotel_bookings.json');
const hotels_data = require('../constants/hotels.json');

const hotel_bookings_file_path = 'constants/hotel_bookings.json';

router.use(express.json());

/*
 * Bookings
 */
router.get('/api/hotelBookings/:userId', (req, res) => {
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
                hotel: hotels.filter((h) => h.id == bookings.hotelId)
            }
        });
    res.json(userHotelBookings);
});

router.post('/api/createBookings', (req, res) => {
    const body = req.body;
    let jsonData = hotel_bookings_data.data;
    jsonData.push(body);
    fs.writeFile(hotel_bookings_file_path, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(400).send("Server error while writing to file");;
        } else {
            console.log("Added successfully!");
            return res.status(200).send({
                data: body
            });
        }
    });
});

/*
 * Hotels 
 */
router.get('/api/hotels', (req, res) => {
    const hotels = hotels_data.data;
    res.json(hotels);
});

module.exports = router;