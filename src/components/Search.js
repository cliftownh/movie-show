import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from '../hooks/input-hook';

const Search = props => {
  const [type, setType] = useState('multi'),
    { value, bind, reset } = useInput(''),
    history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    reset();
    if (value.length > 0) {
      history.push(`/search/${type}/${encodeURIComponent(value)}`);
    }
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2 searchbar"
        type="search"
        placeholder="Search"
        aria-label="Search"
        {...bind}
      />
      <div className="input-group">
        <select
          className="custom-select"
          id="inputGroupSelect04"
          onChange={e => setType(e.currentTarget.value)}
        >
          <option value="multi">Search All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV</option>
          <option value="person">People</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-orange my-2 my-sm-0" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
