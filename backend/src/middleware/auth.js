const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');
const User = require('../models/User');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const devBypass = ['true', '1', 'yes'].includes((process.env.DEV_BYPASS_AUTH || '').toLowerCase());
  if (!token) {
    if (devBypass && process.env.NODE_ENV !== 'production') {
      try {
        const email = process.env.DEV_USER_EMAIL || 'dev@local';
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({ email, displayName: 'Dev User', provider: 'local' });
        }
        req.user = { id: user.id, role: user.role, email: user.email };
        return next();
      } catch (err) {
        return next(err);
      }
    }
    return next(new AppError('Unauthorized', 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = payload;
    return next();
  } catch (err) {
    return next(new AppError('Unauthorized', 401));
  }
}

module.exports = { requireAuth };
