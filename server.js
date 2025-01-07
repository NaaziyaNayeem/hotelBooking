const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

const bookingRoutes = require('./routes/booking');
const hotelRoutes = require('./routes/hotel');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bookingRoutes);
app.use(hotelRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
})