import React from 'react';

const Inverter = ({ inverter, truePower }) => {
  const [phase, setPhase] = React.useState('')

  const showInverters = inverter.map(item => {
    return (
      <option key={item.model} value={item.Producent}>
        {item.Producent}
      </option>
    );
  })

  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <h3>Informacje o falowniu </h3>
      {truePower <= "3.6" ? <span className="m-1">
        <input type="checkbox" value="1" onClick={(e) => { setPhase(e.target.value) }} />
        <label className="ps-2"> 1-fazowy</label>
      </span> : null}
      <span className="m-1">
        <input type="checkbox" value="3" onClick={(e) => { setPhase(e.target.value) }} />
        <label className="ps-2"> 3-fazowy</label>
      </span>
      <div className="m-2">
        <label className="pe-2">Producent falownika</label>
        <select>
          <option defaultValue selected disabled hidden>
            producent
          </option>
          {showInverters}
        </select>
      </div>
      <div className="m-2">
        <label className="pe-2">Model falownika</label>
        <select>
          <option defaultValue selected disabled hidden>
            model
          </option>
        </select>
      </div>
    </div>
  );
};

export default Inverter;
