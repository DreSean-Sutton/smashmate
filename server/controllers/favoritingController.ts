import ClientError from "../client-error";
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

export async function updateFavorites(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  try {
    const upsertResult = await db_connect.collection('profiles').findOneAndUpdate({email: req.body.email}, { $set: {favorites: req.body.favorites} }, {upsert: true});
    res.status(201).json(upsertResult);
  } catch(e) {
    console.error(e);
    next(e);
  }
}

export async function getFavorites(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  try {
    const result = await db_connect.collection('profiles').findOne({ email: req.body.email }, { projection: { favorites: 1 } });
    if (!result) throw new ClientError(400, 'Invalid email');
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
