import { profile } from "console";
import ClientError from "../client-error";

var express = require('express');
const registrationRoute = express.Router()
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');
const argon2 = require('argon2');

// ADD ACCOUNTS
registrationRoute
.route('/account/add')
.post(async function (req: any, response: any, next: any) {
  let db_connect = dbo.getDb();
  const hashedPassword = await argon2.hash(req.body.password)
    let profileObj = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    try {
      db_connect
        .collection('profiles')
        .findOne({ username: profileObj.username }, function (err: any, res: any) {
          if(err) throw err;
          if(res) {
            return response.status(400).json({ username: res.username });
          }
          db_connect
            .collection('profiles')
            .findOne({ email: profileObj.email }, (err: any, res: any) => {
              if(err) throw err;
              if(res) {
                return response.status(400).json({ email: res.email });
              }
              db_connect
                .collection('profiles')
                .insertOne(profileObj, function (err: any, res: any) {
                  if (err) throw err;
                  response.status(201).json(res);
                });
            })
        })
      } catch (e) {
        next(e);
      }
  });

registrationRoute
  .route('/account/sign-in')
  .get(function (req: any, response: any, next: any) {
    let db_connect = dbo.getDb();
    const { email, password } = req.query;
    db_connect
    .collection('profiles')
    .findOne({ email: email }, function (err: any, res: any) {
      try {
        if (err) throw err;
        if (!res) {
          throw new ClientError(400, 'Email not found');
        }
        response.status(200).json(res);
      } catch(e) {
        next(e);
      }
    })
  })

  module.exports = registrationRoute
