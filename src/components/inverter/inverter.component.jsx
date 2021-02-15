import React from 'react';

const Inverter = ({
  inverters,
  truePower,
  phase,
  setPhase,
  inverterProducent,
  setInverterProducent,
  setCorrectInverterModelPrice,
}) => {
  const allInverters = inverters.map((item) => {
    return (
      <option key={item.id} value={item.brand}>
        {item.brand}
      </option>
    );
  });

  const uniqueInvertersBrand = allInverters
    .map((e) => e['brand'])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((obj) => allInverters[obj])
    .map((e) => allInverters[e]);

  const inverterModelPrice = inverters
    .filter((model) => model.brand === inverterProducent)
    .map((item) => {
      return (
        <option key={item.id} value={item.price}>
          {item.model}
        </option>
      );
    });
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
          <optgroup label="Producent">
            <option value="" selected disabled hidden />
            {uniqueInvertersBrand}
          </optgroup>
        </select>
      </div>
      <div className="m-2">
        <label className="pe-2">Model falownika</label>
        <select
          onChange={(e) => {
            setCorrectInverterModelPrice(e.target.value);
          }}
        >
          <optgroup label="moduły do wyboru">
            <option value="" selected disabled hidden />
            {inverterModelPrice}
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default Inverter;
