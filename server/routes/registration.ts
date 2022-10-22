import { profile } from "console";
import { verify } from "crypto";
import ClientError from "../client-error";

var express = require('express');
const registrationRoute = express.Router();
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// ADD ACCOUNTS
registrationRoute
  .route('/account/add')
  .post(async function (req: any, response: any, next: Function) {
    let db_connect = dbo.getDb();
    const hashedPassword = await argon2.hash(req.body.password);
    let profileObj = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      favorites: []
    };
    try {
      db_connect
        .collection('profiles')
        .findOne({ username: profileObj.username }, (err: any, res: {username?: string}) => {
          if(err) throw err;
          if(res) {
            return response.status(400).json({ username: res.username });
          }
          db_connect
            .collection('profiles')
            .findOne({ email: profileObj.email }, (err: any, res: {email?: string}) => {
              if(err) throw err;
              if(res) {
                return response.status(400).json({ email: res.email });
              }
              db_connect
                .collection('profiles')
                .insertOne(profileObj, (err: any, res: {acknowledged: boolean, id: number}) => {
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
  .post(function (req: any, response: any, next: Function) {
    let db_connect = dbo.getDb();
    const { email, password } = req.body;
    db_connect
    .collection('profiles')
    .findOne({ email: email }, async function (err: any, res: any) {
      try {
        if (err){
          throw err
        };
        if (!res) {
          throw new ClientError(401, 'Invalid email');
        }
        const checkPassword = await argon2.verify(res.password, password)
        if(!checkPassword) throw new ClientError(401, 'Invalid password');
        const payload: { id: number, username: string, email: string } = {
          id: res._id,
          username: res.username,
          email: res.email
        }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        response.status(200).json({
          token: token,
          user: payload
        });
      } catch(e) {
        next(e);
      }
    })
  })

  module.exports = registrationRoute
