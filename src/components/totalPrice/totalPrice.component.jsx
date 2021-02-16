import React from 'react';

const TotalPrice = ({
  totalNetPriceWithMargins,
  totalGrosPrice,
  vat,
  setMargins,
}) => {
  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <div>
        <label className="pe-2">Marża</label>
        <input
          type="number"
          onChange={(e) => {
            setMargins(1 * e.target.value);
          }}
        />
      </div>
      <p>cena netto : {totalNetPriceWithMargins}</p>
      <p>VAT : {vat}</p>
      <p>cena brutton : {totalGrosPrice}</p>
    </div>
  );
};

export default TotalPrice;
