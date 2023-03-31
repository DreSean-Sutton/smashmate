var express = require('express');
const authenticationController = require('./authenticationController');
const registrationRoute = express.Router();

registrationRoute.post('/register', authenticationController.createAccount);
registrationRoute.post('/sign-in', authenticationController.signin);

module.exports = registrationRoute;
