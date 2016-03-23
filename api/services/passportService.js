const passport = require('passport');
const User = require('../models/userModel');
const config = require('../../config/config');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for Local Strategy
const localOptions = { usernameField: 'email' };

// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

  // Verify username and password
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Startegy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use these strategy
passport.use(localLogin);
passport.use(jwtLogin);