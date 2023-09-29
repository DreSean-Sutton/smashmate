import ClientError from "../client-error";
const { Profile } = require("../models/profile");

export async function updateFavorites(req: any, res: any, next: Function) {
  try {
    console.log("Profile value: ", Profile);
    const upsertResult = await Profile.findOneAndUpdate(
      { email: req.body.email },
      { $set: { 'favorites.fighterData': req.body.favorites.fighterData } },
      { upsert: true, new: true }
    );
    res.status(201).json(upsertResult);
  } catch(e) {
    console.error(e);
    next(e);
  }
}

export async function getFavorites(req: any, res: any, next: Function) {
  try {
    const result = await Profile.findOne({ email: req.body.email }, { projection: { favorites: 1 } });
    if (!result) throw new ClientError(400, 'Invalid email');
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
