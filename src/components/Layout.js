import React, { Fragment } from 'react';
import Toolbar from './Navigation/Toolbar';

const layout = props => (
  <Fragment>
    <Toolbar />
    <main>{props.children}</main>
  </Fragment>
);

export default layout;
