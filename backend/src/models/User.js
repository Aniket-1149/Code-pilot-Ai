const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String },
  provider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
  providerId: { type: String },
  displayName: { type: String },
  avatarUrl: { type: String },
  role: { type: String, default: 'user' },
  workspaces: [WorkspaceSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
