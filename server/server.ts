import { type } from "os";
import ClientError from "./client-error";
import errorMiddleware from "./error-middleware";
var express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const port = process.env.PORT || 5001;
var dbo = require('./db/conn');
const app = express();
app.use(express.json());
app.use(cors());

const registrationRoute = require('./routes/registration');
app.use('/registration', registrationRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  dbo.connectToServer(function (err: any) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
