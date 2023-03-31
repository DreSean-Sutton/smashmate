import ClientError from "../client-error";
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

async function updateFavorites(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  try {
    db_connect
      .collection('profiles')
      .findOneAndUpdate({email: req.body.email}, { $set: {favorites: req.body.favorites} }, {upsert: true}, (err: any, existingUser: any) => {
        if(err) throw err;
        res.status(201).json(existingUser);
      })
  } catch(e) {
    next(e);
  }
}

async function getFavorites(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  try {
    db_connect
      .collection('profiles')
      .findOne({ email: req.body.email }, { projection: { favorites: 1 } }, (err: any, existingUser: any) => {
        if (err) throw err;
        if (!existingUser) throw new ClientError(400, 'Invalid email');
        res.status(200).json(existingUser);
      })
  } catch (e) {
    next(e);
  }
}

module.exports = {
  updateFavorites,
  getFavorites,
};
