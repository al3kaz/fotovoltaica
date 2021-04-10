import React, {useState} from 'react';

const TotalPrice = ({
  totalNetPriceWithMargins,
  totalGrosPrice,
  vat,
  setMargins,
}) => {
  return (
    <div className="mx-auto d-flex flex-column bd-highlight m-3">
      <div className="mx-auto d-flex m-2 ">
        <label className="mx-auto pe-2">Marża</label>
        <input
          type="number"
          onChange={(e) => {
            setMargins(1 * e.target.value);
          }}
        />
      </div>
      <p>
        cena netto :{' '}
        {isNaN(totalNetPriceWithMargins) ? 'brak danych' : totalNetPriceWithMargins}
      </p>
      <p>VAT : {isNaN(vat) ? 'brak danych' : vat}</p>
      <p>cena brutto : {isNaN(totalGrosPrice) ? 'brak danych' : totalGrosPrice}</p>
    </div>
  );
};

export default TotalPrice;
