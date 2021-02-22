import React from 'react';

const SearchBar = ({ setSearch, search }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="inputGroup-sizing-default">
        Search
      </span>
      <input
        type="text"
        className="form-control"
        onChange={(e) => { setSearch(e.target.value) }}
        value={search}
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      ></input>
    </div>
  );
};

export default SearchBar;
