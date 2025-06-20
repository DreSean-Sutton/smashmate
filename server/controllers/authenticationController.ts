import { sign } from "crypto";
import ClientError from "../client-error";
import Profile from "../model/profile";
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

async function createAccount(req: any, res: any, next: Function) {
  const hashedPassword = await argon2.hash(req.body.password);
  const profileObj = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    favorites: {
      fighterData: {},
      length: 0
    }
  };
  try {
    const findResult = await Profile.findOne({
      $or: [
        { username: profileObj.username },
        { email: profileObj.email },
      ]
    });
    if(findResult?.username === profileObj.username) {
      return res.status(400).json({ username: findResult.username });
    }
    if (findResult?.email === profileObj.email) {
      return res.status(400).json({ email: findResult.email });
    }

    const newProfile = new Profile(profileObj);
    const { email, username } = await newProfile.save();
    res.status(201).json({ email: email, username: username });

  } catch (e: any) {
    console.error('Account creation failed: ', e);
    next(e);
  };
};

async function signin(req: any, res: any, next: Function) {
  let { email, password } = req.body;
  try {
    const result = await Profile.findOne({ email: email });
    console.log('Signin result: ', result);
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
    console.error('Sign in failed: ', e);
    next(e);
  }
}

async function signinDemo(req: any, res: any, next: Function) {
  let { username, email, password } = req.body;
  if (username === 'Demo' && email === 'demoaccount@gmail.com' && !password) {
    password = process.env.DEMO_ACCOUNT;
  }

  try {
    let findResult = await Profile.findOne({ username: username, email: email });

    // If demo account does not exist, create it
    if (!findResult) {
      console.log('Creating demo account');
      const hashedPassword = await argon2.hash(password);
      const profileObj = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        favorites: {
          fighterData: {},
          length: 0
        }
      };

      const newProfile = new Profile(profileObj);
      const { email, username } = await newProfile.save();
      if (!email || !username) {
        throw new ClientError(500, 'Demo account creation failed');
      }
      console.log('Demo account created');
      findResult = await Profile.findOne({ username: username, email: email });
    }

    const payload: { id: number, username: string, email: string } = {
      id: findResult._id,
      username: findResult.username,
      email: findResult.email
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    console.log('Demo sign in successful, token generated');
    res.status(200).json({
      token: token,
      account: payload
    });

  } catch (e: any) {
    console.error('Demo sign in failed: ', e);
    next(e);
  }
}

async function deleteAccount(req: any, res: any, next: Function) {
  let { username, password } = req.body;
  if (username === 'Demo' && !password) {
    password = process.env.DEMO_ACCOUNT;
  }
  try {
    const findResult = await Profile.findOne({ username: username });
    if (!findResult) throw new ClientError(404, 'User does not exist');
    const checkPassword = await argon2.verify(findResult.password, password);
    if(!checkPassword) throw new ClientError(400, 'Invalid password');
    await Profile.deleteOne({ username: username });
    return res.status(204).json({});
  } catch (e: any) {
    console.error('Account deletion failed: ', e);
    next(e);
  };
};

module.exports = {
  createAccount,
  signin,
  signinDemo,
  deleteAccount,
}
