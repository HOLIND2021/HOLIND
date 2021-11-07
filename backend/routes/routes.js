const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/patients', controllers.patients);
router.get('/user/:uid', controllers.user);
router.post('/createUser', controllers.createUser)
router.delete('/deleteUser/:uid', controllers.deleteUser);

module.exports = router;