import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAPI from '../../hooks/api-hook';
import ListItem from '../Lists/ListItem';
import Modal from '../Navigation/Modal';
import tmdbKey from '../../tmdb';
import noPoster from '../../images/noPoster.png';

const baseURL = 'https://api.themoviedb.org/3/movie/';
const keyURL = `?api_key=${tmdbKey}&append_to_response=credits`;

const MovieDetail = props => {
  const { id } = useParams();
  const detailURL = baseURL + id + keyURL;

  const [{ data, isLoading, isError }] = useAPI(detailURL, {});

  const {
    title,
    overview,
    release_date,
    backdrop_path,
    poster_path,
    genres,
    runtime,
    credits
  } = data;
  let cast = [],
    crew = [];

  if (credits) {
    cast = credits.cast;
    crew = credits.crew;
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
          <header>
            <img
              src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
              className="banner-img"
              alt={title}
            />
          </header>

          <div className="main-detail bg-dark rounded">
            <div className="contained">
              <h1>
                <strong>{title}</strong>
                {release_date ? (
                  <small className="release-date">
                    {' '}
                    ({release_date.split('-')[0]})
                  </small>
                ) : null}
              </h1>

              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                  className="rounded poster-img"
                  alt={title}
                />
              ) : (
                <img src={noPoster} className="mr-3 rounded" alt={title} />
              )}

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

              {props.isAuthenticated ? <Modal>{{ id, data }}</Modal> : null}

              <h3>CAST</h3>
              {cast
                ? cast
                    .slice(0, 5)
                    .map((actor, i) => (
                      <ListItem key={`${actor.id}-${i}`}>{actor}</ListItem>
                    ))
                : null}
              <h3>DIRECTED BY</h3>
              {crew
                ? crew.map(member => {
                    const { id, name, job } = member;
                    if (job === 'Director') {
                      return (
                        <h5 key={`${id}-d`}>
                          <Link to={`/person/${id}`} className="text-reset">
                            {name}
                          </Link>
                        </h5>
                      );
                    }
                    return null;
                  })
                : null}
              <h3>WRITTEN BY</h3>
              {crew
                ? crew.map(member => {
                    const { id, name, job } = member;
                    if (
                      job === 'Writer' ||
                      job === 'Co-Writer' ||
                      job === 'Screenplay' ||
                      job === 'Author'
                    ) {
                      return (
                        <h5 key={`${id}-w`}>
                          <Link to={`/person/${id}`} className="text-reset">
                            {name}
                          </Link>
                        </h5>
                      );
                    }
                    return null;
                  })
                : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetail;
