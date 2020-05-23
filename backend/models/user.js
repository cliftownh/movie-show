const mongoose = require('mongoose');
const beUnique = require('mongoose-unique-validation');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 25,
    unique: 'That username already has an account.'
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    match: emailRegex,
    unique: 'That email already has an account.'
  },
  password: { type: String, required: true, minlength: 4, select: false }
});

// Virtual for user's URL
UserSchema.virtual('url').get(function () {
  return '/user/' + this._id;
});

// Hash password before adding to database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.plugin(beUnique);

module.exports = mongoose.model('User', UserSchema);
