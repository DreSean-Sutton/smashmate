import ClientError from "./client-error";
import errorMiddleware from "./error-middleware";
const path = require('path');
require('dotenv').config({ path: '../.env' });
var express = require('express');
var db = require('./db/conn');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(function (req: any, res: any, next: any) {
  // Required to bypass CORS during development
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const authenticationRoutes = require('./controllers/authenticationRoutes');
const favoritingRoutes = require('./controllers/favoritingRoutes');
app.use('/api/auth', authenticationRoutes);
app.use('/api/favoriting', favoritingRoutes);

if(process.env.NODE_ENV === 'production') {
  // serve files from the client's build dir
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}
app.use((req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
})

app.use('/api', (req: any, res: any) => {
  res.status(404).json({ error: `cannot ${req.method} ${req.url}` })
});

// Serve index.html for everything else (for SPA routing)
app.get('*', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

app.use(errorMiddleware);

app.listen(port, () => {

  db.on('error', (err: any) => {
  console.error('Mongoose connection error: ', err);
});
db.once('open', () => {
  console.log('Successfully connected using Mongoose');
});
  // dbo.connectToServer(function (err: any) {
  //   if (err) console.error(err);
  // });
  // console.log(`Server is running on port: ${port}`);
});
