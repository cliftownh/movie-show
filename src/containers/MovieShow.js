import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Login from '../components/Login';
import MovieDetail from '../components/Details/MovieDetail';
import TvShowDetail from '../components/Details/tv/TvShowDetail';
import TvSeasonDetail from '../components/Details/tv/TvSeasonDetail';
import TvEpisodeDetail from '../components/Details/tv/TvEpisodeDetail';
import Results from '../components/Results';

export default class MovieShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/tv/:id/season/:seasonNum/episode/:epNum">
            <TvEpisodeDetail />
          </Route>

          <Route exact path="/tv/:id/season/:seasonNum">
            <TvSeasonDetail />
          </Route>

          <Route exact path="/tv/:id">
            <TvShowDetail />
          </Route>

          <Route exact path="/movie/:id">
            <MovieDetail />
          </Route>

          <Route exact path="/search/:type/:query">
            <Results />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    );
  }
}
