// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL||'mongodb://127.0.0.1:27017/promage';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   auth: {
//     user: 'yourUsername', // replace with your MongoDB username
//     password: 'yourPassword', // replace with your MongoDB password
//   },
  authSource: 'admin',
};

mongoose.connect(url, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = {
  url,
  options,
};
