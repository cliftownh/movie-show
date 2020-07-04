import React, { Fragment } from 'react';
import tmdbKey from '../../../tmdb';
import { useParams, Link } from 'react-router-dom';
import useAPI from '../../../hooks/api-hook';

const base_url = 'https://api.themoviedb.org/3/tv/';
const keyURL = `?api_key=${tmdbKey}`;

const TvSeasonDetail = props => {
  const { id, seasonNum } = useParams();

  const detURL = base_url + id + `/season/${seasonNum}` + keyURL;

  const [{ data, isLoading, isError }] = useAPI(detURL, {});

  const { name, poster_path, episodes } = data;

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

          <div>
            <p>
              <strong>Episodes: </strong>
            </p>

            {episodes
              ? episodes.map(episode => {
                  if (episode.episode_number > 0) {
                    return (
                      <Link
                        to={`/tv/${id}/season/${seasonNum}/episode/${episode.episode_number}`}
                        key={`ep${episode.episode_number}`}
                        className="link-color"
                      >
                        {episode.episode_number + ' '}
                      </Link>
                    );
                  }
                  return null;
                })
              : null}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TvSeasonDetail;
