import React from 'react';

const Modules = ({
  moduls,
  constructions,
  setModulePower,
  setTypeOfRoof,
  setModuleIndex,
}) => {
  
  function sortModules(a, b) {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  }
  const showModule = moduls.sort(sortModules).map((item) => {
    return (
      <option key={item.id} value={item.power} >
        {item.brand} "{item.model}"
      </option>
    );
  });

  const priceDependingOnRoof = (value) => {
    const roofType = constructions
      .filter((item) => item.type === value)
      .map((item) => item.price);
    setTypeOfRoof(roofType[0]);
  };

  return (
    <>
      <div className="m-2">
        <label className="pe-2">moduł</label>
        <select
          onChange={(e) => {
            setModuleIndex(e.target.selectedIndex);
            setModulePower(e.target.value);
            localStorage.setItem('moduleIndex', e.target.selectedIndex -1)
          }}
        >
          <optgroup label="moduły do wyboru">
            <option value="" selected disabled hidden />
            {showModule}
          </optgroup>
        </select>
      </div>
      <div className="m-2">
        <label className="pe-2">konstrukcja</label>
        <select onChange={(e) => priceDependingOnRoof(e.target.value)}>
          <optgroup label="rodzaj dachu">
            <option value="" selected disabled hidden />
            <option value="flat">dach płaski</option>
            <option value="slant">dach skośny</option>
            <option value="ground">grunt</option>
          </optgroup>
        </select>
      </div>
    </>
  );
};

export default Modules;
