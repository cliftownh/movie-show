import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAPI from '../hooks/api-hook';

const Review = props => {
  const { id } = useParams();
  const [{ data, isError }] = useAPI(`http://localhost:4000/review/${id}`, {});

  const {
    tmdb_id,
    format,
    title,
    season,
    episode,
    headline,
    author,
    body,
    rating
  } = data;

  return (
    <Fragment>
      {isError ? <div>Something went wrong...</div> : null}

      <div className="jumbotron bg-dark">
        <h1 className="display-4">
          {episode ? (
            <Link
              to={`/${format}/${tmdb_id}/season/${season}/episode/${episode}`}
              className="text-reset"
            >
              {title || 'Review'}
            </Link>
          ) : (
            <Link to={`/${format}/${tmdb_id}`} className="text-reset">
              {title || 'Review'}
            </Link>
          )}
        </h1>

        <p className="lead">{headline || null}</p>
        <p>{`by ${author}`}</p>

        <hr className="my-4" />

        <p>{body || null}</p>
        <p>{`${rating}/10`}</p>
      </div>
    </Fragment>
  );
};

export default Review;
