const mongoose = require('mongoose');
const { Schema } = mongoose;

const Review = new Schema(
  {
    tmdb_id: { type: Number, required: true },
    format: { type: String, required: true },
    title: { type: String, required: true, maxlength: 200 },
    season: { type: Number, required: false },
    episode: { type: Number, required: false },
    headline: { type: String, required: false, maxlength: 50 },
    body: { type: String, required: false, maxlength: 1000 },
    rating: { type: Number, required: true, min: 0, max: 10 },
    author: { type: String, required: true, maxlength: 100 },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);

// Virtual for Subject's URL
Review.virtual('url').get(function () {
  return '/review/' + this._id;
});

//Export function to create "User" model class
module.exports = mongoose.model('Review', Review);
