import React, { Fragment } from 'react';
import tmdbKey from '../../../tmdb';
import { useParams, Link } from 'react-router-dom';
import useAPI from '../../../hooks/api-hook';

const base_url = 'https://api.themoviedb.org/3/tv/';
const keyURL = `?api_key=${tmdbKey}`;

const TvShowDetail = props => {
  const { id } = useParams();

  const detURL = base_url + id + keyURL + `&append_to_response=credits`;
  // const credURL = base_url + id + `/credits${keyURL}`;

  const [{ data, isLoading, isError }] = useAPI(detURL, {});
  // const [
  //   { data: credits, isLoading: credLoading, isError: credError }
  // ] = useAPI(credURL, {});
  const {
    name,
    overview,
    created_by,
    poster_path,
    genres,
    seasons,
    credits
  } = data;
  let cast = [];

  if (credits) cast = credits.cast;

  return (
    <Fragment>
      {isError ? <div>Something went wrong...</div> : null}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <h1>
            <strong>{name}</strong>
          </h1>
          <img
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt={name}
          />

          <ul className="list-inline">
            {genres
              ? genres.map(genre => (
                  <li key={genre.id} className="list-inline-item">
                    {genre.name}
                  </li>
                ))
              : null}
          </ul>

          <p>
            <strong>Seasons: </strong>
          </p>

          {seasons
            ? seasons.map(season => {
                if (season.season_number > 0) {
                  return (
                    <Link
                      to={`/tv/${id}/season/${season.season_number}`}
                      key={`season${season.season_number}`}
                      className="tv-num"
                    >
                      {season.season_number + ' '}
                    </Link>
                  );
                }
                return null;
              })
            : null}

          <p>{overview}</p>

          <h3>CAST</h3>
          {cast
            ? cast.slice(0, 5).map(actor => <p key={actor.id}>{actor.name}</p>)
            : null}

          <h3>CREATED BY</h3>
          {created_by
            ? created_by.map(creator => <p key={creator.id}>{creator.name}</p>)
            : null}
        </div>
      )}
    </Fragment>
  );
};

export default TvShowDetail;
