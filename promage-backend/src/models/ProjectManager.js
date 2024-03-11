const mongoose = require('mongoose');

const projectManagerSchema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('ProjectManager', projectManagerSchema);