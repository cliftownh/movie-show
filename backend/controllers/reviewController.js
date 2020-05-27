const Review = require('../models/review'),
  createError = require('http-errors');

exports.review_create = (req, res, next) => {
  if (!req.user) return res.json({ error: 'You must log in to review' });

  const { title, body, rating } = req.body;
  const review = new Review({
    tmdb_id: req.params.id,
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

exports.review_view = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.revID);

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
