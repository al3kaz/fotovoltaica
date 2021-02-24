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
  const uniqueInvertersBrand = inverters
    .map((e) => e['brand'])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((obj) => allInverters[obj])
    .map((e) => allInverters[e]);

  function sortInvertes(a, b) {
    if (a.maxDC < b.maxDC) {
      return -1;
    }
    if (a.maxDC > b.maxDC) {
      return 1;
    }
    return 0;
  }
  const inverterModels = inverters
    .filter(
      (model) =>
        model.brand === inverterProducent &&
        model.phase === phase &&
        model.ACpower / 1000 >= truePower
    )
    .sort(sortInvertes)
    .map((item) => {
      return (
        <option key={item.id} value={item.price}>
          '{item.model}' AC:'{item.ACpower / 1000}' DC'{item.maxDC / 1000}
        </option>
      );
    });

  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <h3>Informacje o falowniu </h3>
      <form
        onClick={(e) => {
          if (phase === '1') {
            setPhase('3');
            e.target.checked = false;
          } else setPhase(e.target.value);
        }}
      >
        {truePower <= 3.6 ? (
          <span className="m-1">
            <input type="radio" id="one" value="1" />
            <label for="one" className="ps-2">
              1-fazowy
            </label>
          </span>
        ) : null}
      </form>
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
            setCorrectInverterModelPrice(1 * e.target.value);  
          }}
        >
          <optgroup label="moduły do wyboru">
            <option value="" selected disabled hidden />
            {inverterModels}
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default Inverter;
