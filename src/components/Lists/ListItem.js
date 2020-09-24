import React from 'react';
import { Link } from 'react-router-dom';
import noProfile from '../../images/noProfile.png';
import noPoster from '../../images/noPoster.png';

const ListItem = props => {
  const {
    id,
    poster_path,
    profile_path,
    title,
    name,
    character,
    media_type,
    cast_id,
    gender
  } = props.children;
  let isPerson = false;

  if (profile_path || cast_id || gender || media_type === 'person')
    isPerson = true;

  return (
    <li className="media popular" id={id}>
      {profile_path && isPerson ? (
        <img
          src={`http://image.tmdb.org/t/p/w185${profile_path}`}
          className="mr-3 result-profile rounded"
          alt={name}
        />
      ) : profile_path === null && isPerson ? (
        <img
          src={noProfile}
          className="mr-3 result-no-img rounded"
          alt={title || name}
        />
      ) : null}

      {poster_path && !isPerson ? (
        <img
          src={`http://image.tmdb.org/t/p/w92${poster_path}`}
          className="mr-3 rounded"
          alt={title || name}
        />
      ) : poster_path === null && !isPerson ? (
        <img
          src={noPoster}
          className="mr-3 result-no-img rounded"
          alt={title || name}
        />
      ) : null}

      <div className="media-body">
        <h5 className="mt-0 mb-1">
          {isPerson ? (
            <Link to={`/person/${id}`} className="text-reset">
              {name}
            </Link>
          ) : title ? (
            <Link to={`/movie/${id}`} className="text-reset">
              {title}
            </Link>
          ) : (
            <Link to={`/tv/${id}`} className="text-reset">
              {name}
            </Link>
          )}
        </h5>
        {character ? <p>{character}</p> : null}
      </div>
    </li>
  );
};

export default ListItem;
