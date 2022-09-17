import { type } from "os";

var express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const port = process.env.PORT || 5001;
var dbo = require('./db/conn');
const app = express();
app.use(express.json());
app.use(cors());

// const tetrisRoutes = require('./routes/tetris');
// app.use('/leaderboards', tetrisRoutes);

app.listen(port, () => {
  dbo.connectToServer(function (err: any) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
