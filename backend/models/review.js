const mongoose = require('mongoose');
const { Schema } = mongoose;

const Review = new Schema({
  tmdb_id: { type: Number, required: true },
  title: { type: String, required: false, maxlength: 50 },
  body: { type: String, required: false, maxlength: 1000 },
  rating: { type: Number, required: true, min: 0, max: 10 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

// Virtual for Subject's URL
Review.virtual('url').get(function () {
  return '/review/' + this._id;
});

//Export function to create "User" model class
module.exports = mongoose.model('Review', Review);
