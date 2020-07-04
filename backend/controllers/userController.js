const mongoose = require('mongoose'),
  createError = require('http-errors'),
  User = require('../models/user');

// Find all users
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

// exports.user_logout = (req, res) => {
//   res.json({ message: 'You have been logged out' });
// };

// Test if user is logged in
// exports.loggedIn = (req, res, next) => {
//   console.log('Access Granted dude!!!!!');

//   const token = req.headers.authorization;

//   console.log('TOKEN: ' + token);

//   if (token == null) {
//     console.log('Invalid token');
//     res.status(400).json({ error: 'Invalid token' });
//   }

//   res.json({ message: "You're logged in" });
// };
