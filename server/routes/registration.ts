import { profile } from "console";
import ClientError from "../client-error";
import errorMiddleware from "../error-middleware";

var express = require('express');
const registrationRoute = express.Router()
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');
const argon2 = require('argon2');

// ADD ACCOUNTS
registrationRoute
.route('/account/add')
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
        if(err) throw err;
        if(res) {
          response.json({ username: res.username });
        } else {
          console.log('This worked!');
          db_connect
            .collection('profiles')
            .findOne({ email: profileObj.email }, (err: any, res: any) => {
              if(err) throw err;
              if(res) {
                response.json({ email: res.email });
              } else {
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

registrationRoute
  .route('/account/sign-in')
  .get(function (req: any, response: any, next: any) {
    let db_connect = dbo.getDb();
    console.log('req.query value: ', req.query.email);
    const { email, password } = req.query;
    db_connect
    .collection('profiles')
    .findOne({ email: email }, function (err: any, res: any) {
      try {
        if (err) throw err;
        if (!res) {
          throw new ClientError(404, 'Email not found');
        }
        response.status(200).json(res);
      } catch(e) {
        return next(e);
      }
    })
  })

  module.exports = registrationRoute
