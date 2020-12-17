import React, { Fragment } from 'react';
import tmdbKey from '../../../tmdb';
import { useParams, Link } from 'react-router-dom';
import useAPI from '../../../hooks/api-hook';

const base_url = 'https://api.themoviedb.org/3/tv/';
const keyURL = `?api_key=${tmdbKey}`;

const TvSeasonDetail = props => {
  const { id, seasonNum } = useParams();

  const detURL = base_url + id + keyURL;

  const [{ data, isLoading, isError }] = useAPI(detURL, {});

  const [{ data: show }] = useAPI(base_url + id + `?api_key=${tmdbKey}`, {});

  const { name, poster_path, seasons } = data;

  let thisSeason,
    seasonPoster,
    episodes = [];

  if (seasons) {
    thisSeason = seasons.find(
      season => season.season_number.toString() === seasonNum
    );

    if (thisSeason) {
      if (thisSeason.poster_path) {
        seasonPoster = thisSeason.poster_path;
      }
    }

    for (let i = 1; i <= thisSeason.episode_count; i++) {
      episodes.push(i);
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
          <header>
            <img
              src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
              className="banner-img"
              alt={name}
            />
          </header>

          <div className="main-detail bg-dark rounded">
            <div className="contained">
              <h1>
                <strong>
                  <Link to={`/tv/${id}`} className="text-reset">
                    {name}
                  </Link>
                  {`: Season ${seasonNum}`}
                </strong>
              </h1>
              {seasonPoster ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${seasonPoster}`}
                  className="rounded"
                  alt={`Season ${seasonNum}`}
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                  className="rounded"
                  alt={`Season ${seasonNum}`}
                />
              )}

              <div>
                <p>
                  <strong>Episodes: </strong>
                </p>

                {episodes
                  ? episodes.map(episode => {
                      return (
                        <Link
                          to={`/tv/${id}/season/${seasonNum}/episode/${episode}`}
                          key={`ep${episode}`}
                          className="link-color"
                        >
                          {episode + ' '}
                        </Link>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TvSeasonDetail;
