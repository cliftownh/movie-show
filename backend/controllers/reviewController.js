const Review = require('../models/review'),
  mongoose = require('mongoose'),
  createError = require('http-errors');

exports.review_create = (req, res, next) => {
  if (!req.user) return res.json({ error: 'You must log in to review' });

  const { season, episode, title, body, rating } = req.body;
  const review = new Review({
    tmdb_id: req.params.id,
    season: season,
    episode: episode,
    title: title,
    body: body,
    rating: rating,
    user: req.user._id
  });

  review.save(err => {
    if (err) return next(err);

    res.json({ id: review._id });
  });
};

exports.review_update = (req, res, next) => {
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
exports.review_view = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Review.findById(id).exec((err, review) => {
    if (err) return next(err);

    if (review == null) {
      const error = createError(400, 'Review not found');
      next(error);
    }

    res.json({
      tmdb_id: review.tmdb_id,
      title: review.title,
      body: review.body,
      rating: review.rating,
      user: review.user
    });
  });
};

// Get all reviews by user, movie, or TV show
exports.reviews_list = (req, res, next) => {
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
