import React, { Fragment } from 'react';
import tmdbKey from '../../tmdb';
import { useParams } from 'react-router-dom';
import useAPI from '../../hooks/api-hook';
import ListItem from '../Lists/ListItem';
import noProfile from '../../images/noProfile.png';

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

  // Filter array by department
  const findDept = arr => {
    return arr.filter(obj => {
      return obj.department === known_for_department;
    });
  };

  // Filter out duplicates from array based on id
  const findDups = arr => {
    return arr.filter(
      (obj, index, self) => self.findIndex(same => same.id === obj.id) === index
    );
  };

  // Sort an array by popularity and list the first 5 objects
  const findTop5 = arr => {
    return arr
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5)
      .map((obj, i) => <ListItem key={`${obj.id}-${i}`}>{obj}</ListItem>);
  };

  if (movie_credits || tv_credits) {
    // Use the cast credits array for actors
    if (known_for_department === 'Acting') {
      movies = movie_credits.cast;
      shows = tv_credits.cast;

      // Filter out actor's multiple appearances on the same show
      shows = findDups(shows);
    } else {
      // Use the crew credits array for other people (writers/directors)
      movies = movie_credits.crew;
      shows = tv_credits.crew;

      movies = findDept(movies);
      movies = findDups(movies);

      shows = findDept(shows);
      shows = findDups(shows);
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
          {profile_path !== null ? (
            <img
              src={`https://image.tmdb.org/t/p/h632${profile_path}`}
              className="profile-pic rounded"
              alt={name}
            />
          ) : (
            <img src={noProfile} className="profile-pic rounded" alt={name} />
          )}
          <p>{`Born: ${birthday}`}</p>
          <p>{place_of_birth}</p>

          {movies.length ? <h3>Movies</h3> : null}
          {movies ? findTop5(movies) : null}

          {shows.length ? <h3>TV</h3> : null}
          {shows ? findTop5(shows) : null}
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
