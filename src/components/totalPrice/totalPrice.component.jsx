import React from 'react';

const TotalPrice = ({ totalNetPrice, totalGrosPrice, vat }) => {
  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <div>
        <label className="pe-2">Marża</label>
        <input type="number" />
      </div>
      <p>cena netto : {totalNetPrice}</p>
      <p>VAT : {vat}</p>
      <p>cena brutton : {totalGrosPrice}</p>
    </div>
  );
};

export default TotalPrice;
