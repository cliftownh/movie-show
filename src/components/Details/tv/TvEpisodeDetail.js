import React, { Fragment } from 'react';
import tmdbKey from '../../../tmdb';
import { useParams, Link } from 'react-router-dom';
import useAPI from '../../../hooks/api-hook';
import ListItem from '../../Lists/ListItem';
import Modal from '../../Navigation/Modal';

const base_url = 'https://api.themoviedb.org/3/tv/';
const keyURL = `?api_key=${tmdbKey}&append_to_response=images`;

const TvEpisodeDetail = props => {
  const { id, seasonNum, epNum } = useParams();

  const detURL =
    base_url + id + `/season/${seasonNum}/episode/${epNum}` + keyURL;

  const [{ data, isLoading, isError }] = useAPI(detURL, {});

  const [{ data: show }] = useAPI(base_url + id + `?api_key=${tmdbKey}`, {});

  const {
    air_date,
    crew,
    episode_number,
    guest_stars,
    name,
    overview,
    season_number,
    still_path,
    images
  } = data;

  let still, backdrop;

  if (images) {
    if (images.stills.length > 1) {
      const { stills } = images;
      const sortedStills = stills.sort((a, b) => a.width - b.width);

      still = sortedStills[0].file_path;
      backdrop = sortedStills[1].file_path;
    } else {
      still = still_path;
      backdrop = still_path;
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
              src={`https://image.tmdb.org/t/p/original${backdrop}`}
              className="banner-img"
              alt={name}
            />
          </header>

          <div className="main-detail bg-dark rounded">
            <div className="contained">
              <h1>
                <strong>{name}</strong>
              </h1>
              <img
                src={`https://image.tmdb.org/t/p/w300${still}`}
                className="rounded"
                alt={name}
              />

              <h2>
                <Link to={`/tv/${id}`} className="text-reset">
                  {show.name}
                </Link>
              </h2>
              <p>
                {
                  <Link
                    to={`/tv/${id}/season/${seasonNum}`}
                    className="text-reset"
                  >
                    Season {season_number}
                  </Link>
                }
                , Episode {episode_number}
              </p>
              <p>{`Aired: ${air_date}`}</p>

              <p>{overview}</p>

              {props.isAuthenticated ? <Modal>{{ id, data }}</Modal> : null}

              <h3>DIRECTED BY</h3>
              {crew
                ? crew.map(member => {
                    if (member.job === 'Director') {
                      return (
                        <p key={`${member.id}-d`}>
                          <Link
                            to={`/person/${member.id}`}
                            className="text-reset"
                          >
                            {member.name}
                          </Link>
                        </p>
                      );
                    }
                    return null;
                  })
                : null}

              <h3>WRITTEN BY</h3>
              {crew
                ? crew.map(member => {
                    if (member.job === 'Writer' || member.job === 'Teleplay') {
                      return (
                        <p key={`${member.id}-w`}>
                          <Link
                            to={`/person/${member.id}`}
                            className="text-reset"
                          >
                            {member.name}
                          </Link>
                        </p>
                      );
                    }
                    return null;
                  })
                : null}

              {guest_stars ? (
                guest_stars.length ? (
                  <Fragment>
                    <h3>GUEST STARRING</h3>
                    {guest_stars.slice(0, 5).map(guest => (
                      <ListItem key={guest.id}>{guest}</ListItem>
                    ))}
                  </Fragment>
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TvEpisodeDetail;
