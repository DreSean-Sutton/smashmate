import ClientError from "../client-error";
const dbo = require('../db/conn');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

async function createAccount(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  const hashedPassword = await argon2.hash(req.body.password);
  let profileObj = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    favorites: req.body.favorites
  };
  try {
    const { username } = await db_connect.collection('profiles').findOne({ username: profileObj.username });
    if (username) {
      return res.status(400).json({ username: username });
    }
    const { email } = await db_connect.collection('profiles').findOne({ email: profileObj.email });
    if (email) {
      return res.status(400).json({ email: email });
    }
    const insertResult = await db_connect.collection('profiles').insertOne(profileObj);
    res.status(201).json(insertResult);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function signin(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  let { email, password } = req.body;
  if (email === 'demoaccount@gmail.com' && !password) {
    password = process.env.DEMO_ACCOUNT;
  }
  const result = await db_connect.collection('profiles').findOne({ email: email });
  try {
    if (!result) throw new ClientError(400, 'Invalid email');
    const checkPassword = await argon2.verify(result.password, password);
    if (!checkPassword) {
      throw new ClientError(400, 'Invalid password');
    }
    const payload: { id: number, username: string, email: string } = {
      id: result._id,
      username: result.username,
      email: result.email
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(200).json({
      token: token,
      account: payload
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

module.exports = {
  createAccount,
  signin,
}
