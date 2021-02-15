import React from 'react';

const Modules = ({ moduls, constructions, setModulePower, setTypeOfRoof, setModuleIndex }) => {
  const showModule = moduls.map((item) => {
    return (
      <option key={item.id} value={item.power} price={item.price}>
        {item.brand}
      </option>
    );
  });

  const priceDependingOnRoof = (value) => {
    const roofType = constructions.filter(item => item.type === value).map(item => item.price)
    setTypeOfRoof(roofType[0])
  };

  return (
    <div className="d-flex flex-column bd-highlight m-3">
      <div className="m-2">
        <label className="pe-2">moduł</label>
        <select
          onChange={(e) => {
            setModuleIndex(e.target.selectedIndex - 1);
            setModulePower(e.target.value);
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
            <option value="flat">dach prosty</option>
            <option value="slant">dach skośny</option>
            <option value="ground">grunt</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default Modules;
