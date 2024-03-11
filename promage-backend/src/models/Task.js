const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

module.exports = mongoose.model('Task', taskSchema);