const mongoose = require('mongoose'),
  passportLocal = require('passport-local-mongoose');
const { Schema } = mongoose;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const User = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    match: emailRegex
  }
});

// Virtual for user's URL
User.virtual('url').get(function () {
  return '/user/' + this._id;
});

User.plugin(passportLocal);

module.exports = mongoose.model('User', User);
