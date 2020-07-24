import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from '../Search';
import vhs from '../../images/vhs.svg';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAppContext } from '../../context';

const Toolbar = props => {
  const history = useHistory(),
    { setAppState } = useAppContext();

  const handleLogout = () => {
    axios.get('http://localhost:4000/user/logout', { withCredentials: true });
    Cookies.remove('authenticatedUser');
    setAppState({ isAuthenticated: false });
    history.push('/');
  };

  return (
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
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>

          {props.isAuthenticated ? (
            <li className="nav-item" onClick={handleLogout}>
              <div className="nav-link">Logout</div>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
        <Search />
      </div>
    </nav>
  );
};

export default Toolbar;
