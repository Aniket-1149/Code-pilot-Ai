const User = require('../models/User');

async function addWorkspace(userId, workspace) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { workspaces: workspace } },
    { new: true }
  );
}

module.exports = { addWorkspace };
