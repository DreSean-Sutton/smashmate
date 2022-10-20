import ClientError from "./client-error";
import errorMiddleware from "./error-middleware";
import path from 'path';
import dotenv from 'dotenv';
// const path = require('path');
var dbo = require('./db/conn');
var express = require('express');
// const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
// require('dotenv').config({ path: '../.env' });
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(function (req: any, res: any, next: any) {
  // Required to bypass CORS
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const registrationRoute = require('./routes/registration');
const favoritingRoute = require('./routes/favoriting');
app.use('/registration', registrationRoute);
app.use('/favoriting', favoritingRoute);

if(process.env.NODE_ENV === 'production') {
  // serve files from the client's build dir
  app.use(express.static(__dirname, '../../client/build'));
}
app.use('/api', (req: any, res: any) => {
  res.status(404).json({ error: `cannot ${req.method} ${req.url}` })
});

app.use((req: any, res: any) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});
app.use(errorMiddleware);

app.listen(port, () => {
  dbo.connectToServer(function (err: any) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
