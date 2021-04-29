import React, {useEffect, useState} from 'react';

const Opti = ({
  opti,
  optiIndex,
  optiCheck,
  optiCount,
  setOptiCheck,
  setOptiCount,
  setOptiIndex,
  moduleCount,
  inverterProducent
}) => {
  

const [noOptiChange, setNoOptiChange] = useState(false)

useEffect(() => {
  setNoOptiChange(false)
  if (inverterProducent === 'Solaredge'){
    setOptiCount(moduleCount)
    setOptiIndex(0)
    setOptiCheck(true)
    setNoOptiChange(true)
  } else if(optiCheck){
    setOptiIndex(1)
  } else {setOptiCount(0)}
},  [optiCheck, moduleCount, inverterProducent])
 

  return (
    <>
      <div className="m-2 text-center">
        {/* <table className='mx-auto fw-bold mb-2'>
          <tr>
            <td className='text-end'>
              <label>Optymalizatory:</label>
            </td>
            <td className=''>
              <input
              type='checkbox'
              checked={optiCheck}
              onChange={(e) => setOptiCheck(!optiCheck)}
              />
            </td>
          </tr>
        </table> */}
        <button
          className='btn btn-outline-warning'
          onClick={()=>setOptiCheck(!optiCheck)}
          disabled={noOptiChange}
        >Optymalizatory</button>
        <div className="text-center text-weight-bold" hidden={!optiCheck}>
          {opti[optiIndex].brand+' - '+opti[optiIndex].model}
        </div>
        <div className="text-center text-weight-bold" hidden={!optiCheck}>
          <label className="mx-auto pe-2 text-end">Liczba optymalizatorów</label>
          <input
            className='mb-2'
            type="number" 
            value={optiCount}
            min={0}
            onChange={(e) => setOptiCount(1* e.target.value)}
            readOnly={noOptiChange}
          />
          <div className='d-flex justify-content-center'>
            <button
              className="btn btn-outline-warning mx-2 fw-bold"
              onClick={() => optiCount>0 ? setOptiCount(optiCount-1) : setOptiCount(0)}
              hidden={noOptiChange}
            >
              odejmij
            </button>
            <button
              className="btn btn-outline-warning mx-2 fw-bold"
              onClick={() => setOptiCount(optiCount+1)}
              hidden={noOptiChange}
            >
              dodaj
            </button>
          </div>
        </div>
        {/* {JSON.stringify(opti)} */}
        
        {/* <input
          type='checkbox'
          value = {optiCheck}
          onChange={(e) => {
            setOptiCheck(!optiCheck)
          }}
        >
          <optgroup label="optymalizatory">
            <option value="" selected disabled hidden />
            {showOpti}
          </optgroup>
        </input>
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
        </select> */}
      </div>
    </>
  );
};

export default Opti;
