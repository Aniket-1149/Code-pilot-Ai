const mongoose = require('mongoose');

const DebugSessionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  stacktrace: { type: String },
  logs: { type: [String] },
  suggestions: { type: [String] },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('DebugSession', DebugSessionSchema);
