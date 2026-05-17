const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { upsertOAuthUser } = require('../services/authService');
const { logger } = require('./logger');

function initPassport(app) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, { id }));

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const oauthCallbackUrl = process.env.OAUTH_CALLBACK_URL;

  if (googleClientId && googleClientSecret && oauthCallbackUrl) {
    passport.use(new GoogleStrategy({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: oauthCallbackUrl
    }, async (accessToken, refreshToken, profile, done) => {
      const user = await upsertOAuthUser('google', profile);
      done(null, user);
    }));
  } else {
    logger.warn('Google OAuth disabled: missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/OAUTH_CALLBACK_URL');
  }

  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (githubClientId && githubClientSecret && oauthCallbackUrl) {
    passport.use(new GitHubStrategy({
      clientID: githubClientId,
      clientSecret: githubClientSecret,
      callbackURL: oauthCallbackUrl
    }, async (accessToken, refreshToken, profile, done) => {
      const user = await upsertOAuthUser('github', profile);
      done(null, user);
    }));
  } else {
    logger.warn('GitHub OAuth disabled: missing GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET/OAUTH_CALLBACK_URL');
  }

  app.use(passport.initialize());
}

module.exports = { initPassport };
