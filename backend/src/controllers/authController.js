const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { registerUser, loginUser, createToken } = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  const token = createToken(user);
  return ok(res, { user, token });
});

const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  const token = createToken(user);
  return ok(res, { user, token });
});

module.exports = { register, login };
