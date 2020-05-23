const axios = require('axios');
const tmdbKey = require('../api/tmdbKey');
const movieURL = 'https://api.themoviedb.org/3/movie/';
const keyURL = `?api_key=${tmdbKey}&language=en-US`;
// const imgURL = 'http://image.tmdb.org/t/p/';

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
