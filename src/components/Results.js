import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import useAPI from '../hooks/api-hook';
import tmdbKey from '../tmdb';
import List from './Lists/List';

const Results = props => {
  const { type, query } = useParams();
  const url = `https://api.themoviedb.org/3/search/${type}?api_key=${tmdbKey}&query=${query}`;
  const [{ data, isLoading, isError }] = useAPI(url, {});

  return (
    <Fragment>
      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-sm">
          {data.results ? <List>{data.results}</List> : null}
        </div>
      )}
    </Fragment>
  );
};

export default Results;
