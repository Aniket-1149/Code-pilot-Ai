const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  repoUrl: { type: String },
  settings: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
