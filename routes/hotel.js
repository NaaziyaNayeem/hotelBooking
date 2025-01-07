const express = require('express');
const router = express.Router();

const hotels_data = require('../constants/hotels.json');

router.use(express.json());

router.get('/api/hotels', (req, res) => {
    const hotels = hotels_data.data;
    res.json(hotels);
});

module.exports = router;