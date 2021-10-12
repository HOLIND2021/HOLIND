const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/apiTest', controllers.apiTest);

module.exports = router;