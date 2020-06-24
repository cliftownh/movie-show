import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import vhs from '../../images/vhs.svg';

const toolbar = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to="/" className="navbar-brand">
      <img
        src={vhs}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="logo"
      />
      {` MovieShow`}
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
      <Search />
    </div>
  </nav>
);

export default toolbar;
