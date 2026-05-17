const User = require('../models/User');

async function getUserById(id) {
  return User.findById(id);
}

module.exports = { getUserById };
