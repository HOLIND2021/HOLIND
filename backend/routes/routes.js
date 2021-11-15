const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/apiTest', controllers.apiTest);
router.get('/patients', controllers.patients);
router.get('/user/:uid', controllers.user);
router.post('/createUser', controllers.createUser);
router.post('/updatePatient', controllers.updatePatient);
router.get('/getPatient/:uid', controllers.getPatient);
router.delete('/deleteTask', controllers.deleteTask);

module.exports = router;