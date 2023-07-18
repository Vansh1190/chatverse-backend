const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  mongoose.connect(process.env.Mongo_URI).then(() => {
    console.log('connected to MongoDb succesfully');
  });
};

module.exports = connect;
