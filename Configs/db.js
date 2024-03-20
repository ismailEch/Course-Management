// Require dotenv in app.js
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL )
    .then(() => {
        console.log('Connection successful');
    })
    .catch((err) => {
        console.error('Connection error:', err);
    });