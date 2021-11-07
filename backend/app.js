const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Setting up the main server app
const app = express();

// Prints incoming server requests to the console
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Require Route
const api = require('./routes/routes');
// Configure app to use route
app.use('/api', api);

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

module.exports = app;