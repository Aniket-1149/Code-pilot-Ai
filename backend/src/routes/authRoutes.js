const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/oauth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

router.get('/oauth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/oauth/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
