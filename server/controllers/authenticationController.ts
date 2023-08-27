import ClientError from "../client-error";
const dbo = require('../db/conn');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

async function createAccount(req: any, res: any, next: Function) {
  let db = dbo.getDb();
  const hashedPassword = await argon2.hash(req.body.password);
  let profileObj = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    favorites: req.body.favorites
  };
  try {
    const findUsernameResult = await db.collection('profiles').findOne({ username: profileObj.username });
    if (findUsernameResult) {
      return res.status(400).json({ username: findUsernameResult.username });
    }
    const findEmailResult = await db.collection('profiles').findOne({ email: profileObj.email });
    if (findEmailResult) {
      return res.status(400).json({ email: findEmailResult.email });
    }
    const insertResult = await db.collection('profiles').insertOne(profileObj);
    res.status(201).json(insertResult);

  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function signin(req: any, res: any, next: Function) {
  let db = dbo.getDb();
  let { email, password } = req.body;
  if (email === 'demoaccount@gmail.com' && !password) {
    password = process.env.DEMO_ACCOUNT;
  }
  try {
    const result = await db.collection('profiles').findOne({ email: email });
    if (!result) throw new ClientError(400, 'Invalid email');
    const checkPassword = await argon2.verify(result.password, password);
    if (!checkPassword) throw new ClientError(400, 'Invalid password');

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

async function deleteAccount(req: any, res: any, next: Function) {
  let db = dbo.getDb();
  let { username, password } = req.body;
  if (username === 'Demo' && !password) {
    password = process.env.DEMO_ACCOUNT;
  }
  try {
    const findResult = await db.collection('profiles').findOne({ username: username });
    if (!findResult) throw new ClientError(404, 'User does not exist');
    const checkPassword = await argon2.verify(findResult.password, password);
    if(!checkPassword) throw new ClientError(400, 'Invalid password');
    const { deleteResult } = await db.collection('profiles').deleteOne({ username: username });
    return res.status(204).json({});
  } catch (e: any) {
    console.error(e);
    next(e);
  }
}

module.exports = {
  createAccount,
  signin,
  deleteAccount,
}
