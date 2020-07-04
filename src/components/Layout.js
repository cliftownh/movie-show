import React, { Fragment } from 'react';
import Toolbar from './Navigation/Toolbar';
import { useAppContext } from '../context';

const Layout = props => {
  const { isAuthenticated } = useAppContext().appState;

  return (
    <Fragment>
      <Toolbar isAuthenticated={isAuthenticated} />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
