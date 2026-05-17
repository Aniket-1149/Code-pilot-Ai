const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  eventType: { type: String, required: true },
  payload: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
