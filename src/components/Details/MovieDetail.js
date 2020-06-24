import React, { Fragment } from 'react';
import tmdbKey from '../../tmdb';
import { useParams } from 'react-router-dom';
import useAPI from '../../hooks/api-hook';

const base_url = 'https://api.themoviedb.org/3/movie/';
const keyURL = `?api_key=${tmdbKey}`;

const MovieDetail = props => {
  const { id } = useParams();

  const detURL = base_url + id + keyURL;
  const credURL = base_url + id + `/credits${keyURL}`;

  const [{ data: detData, isLoading: detLoading, isError: detError }] = useAPI(
    detURL,
    {}
  );
  const [
    { data: credData, isLoading: credLoading, isError: credError }
  ] = useAPI(credURL, {});

  const {
      title,
      overview,
      release_date,
      poster_path,
      genres,
      runtime
    } = detData,
    { cast, crew } = credData;

  return (
    <Fragment>
      {detError || credError ? <div>Something went wrong...</div> : null}

      {detLoading || credLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <h1>
            <strong>{title}</strong>
            {release_date ? (
              <small className="release-date">
                {' '}
                ({release_date.split('-')[0]})
              </small>
            ) : null}
          </h1>
          <img
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt={title}
          />
          <p>{runtime} minutes</p>
          <ul className="list-inline">
            {genres
              ? genres.map(genre => (
                  <li key={genre.id} className="list-inline-item">
                    {genre.name}
                  </li>
                ))
              : null}
          </ul>
          <p>{overview}</p>
          <h3>CAST</h3>
          {cast
            ? cast.slice(0, 5).map(actor => <p key={actor.id}>{actor.name}</p>)
            : null}
          <h3>DIRECTED BY</h3>
          {crew
            ? crew.map(member => {
                if (member.job === 'Director') {
                  return <p key={member.id}>{member.name}</p>;
                }
                return null;
              })
            : null}
          <h3>WRITTEN BY</h3>
          {crew
            ? crew.map(member => {
                if (member.job === 'Screenplay') {
                  return <p key={member.id}>{member.name}</p>;
                }
                return null;
              })
            : null}
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetail;
