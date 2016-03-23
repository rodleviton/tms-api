const jwt = require('jwt-simple');
const User = require('../models/userModel');
const config = require('../../config/config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(422).send({ error: 'You must provide username, email and password.' });
  }

  // Check if user exists with given email
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      username: username,
      email: email,
      password: password
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // Respond to request
      res.json({ token: tokenForUser(user) });
    });
  });
}

exports.signin = function (req, res, next) {
  // User already had email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}