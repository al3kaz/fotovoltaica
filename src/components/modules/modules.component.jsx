import React from 'react';

const Modules = ({ module, setModulePower }) => {

  const showModule = module.map(item => {
    return (
      <option key={item.model} value={item.moc}>
        {item.Producent}
      </option>
    );
  })

  return (
    <div className="d-flex flex-column bd-highlight m-3">
      <div className="m-2">
        <label className="pe-2">moduł</label>
        <select onChange={(e) => setModulePower(e.target.value)}>
          <option defaultValue selected disabled hidden>
            moduł
          </option>
          {showModule}
        </select>
      </div>
      <div className="m-2">
        <label className="pe-2">konstrukcja</label>
        <select>
          <option disabled selected hidden>
            konstrukcja
          </option>
          <option value="flat">dach prosty</option>
          <option value="slant">dach skośny</option>
          <option value="ground">grunt</option>
        </select>
      </div>
    </div >
  );
};

export default Modules;
