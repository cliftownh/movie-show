const axios = require('axios');
const tmdbKey = require('../api/tmdbKey');
const personURL = 'https://api.themoviedb.org/3/person/';
const keyURL = `?api_key=${tmdbKey}&language=en-US`;
// const imgURL = 'http://image.tmdb.org/t/p/';

exports.person_detail = (req, res, next) => {
  const { id } = req.params;

  axios
    .get(personURL + id + keyURL)
    .then(response => {
      const {
        name,
        known_for_department,
        birthday,
        place_of_birth,
        biography,
        profile_path
      } = response.data;

      res.json({
        name: name,
        known_for: known_for_department,
        birthday: birthday,
        place_of_birth: place_of_birth,
        biography: biography,
        profile_path: profile_path
      });
    })
    .catch(err => next(err));
};