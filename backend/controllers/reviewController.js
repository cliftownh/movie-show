const Review = require('../models/review'),
  mongoose = require('mongoose'),
  createError = require('http-errors');

exports.create = (req, res, next) => {
  if (!req.user) return res.json({ error: 'You must log in to review' });

  const { format, title, season, episode, headline, body, rating } = req.body;

  const review = new Review({
    tmdb_id: req.params.id,
    format: format,
    title: title,
    season: season,
    episode: episode,
    headline: headline,
    body: body,
    rating: rating,
    author: req.user.username,
    user_id: req.user._id
  });

  review.save((err, newReview) => {
    if (err) return next(err);

    console.log('Review saved: ' + newReview._id);

    res.status(201).json({ id: newReview._id });
  });
};

exports.update = (req, res, next) => {
  if (!req.user) return res.json({ error: 'You must log in to edit review' });

  const id = mongoose.Types.ObjectId(req.params.revID);

  Review.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true },
    (err, reviewUpdated) => {
      if (err) return next(err);

      res.json({ reviewUpdated: reviewUpdated });
    }
  );
};

// Get one review by it's ID
exports.view = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Review.findById(id).exec((err, review) => {
    if (err) return next(err);

    if (review === null) {
      const error = createError(400, 'Review not found');
      next(error);
    }

    const {
      tmdb_id,
      format,
      title,
      season,
      episode,
      headline,
      body,
      rating,
      author,
      user_id
    } = review;

    res.json({
      tmdb_id: tmdb_id,
      format: format,
      title: title,
      season: season,
      episode: episode,
      headline: headline,
      body: body,
      rating: rating,
      author: author,
      user_id: user_id
    });
  });
};

// Get all reviews by user, movie, or TV show
exports.list = (req, res, next) => {
  const type = req.originalUrl.split('/')[1];
  let field, id;

  // Check what type of reviews are being collected
  if (type === 'user') {
    field = type;
    id = mongoose.Types.ObjectId(req.params.id);
  } else if (type === 'movie' || type === 'tv') {
    field = 'tmdb_id';
    id = req.params.id;
  }

  Review.find({ [field]: id })
    .sort({ createdAt: 'desc' })
    .exec((err, reviews) => {
      if (err) return next(err);

      if (reviews == null) {
        const error = createError(400, 'Reviews not found');
        next(error);
      }

      res.json({ reviews: reviews });
    });
};
