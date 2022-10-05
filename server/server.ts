import { type } from "os";
import ClientError from "./client-error";
import errorMiddleware from "./error-middleware";
var express = require('express');
require('dotenv').config({ path: '../.env' });
const port = process.env.PORT || 5001;
var dbo = require('./db/conn');

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

app.use(errorMiddleware);

app.listen(port, () => {
  dbo.connectToServer(function (err: any) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
