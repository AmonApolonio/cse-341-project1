const  dotnev = require('dotenv');
dotnev.config();

const MongoClient = require('mongodb').MongoClient;
let database;

const initDb = (callback) => {
  if (database) {
    console.warn('Db is already initialized');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
}

const getDatabase = () => {
  if (!database) {
    throw new Error('Db has not been initialized');
  }
  return database;
}

module.exports = {
  initDb,
  getDatabase,
};