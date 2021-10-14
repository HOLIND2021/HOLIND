const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Setting up the main server app
const app = express();
const port = process.env.PORT || 5000;

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

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));