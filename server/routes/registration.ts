var express = require('express');
const registration = express.Router()
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

// ADD ACCOUNTS
registration
  .route('/add/account')
  .post(function (req: any, response: any) {
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    db_connect
      .collection('profiles')
      .insertOne(myobj, function (err: any, res: any) {
        if (err) throw err;
        response.json(res);
      });
  });

  module.exports = registration
