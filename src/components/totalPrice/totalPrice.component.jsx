import React from 'react';

const TotalPrice = ({
  totalNetPriceWithMargins,
  totalGrosPrice,
  vat,
  setMargins,
  margins,
  minMargin
}) => {
React.useEffect(()=> {
  setMargins(minMargin)
}, [])

  return (
    <div className="mx-auto d-flex flex-column bd-highlight m-3">
      <div className="mx-auto d-flex m-2 ">
        <label className="mx-auto pe-2">Marża</label>
        <input
          type="number"
          value={margins}
          min={minMargin}
          onChange={(e) => setMargins(1 * e.target.value)}
          readOnly
        />
      </div>
      <div className='d-flex justify-content-center'>
            <button
              className="btn btn-outline-warning mx-2 fw-bold"
              onClick={() => margins>minMargin ? setMargins(margins-1) : setMargins(minMargin)}
            >
              odejmij
            </button>
            <button
              className="btn btn-outline-warning mx-2 fw-bold"
              onClick={() => setMargins(margins+1)}
            >
              dodaj
            </button>
          </div>
      <table>
        <tr>
          <td className='text-end fw-bold pe-2'>cena netto:</td>
          <td className='text-start'>{isNaN(totalNetPriceWithMargins) ? ' brak danych' : totalNetPriceWithMargins+' zł'}</td>
        </tr>
        <tr>
          <td className='text-end fw-bold pe-2'>VAT:</td>
          <td className='text-start'> {isNaN(vat) ? ' brak danych' : vat+' zł'}</td>
        </tr>
        <tr>
          <td className='text-end fw-bold pe-2'>cena brutto:</td>
          <td className='text-start'> {isNaN(totalGrosPrice) ? ' brak danych' : totalGrosPrice+' zł'}</td>
        </tr>
      </table>
    </div>
  );
};

export default TotalPrice;
