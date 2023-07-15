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
    db_connect
      .collection('profiles')
      .findOne({ username: profileObj.username }, (err: any, existingUser: { username?: string }) => {
        if (err) throw err;
        if (existingUser) {
          return res.status(400).json({ username: existingUser.username });
        }
        db_connect
          .collection('profiles')
          .findOne({ email: profileObj.email }, (err: any, existingUser: { email?: string }) => {
            if (err) throw err;
            if (existingUser) {
              return res.status(400).json({ email: existingUser.email });
            }
            db_connect
              .collection('profiles')
              .insertOne(profileObj, (err: any, existingUser: { acknowledged: boolean, id: number }) => {
                if (err) throw err;
                res.status(201).json(existingUser);
              });
          })
      })
  } catch (e) {
    next(e);
  }
}

async function signin(req: any, res: any, next: Function) {
  let db_connect = dbo.getDb();
  let { email, password } = req.body;
  if (email === 'demoaccount@gmail.com' && !password) {
    password = process.env.DEMO_ACCOUNT;
  }
  db_connect
  .collection('profiles')
  .findOne({ email: email }, async function (err: any, existingUser: any) {
    try {
      if (err) throw err;
      if (!existingUser) throw new ClientError(400, 'Invalid email');
      const checkPassword = await argon2.verify(existingUser.password, password);
      if (!checkPassword) {
        throw new ClientError(400, 'Invalid password');
      }
      const payload: { id: number, username: string, email: string } = {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
      }
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);
      res.status(200).json({
        token: token,
        account: payload
      });
    } catch (e) {
    next(e);
    }
  })
}

module.exports = {
  createAccount,
  signin,
}
