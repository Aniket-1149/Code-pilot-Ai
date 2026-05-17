const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  path: { type: String, required: true },
  language: { type: String },
  content: { type: String },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

FileSchema.index({ project: 1, path: 1 }, { unique: true });

module.exports = mongoose.model('File', FileSchema);
