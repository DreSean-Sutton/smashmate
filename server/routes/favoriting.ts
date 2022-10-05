import { profile } from "console";
import { verify } from "crypto";
import ClientError from "../client-error";

var express = require('express');
const favoritingRoute = express.Router();
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

favoritingRoute
.route('/character/upsert')
.post(async function(req: any, response: any, next: any) {
  let db_connect = dbo.getDb();
  try {
    console.error('req value: ', req.body);
    db_connect
      .collection('profiles')
      .findOneAndUpdate({email: req.body.email}, { $set: {favorites: req.body.favorites} }, {upsert: true}, (err: any, res: any) => {
        if(err) throw err;
        response.status(201).json(res);
      })
  } catch(e) {
    next(e);
  }
})

module.exports = favoritingRoute;
