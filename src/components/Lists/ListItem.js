import React from 'react';
import { Link } from 'react-router-dom';
import noImg from '../../images/not-found.svg';

const ListItem = props => {
  const {
    id,
    poster_path,
    profile_path,
    title,
    name,
    known_for
  } = props.children;
  let isPerson = false;

  if (known_for) isPerson = true;

  return (
    <li className="media" id={id}>
      {poster_path ? (
        <img
          src={`http://image.tmdb.org/t/p/w92${poster_path}`}
          className="mr-3"
          alt={title || name}
        />
      ) : profile_path ? (
        <img
          src={`http://image.tmdb.org/t/p/w185${profile_path}`}
          className="mr-3 result-profile"
          alt={name}
        />
      ) : (
        <img src={noImg} className="mr-3 result-no-img" alt={title || name} />
      )}

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
      </div>
    </li>
  );
};

export default ListItem;
