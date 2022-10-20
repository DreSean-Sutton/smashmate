const { MongoClient } = require('mongodb');
const Db = process.env.DATABASE_URL;
const port = process.env.PORT || 5001;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var _db: any;

async function start() {
  await client.connect()
  console.log("Connected")
  module.exports = client.db()
  const app = require('./app')
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  })
}

start()

// module.exports = {
//   connectToServer: function (callback: any) {
//     client.connect(function (err: any, db: any) {
//       if (db) {
//         // comment out below code to test server errors
//         _db = db.db('smashmateDB');
//         console.log('Successfully connected to MongoDB');
//       }
//       return callback(err);
//     });
//   },
//   getDb: function () {
//     return _db;
//   }
// };
