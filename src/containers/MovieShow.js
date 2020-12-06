import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomeNew from '../components/HomeNew';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import MovieDetail from '../components/Details/MovieDetail';
import PersonDetail from '../components/Details/PersonDetail';
import TvShowDetail from '../components/Details/tv/TvShowDetail';
import TvSeasonDetail from '../components/Details/tv/TvSeasonDetail';
import TvEpisodeDetail from '../components/Details/tv/TvEpisodeDetail';
import Results from '../components/Results';
import Review from '../components/Review';

const MovieShow = props => {
  const { isAuthenticated } = props;

  return (
    <Layout>
      <Switch>
        <Route exact path="/tv/:id/season/:seasonNum/episode/:epNum">
          <TvEpisodeDetail isAuthenticated={isAuthenticated} />
        </Route>

        <Route exact path="/tv/:id/season/:seasonNum">
          <TvSeasonDetail />
        </Route>

        <Route exact path="/tv/:id">
          <TvShowDetail isAuthenticated={isAuthenticated} />
        </Route>

        <Route exact path="/movie/:id">
          <MovieDetail isAuthenticated={isAuthenticated} />
        </Route>

        <Route exact path="/person/:id">
          <PersonDetail />
        </Route>

        <Route exact path="/review/:id">
          <Review />
        </Route>

        <Route
          exact
          path="/search/:type/:query"
          render={({ location }) => <Results key={location.pathname} />}
        />

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/">
          <HomeNew />
        </Route>
      </Switch>
    </Layout>
  );
};

export default MovieShow;
