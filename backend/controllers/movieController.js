const axios = require('axios'),
  { tmdbKey } = require('../api'),
  movieURL = 'https://api.themoviedb.org/3/movie/';
const keyURL = `?api_key=${tmdbKey}`;
// const searchURL = `https://api.themoviedb.org/3/search/movie/${keyURL}&query=`;

exports.movie_detail = (req, res, next) => {
  const { id } = req.params;

  axios
    .get(movieURL + id + keyURL)
    .then(response => {
      const {
        title,
        runtime,
        release_date,
        overview,
        poster_path
      } = response.data;

      res.json({
        title: title,
        runtime: runtime,
        release_date: release_date,
        overview: overview,
        poster_path: poster_path
      });
    })
    .catch(err => next(err));
};

exports.movies_popular = (req, res, next) => {
  axios
    .get(movieURL + 'popular' + keyURL)
    .then(response => {
      const { id, title, poster_path, release_date } = response.data;

      res.json({
        id: id,
        title: title,
        poster_path: poster_path,
        release_date: release_date
      });
    })
    .catch(err => next(err));
};
