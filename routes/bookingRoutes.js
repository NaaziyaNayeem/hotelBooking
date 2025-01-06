const express = require('express');
const router = express.Router();
const fs = require('fs');

const data = require('../constants/data.json');
const filePath = 'constants/data.json';

router.use(express.json());

/*
 * Bookings
 */
router.get('/api/hotelBookings/:userId', (req, res) => {
    const userId = req.params.userId || null;
    if (!userId) {
        res.status(422).json({ message: "UserId is Required" })
    }
    const hotelBookings = data.hotelBookings;
    const hotels = data.hotels;

    const userHotelBookings = hotelBookings.filter((val) => val.userId == userId)
        .map((bookings) => {
            return {
                ...bookings,
                hotel: hotels.filter((h) => h.id === bookings.hotelId)
            }
        });
    res.json(userHotelBookings);
});

router.post('/api/createBookings', (req, res) => {
    const body = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error:", err);
            return;
        }

        let jsonData = JSON.parse(data);
        body.id = jsonData.hotelBookings.length + 1;
        jsonData.hotelBookings.push(body);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
                return res.status(400).send("Server error while writing to file");;
            } else {
                console.log("Added successfully!");
                return res.status(200).send("Booking created successfully");;
            }
        });
    });
});

module.exports = router;