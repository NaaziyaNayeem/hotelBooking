const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
const bookingRoutes = require('./routes/bookingRoutes');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bookingRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
})