const User = require('../models/user'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  { jwtSecret } = require('../api');

exports.auth = passport.authenticate('jwt', { session: false });

exports.signup = async (req, res, next) => {
  try {
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email
      }),
      req.body.password,
      (err, account) => {
        if (err) next(err);

        passport.authenticate(
          'local',
          { session: false },
          (err, user, info) => {
            if (err) next(err);

            if (!user) next(info);

            req.logIn(user, { session: false }, err => {
              if (err) next(err);

              // Generate a signed json web token with the contents of the user object
              const token = jwt.sign(
                { id: user.id, username: user.username },
                jwtSecret,
                { expiresIn: '1h' }
              );
              res.json({ user: user.username, jwt: token });
            });
          }
        )(req, res, next);
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({
        message: 'Username and Password are required to log in'
      });
    }
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        next(err);
      } else if (!user) {
        next(info);
      }

      req.logIn(user, { session: false }, err => {
        if (err) next(err);

        // Generate a signed json web token with the contents of the user object
        const token = jwt.sign(
          { id: user.id, username: user.username },
          jwtSecret,
          { expiresIn: '1d' }
        );
        res.json({ user: user.username, jwt: token });
      });
    })(req, res);
  } catch (err) {
    next(err);
  }
};
