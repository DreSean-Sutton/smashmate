import ClientError from "../client-error";
const { Profile } = require("../models/profile");

export async function updateFavorites(req: any, res: any, next: Function) {
  try {
    const upsertResult = await Profile.findOneAndUpdate(
      { email: req.body.email },
      { $set: { favorites: req.body.favorites } },
      { upsert: true, new: true }).select('favorites');
    res.status(201).json(upsertResult.toObject());
  } catch(e) {
    console.error('Favorite updating failed: ', e);
    next(e);
  }
}

export async function getFavorites(req: any, res: any, next: Function) {
  try {
    const result = await Profile.findOne({ email: req.body.email }).select('favorites');
    const resultObj = result.toObject(); // Mongoose select query doesn't return a REAL object
    if (!resultObj.hasOwnProperty('favorites')) throw new ClientError(400, 'Invalid email');
    res.status(200).json(resultObj);
  } catch (e) {
    console.error('Getting favorites failed: ', e);
    next(e);
  }
}
