const favoritingController = require('./favoritingController');
var express = require('express');
const favoritingRoutes = express.Router();

favoritingRoutes.post('/characters/upsert', favoritingController.updateFavorites);
favoritingRoutes.post('/characters/get', favoritingController.getFavorites);

module.exports = favoritingRoutes;
