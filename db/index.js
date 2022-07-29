const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { db } = require('./models/entry');

let dbURI = process.env.dbURI;
let mongod = null;

// Connect to mongodb raffleEntry database
function connect() {
  return new Promise((resolve, reject) => {
    // Use a mock db for our unit tests
    if (process.env.NODE_ENV === 'test') {
      MongoMemoryServer.create().then((d) => {
        mongod = d;
        mongod.getUri().then((uri) => {
          dbURI = uri;
          const mongooseOpts = {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
          };
          mongoose.connect(dbURI, mongooseOpts).then((res, err) => {
            if (err) return reject(err);
            console.log(`MongoDB connected: ${res.connection.host}`);
            resolve();
          });
        });
      });
      // const Mockgoose = require('mockgoose').Mockgoose;
      // const mockgoose = new Mockgoose(mongoose);

      // mockgoose.prepareStorage().then(() => {
      //   mongoose.connect(DB_URI).then((res, err) => {
      //     if (err) return reject(err);
      //     console.log('connected to db');
      //     resolve();
      //   });
      // });
    } else {
      mongoose.connect(dbURI).then((res, err) => {
        if (err) return reject(err);
        console.log(`MongoDB connected: ${res.connection.host}`);
        resolve();
      });
    }
  });
}

function disconnect() {
  if (mongod) {
    mongoose.connection.close().then(() => {
      return mongod.stop();
    });
  } else {
    return mongoose.disconnect();
  }
}

module.exports = { connect, disconnect };
