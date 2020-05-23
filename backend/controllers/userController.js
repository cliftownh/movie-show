const User = require('../models/user');
const mongoose = require('mongoose');
const createError = require('http-errors');

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
    email: req.body.email,
    password: req.body.password
  });
  User.create(user, (err, user) => {
    if (err) {
      return next(err.errors.username || err.errors.email || err);
    }
    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  });
};
