var express = require('express');
const registration = express.Router()
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');
const argon2 = require('argon2')
// ADD ACCOUNTS
registration
  .route('/add/account')
  .post(async function (req: any, response: any) {
    let db_connect = dbo.getDb();
    const hashedPassword = await argon2.hash(req.body.password)
    let myobj = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    db_connect
      .collection('profiles')
      .insertOne(myobj, function (err: any, res: any) {
        if (err) throw err;
        response.json(res);
      });
  });

  module.exports = registration
