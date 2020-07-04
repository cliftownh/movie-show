import React, { Fragment } from 'react';
import tmdbKey from '../../../tmdb';
import { useParams, Link } from 'react-router-dom';
import useAPI from '../../../hooks/api-hook';
import ListItem from '../../Lists/ListItem';
import Modal from '../../Navigation/Modal';

const baseURL = 'https://api.themoviedb.org/3/tv/';
const keyURL = `?api_key=${tmdbKey}&append_to_response=credits`;

const TvShowDetail = props => {
  const { id } = useParams();

  const detURL = baseURL + id + keyURL;
  // const credURL = baseURL + id + `/credits${keyURL}`;

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
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
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
                      className="link-color"
                    >
                      {season.season_number + ' '}
                    </Link>
                  );
                }
                return null;
              })
            : null}

          <p>{overview}</p>

          {props.isAuthenticated ? <Modal>{{ id, data }}</Modal> : null}

          {cast.length ? <h3>CAST</h3> : null}
          {cast
            ? cast
                .slice(0, 5)
                .map(actor => <ListItem key={actor.id}>{actor}</ListItem>)
            : null}

          <h3>CREATED BY</h3>
          {created_by
            ? created_by.map(creator => (
                <h5 key={creator.id}>
                  <Link to={`/person/${creator.id}`} className="text-reset">
                    {creator.name}
                  </Link>
                </h5>
              ))
            : null}
        </div>
      )}
    </Fragment>
  );
};

export default TvShowDetail;
