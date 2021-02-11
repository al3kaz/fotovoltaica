import React from 'react';

const Inverter = ({
  inverter,
  truePower,
  phase,
  setPhase,
  inverterProducent,
  setInverterProducent,
  setCorrectInverterModelPrice,
}) => {
  const showInverters = inverter.map((item) => {
    return (
      <option key={item.Producent} value={item.Producent}>
        {item.Producent}
      </option>
    );
  });
  let inverterModelListArr;
  if (inverterProducent) {
    inverterModelListArr = inverter
      .filter((item) => item.Producent === inverterProducent)[0]
      .model.filter((item) => item.phase === phase)
      .map((item) => {
        return (
          <option key={item.model} value={item.price}>
            {item.model}
          </option>
        );
      });
  }
  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <h3>Informacje o falowniu </h3>
      {truePower <= '3.6' ? (
        <span className="m-1">
          <input
            type="checkbox"
            value="1"
            onChange={(e) => {
              setPhase(e.target.value);
            }}
          />
          <label className="ps-2"> 1-fazowy</label>
        </span>
      ) : null}
      <span className="m-1">
        <input
          type="checkbox"
          value="3"
          onClick={(e) => {
            setPhase(e.target.value);
          }}
        />
        <label className="ps-2"> 3-fazowy</label>
      </span>
      <div className="m-2">
        <label className="pe-2">Producent falownika</label>
        <select
          onChange={(e) => {
            setInverterProducent(e.target.value);
          }}
        >
          <optgroup label="Producent">{showInverters}</optgroup>
        </select>
      </div>
      <div className="m-2">
        <label className="pe-2">Model falownika</label>
        <select
          onChange={(e) => {
            setCorrectInverterModelPrice(e.target.value);
          }}
        >
          <optgroup label="moduły do wyboru">{inverterModelListArr}</optgroup>
        </select>
      </div>
    </div>
  );
};

export default Inverter;
