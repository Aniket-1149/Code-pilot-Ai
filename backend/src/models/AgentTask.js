const mongoose = require('mongoose');

const AgentTaskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  agentType: { type: String, required: true },
  status: { type: String, enum: ['queued', 'running', 'completed', 'failed'], default: 'queued' },
  input: { type: Object },
  output: { type: Object },
  error: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AgentTask', AgentTaskSchema);
