const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/apiTest', controllers.apiTest);
router.get('/patients', controllers.patients);
router.get('/user/:uid', controllers.user);
router.post('/createUser', controllers.createUser)

module.exports = router;