const axios = require('axios'),
  { tmdbKey } = require('../api');
const keyURL = `?api_key=${tmdbKey}&language=en-US`;

exports.search_tmdb = (req, res, next) => {
  const searchFor = encodeURIComponent(req.params.searchFor),
    type = req.originalUrl.split('/')[1];
  const searchURL = `https://api.themoviedb.org/3/search/${type}/${keyURL}&query=`;

  axios
    .get(searchURL + searchFor)
    .then(response => {
      const { page, total_results, total_pages, results } = response.data;

      res.json({
        page: page,
        total_results: total_results,
        total_pages: total_pages,
        results: results
      });
    })
    .catch(err => next(err));
};
