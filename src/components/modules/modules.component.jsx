import React from 'react';

const Modules = ({ module }) => {
  return (
    <div className="d-flex flex-column bd-highlight m-3">
      <div className="m-2">
        <label className="pe-2">moduł</label>
        <select>
          <option defaultValue selected disabled hidden>
            moduł
          </option>
          {module}
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
    </div>
  );
};

export default Modules;
