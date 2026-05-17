const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('../utils/errors');

async function registerUser({ email, password, displayName }) {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already in use', 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, displayName, provider: 'local' });
  return user;
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) throw new AppError('Invalid credentials', 401);

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new AppError('Invalid credentials', 401);

  return user;
}

async function upsertOAuthUser(provider, profile) {
  const providerId = profile.id;
  let user = await User.findOne({ provider, providerId });

  if (!user) {
    user = await User.create({
      provider,
      providerId,
      email: profile.emails?.[0]?.value,
      displayName: profile.displayName,
      avatarUrl: profile.photos?.[0]?.value
    });
  }

  return user;
}

function createToken(user) {
  const payload = { id: user.id, role: user.role, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

module.exports = { registerUser, loginUser, upsertOAuthUser, createToken };
