const User = require('../models/user'),
  passport = require('passport');
// jwt = require('jsonwebtoken'),
// { jwtSecret, refreshSecret } = require('../api');

exports.auth = passport.authenticate('local');

exports.signup = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email
  });

  User.register(user, req.body.password, (err, user) => {
    if (err) return next(err);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      message: 'Your account has been created!'
    });
  });
};

exports.login = (req, res, next) => {
  if (req.user) return res.json({ message: 'You are already logged in' });

  if (!req.body.username) {
    res.status(422).json({ message: 'No username was given' });
  } else if (!req.body.password) {
    res.status(422).json({ message: 'No password was given' });
  } else {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({ user: user.id, message: 'You logged in!' });
      });
    })(req, res, next);
  }
};

exports.logout = (req, res) => {
  req.logout();

  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
};

/* JWT strategy to be implemented later
exports.createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    { id: user.id, username: user.username },
    secret,
    {
      expiresIn: '1m',
    },
  );

  const createRefreshToken = jwt.sign(
    { id: user.id, username: user.username },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

exports.refreshTokens = async (token, refreshToken, User, jwtSecret, refreshSecret) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, jwtSecret, refreshSecret);
  
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

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
        // const token = jwt.sign(
        //   { id: user.id, username: user.username },
        //   jwtSecret,
        //   { expiresIn: '1d' }
        // );

        const [token, refreshToken] = await this.createTokens(user, jwtSecret, refreshSecret);

        res.json({ token, refreshToken });
      });
    })(req, res);
  } catch (err) {
    next(err);
  }
};
*/
