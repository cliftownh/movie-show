import React, { Fragment, useEffect, useState } from 'react';
import List from './Lists/List';
import axios from 'axios';
import tmdbKey from '../tmdb';
// import useDataAPI from '../tmdb/useDataAPI';

const baseURL = 'https://api.themoviedb.org/3/';
const popURL = `/popular?api_key=${tmdbKey}`;

const popMovies = baseURL + 'movie' + popURL;
const popTV = baseURL + 'tv' + popURL;

const Home = props => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [movieData, showData] = await Promise.all([
          axios(popMovies),
          axios(popTV)
        ]);

        setMovies(movieData.data.results);
        setShows(showData.data.results);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        // <table className="table table-striped table-dark">
        //   <thead>
        //     <tr>
        //       <th scope="col">Popular Movies</th>
        //       <th scope="col">Popular Shows</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <td>
        //         <List>{movies}</List>
        //       </td>
        //       <td>
        //         <List>{shows}</List>
        //       </td>
        //     </tr>
        //   </tbody>
        // </table>

        <div className="container-sm">
          <div className="row">
            <div className="col-sm">
              <h1>Popular Movies</h1>
              <List>{movies}</List>
            </div>
            <div className="col-sm">
              <h1>Popular TV Shows</h1>
              <List>{shows}</List>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
