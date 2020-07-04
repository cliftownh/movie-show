import React, { Fragment } from 'react';
import tmdbKey from '../../tmdb';
import { useParams } from 'react-router-dom';
import useAPI from '../../hooks/api-hook';
import ListItem from '../Lists/ListItem';

const base_url = 'https://api.themoviedb.org/3/person/';
const keyURL = `?api_key=${tmdbKey}&append_to_response=movie_credits,tv_credits`;

const MovieDetail = props => {
  const { id } = useParams();
  const credURL = base_url + id + keyURL;

  const [{ data, isLoading, isError }] = useAPI(credURL, {});

  const {
    name,
    profile_path,
    birthday,
    place_of_birth,
    known_for_department,
    movie_credits,
    tv_credits
  } = data;
  let movies = [],
    shows = [];

  if (movie_credits || tv_credits) {
    if (known_for_department === 'Acting') {
      movies = movie_credits.cast;
      shows = tv_credits.cast;
    } else {
      movies = movie_credits.crew;
      shows = tv_credits.crew;
    }
  }

  return (
    <Fragment>
      {isError ? <div>Something went wrong...</div> : null}

      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="container">
          <h1>
            <strong>{name}</strong>
          </h1>
          <img
            src={`https://image.tmdb.org/t/p/h632${profile_path}`}
            className="profile-pic"
            alt={name}
          />
          <p>{`Born: ${birthday}`}</p>
          <p>{place_of_birth}</p>

          {movies.length ? <h3>Movies</h3> : null}
          {movies
            ? movies
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5)
                .map((movie, i) => (
                  <ListItem key={`${movie.id}-${i}`}>{movie}</ListItem>
                ))
            : null}

          {shows.length ? <h3>TV</h3> : null}
          {shows
            ? shows
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5)
                .map((show, i) => (
                  <ListItem key={`${show.id}-${i}`}>{show}</ListItem>
                ))
            : null}
        </div>
      )}
    </Fragment>
  );
};

// Sort movie credits by release year
// .sort((a, b) => {
//   const dateA = Number(a.release_date.split('-')[0]),
//     dateB = Number(b.release_date.split('-')[0]);
//   return dateB - dateA;
// })

export default MovieDetail;
