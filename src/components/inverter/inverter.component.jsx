import React from 'react';

const Inverter = ({
  inverters,
  truePower,
  phase,
  setPhase,
  inverterProducent,
  setInverterProducent,
  setCorrectInverterModelId,
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
    if (1 * a.acpower < 1 * b.acpower) {
      return -1;
    }
    if (1 * a.acpower > 1 * b.acpower) {
      return 1;
    }
    return 0;
  }

  const inverterModels = inverters
    .filter(
      (model) =>
        model.brand === inverterProducent &&
        model.phase === phase &&
        model.maxdc / 1000 >= truePower
    )
    .sort(sortInvertes)
    .map((item) => {
      return (
        <option key={item.id} value={item.id}>
          '{item.model}' AC:'{item.acpower / 1000}' DC'{item.maxdc / 1000}
        </option>
      );
    });

  return (
    <div className="mx-auto d-flex flex-column bd-highlight m-3">
      {truePower <= 3.6 ? (
        <span className="mx-auto m-1">
          <input
            type="checkbox"
            id="one"
            name="one"
            onClick={(e) => {
              if (phase === 1) {
                setPhase(3);
                e.target.checked = false;
              } else setPhase(1);
            }}
          />
          <label for="one" className="mx-auto ps-2">
            1-fazowy
          </label>
        </span>
      ) : null}
      <div className="mx-auto m-2">
        <label className="mx-auto pe-2">Producent falownika</label>
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
      <div className="mx-auto m-2">
        <label className="mx-auto pe-2">Model falownika</label>
        <select
          onChange={(e) => {
            setCorrectInverterModelId(e.target.value);
          }}
        >
          <optgroup label="falowniki do wyboru">
            <option value="" selected disabled hidden />
            {inverterModels}
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default Inverter;
