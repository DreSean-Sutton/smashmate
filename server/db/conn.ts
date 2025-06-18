const { MongoClient } = require('mongodb');
var mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: '../../.env' });

const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewURLParser: true,
  UseUnifiedTopology: true
});

const db = mongoose.connection;

module.exports = db;
