const axios = require('axios'),
  tmdbKey = require('../api/tmdbKey'),
  tvURL = 'https://api.themoviedb.org/3/tv/';
const keyURL = `?api_key=${tmdbKey}&language=en-US`;

exports.show_detail = (req, res, next) => {
  const { id } = req.params;

  axios
    .get(tvURL + id + keyURL)
    .then(response => {
      const {
        name,
        first_air_date,
        genre,
        created_by,
        networks,
        poster_path,
        number_of_seasons,
        number_of_episodes,
        seasons
      } = response.data;
      res.json({
        name: name,
        first_air_date: first_air_date,
        genre: genre,
        created_by: created_by,
        networks: networks,
        poster_path: poster_path,
        number_of_seasons: number_of_seasons,
        number_of_episodes: number_of_episodes,
        seasons: seasons
      });
    })
    .catch(err => next(err));
};

exports.season_detail = (req, res) => {
  const { id, sNum } = req.params;

  axios
    .get(tvURL + id + `/season/${sNum}` + keyURL)
    .then(response => {
      const { season_number, air_date, episodes, poster_path } = response.data;
      res.json({
        season_number: season_number,
        episodes: episodes.length,
        air_date: air_date,
        poster_path: poster_path
      });
    })
    .catch(err => next(err));
};

exports.episode_detail = (req, res) => {
  const { id, sNum, eNum } = req.params;

  axios
    .get(tvURL + id + `/season/${sNum}/episode/${eNum}` + keyURL)
    .then(response => {
      const {
        name,
        air_date,
        episode_number,
        season_number,
        crew,
        still_path
      } = response.data;
      res.json({
        name: name,
        season_number: season_number,
        episode_number: episode_number,
        air_date: air_date,
        crew: crew,
        still_path: still_path
      });
    })
    .catch(err => next(err));
};
