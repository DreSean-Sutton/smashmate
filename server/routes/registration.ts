import { profile } from "console";

var express = require('express');
const registration = express.Router()
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');
const argon2 = require('argon2');

// ADD ACCOUNTS
registration
  .route('/add/account')
  .post(async function (req: any, response: any) {
    let db_connect = dbo.getDb();
    const hashedPassword = await argon2.hash(req.body.password)
    let profileObj = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    db_connect
      .collection('profiles')
      .findOne({ username: profileObj.username }, function (err: any, res: any) {
        console.log('findOne1 value: ', res);
        if(err) throw err;
        if(res) {
          response.json({ username: res.username });
        } else {
          console.log('This worked!');
          db_connect
            .collection('profiles')
            .findOne({ email: profileObj.email }, (err: any, res: any) => {
              console.log('findOne2 value: ', res);
              if(err) throw err;
              if(res) {
                response.json({ email: res.email });
              } else {
                console.log('This worked, too!');
                db_connect
                  .collection('profiles')
                  .insertOne(profileObj, function (err: any, res: any) {
                    if (err) throw err;
                    console.log(res);
                    response.json(res);
                  });
              }
            })
        }
      })
  });

  module.exports = registration
