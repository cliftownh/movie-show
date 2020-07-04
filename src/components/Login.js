import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../context';
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = props => {
  const username = useRef(),
    password = useRef(),
    history = useHistory(),
    { setAppState } = useAppContext(),
    loginURL = 'http://localhost:4000/user/login';

  const handleSubmit = e => {
    e.preventDefault();

    if (username.current.value && password.current.value) {
      axios({
        method: 'post',
        url: loginURL,
        withCredentials: true,
        data: {
          username: username.current.value,
          password: password.current.value
        }
      })
        .then(response => {
          if (response.status === 200) {
            Cookies.set('authenticatedUser', response.data.user, {
              expires: 1
            });
            setAppState({ isAuthenticated: true });
            history.push('/');
          } else {
            console.log('Error: Could not log in.');
          }
        })
        .catch(err => console.log(err));
    }
  };

  const handleCancel = () => history.push('/');

  return (
    <div className="container login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="username-login" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              name="username"
              ref={username}
              className="form-control"
              id="username-login"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password-login" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-7">
            <input
              type="password"
              name="password"
              ref={password}
              className="form-control"
              id="password-login"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-outline-orange"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-orange login-button">
              Log In
            </button>
          </div>
        </div>
      </form>
      <p>
        {"Don't have an account? "}
        <Link to="/signup" className="link-color">
          Create one!
        </Link>
      </p>
    </div>
  );
};

export default Login;
