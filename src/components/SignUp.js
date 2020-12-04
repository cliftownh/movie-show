import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';

const SignUp = props => {
  const history = useHistory();
  //   [username, setUsername] = useState(''),
  //     [password, setPassword] = useState(''),
  //     [email, setEmail] = useState(''),
  //     [token, setToken] = useState({}),
  //     loginURL = 'http://localhost:4000/login';

  const handleSubmit = e => {
    e.preventDefault();
    // const response = axios.post(loginURL, { username, password });
    // setToken(response.jwt);
  };

  const handleCancel = () => history.push('/');

  return (
    <div className="container login-form rounded">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="email-signup" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-7">
            <input
              type="email"
              className="form-control"
              id="email-signup"
              //   onChange={e => setEmail(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="username-signup" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="username-signup"
              //   onChange={e => setUsername(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password-signup" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-7">
            <input
              type="password"
              className="form-control"
              id="password-signup"
              //   onChange={e => setPassword(e.currentTarget.value)}
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
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <p>
        {'Already have an account? '}
        <Link to="/login" className="link-color">
          Log in!
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
