const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://aman003malhotra:6284085887@cluster0.hcbyp.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(client => {
      console.log('connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
}

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database Found';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

