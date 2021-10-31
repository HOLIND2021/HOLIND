const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/apiTest', controllers.apiTest);
router.get('/patients', controllers.patients);
router.get('/user/:uid', controllers.user);

module.exports = router;