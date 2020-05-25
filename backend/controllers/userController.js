const mongoose = require('mongoose'),
  createError = require('http-errors'),
  User = require('../models/user'),
  passport = require('passport');

exports.user_list = (req, res, next) => {
  User.find()
    .sort([['username', 'ascending']])
    .exec((err, list_users) => {
      if (err) {
        return next(err);
      }
      res.json({ title: 'User List', user_list: list_users });
    });
};

exports.user_detail = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  User.findById(id).exec((err, user) => {
    if (err) return next(err);
    if (user == null) {
      const error = createError(400, 'User not found');
      next(error);
    }
    res.json({
      username: user.username,
      email: user.email
    });
  });
};

exports.user_signup = (req, res, next) => {
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

exports.user_login = (req, res) => {
  if (!req.body.username) {
    res.status(422).json({ message: 'No username was given' });
  } else if (!req.body.password) {
    res.status(422).json({ message: 'No password was given' });
  } else {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(401).json(err);
      }

      if (user) {
        res.redirect('/');
      } else {
        console.log(info);
        return res.status(401).json(info);
      }
    })(req, res);
  }
};

exports.user_logout = (req, res) => {
  req.logout();
  res.redirect('/');
};