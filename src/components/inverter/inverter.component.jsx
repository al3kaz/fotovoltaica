import React from 'react';

const Inverter = () => {
  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <h3>Informacje o falowniu </h3>
      <span className="m-1">
        <input type="checkbox" />
        <label className="ps-2"> 1-fazowy</label>
      </span>
      <span className="m-1">
        <input type="checkbox" />
        <label className="ps-2"> 3-fazowy</label>
      </span>
    </div>
  );
};

export default Inverter;
