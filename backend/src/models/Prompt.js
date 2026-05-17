const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  templateName: { type: String },
  variables: { type: Object },
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prompt', PromptSchema);
