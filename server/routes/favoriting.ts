import ClientError from "../client-error";

var express = require('express');
const favoritingRoute = express.Router();
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

favoritingRoute
.route('/characters/upsert')
.post(async (req: any, response: any, next: any) => {
  console.log(req.body)
  let db_connect = dbo.getDb();
  try {
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

favoritingRoute
  .route('/characters/get')
  .post(async (req: any, response: any, next: any) => {
    let db_connect = dbo.getDb();
    try {
      db_connect
        .collection('profiles')
        .findOne({email: req.body.email}, {projection: {favorites: 1} }, (err: any, res: any) => {
          if(err) throw err;
          if(!res) throw new ClientError(400, 'Invalid email');
          response.json(res);
        })
    } catch(e) {
      next(e);
    }
  })

module.exports = favoritingRoute;
