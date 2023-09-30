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
// const Db = process.env.MONGO_URL;

// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// var _db: any;

// module.exports = {
//   connectToServer: function (callback: any) {
//     client.connect(function (err: any, db: any) {
//       if (db) {
//         // comment out below code to test server errors
//         _db = db.db('smashmate');
//         console.log('Successfully connected to MongoDB');
//       }
//       return callback(err);
//     });
//   },
//   getDb: function () {
//     return _db;
//   }
// };
