import React, { useState } from 'react';
import MovieShow from './containers/MovieShow';
import { AppContext } from './context';
import Cookies from 'js-cookie';

const App = () => {
  let isCookie = false;

  if (Cookies.getJSON('authenticatedUser')) isCookie = true;

  const [appState, setAppState] = useState({
    isAuthenticated: isCookie
  });

  return (
    <div>
      <AppContext.Provider value={{ appState, setAppState }}>
        <MovieShow isAuthenticated={appState.isAuthenticated} />
      </AppContext.Provider>
    </div>
  );
};
export default App;
