import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import useAPI from '../hooks/api-hook';

const Review = props => {
  const { id } = useParams();
  const [{ data, /*isLoading,*/ isError }] = useAPI(
    `http://localhost:4000/review/${id}`,
    {}
  );

  const { title, body, rating } = data;

  return (
    <Fragment>
      {isError ? <div>Something went wrong...</div> : null}

      <div className="jumbotron bg-dark">
        <h1 className="display-4">{title || 'Review'}</h1>
        <p className="lead">{body || null}</p>
        <hr className="my-4" />
        <p>{`${rating}/10`}</p>
      </div>
    </Fragment>
  );
};

export default Review;
