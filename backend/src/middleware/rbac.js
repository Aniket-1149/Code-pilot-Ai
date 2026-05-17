const { AppError } = require('../utils/errors');
const { hasPermission } = require('../config/rbac');

function requirePermission(permission) {
  return (req, res, next) => {
    const role = req.user?.role || 'user';
    if (!hasPermission(role, permission)) {
      return next(new AppError('Forbidden', 403));
    }
    return next();
  };
}

module.exports = { requirePermission };
