const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  description: String,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectManager',
  },
});
module.exports = mongoose.model('Project', projectSchema);
