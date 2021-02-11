import React from 'react';

const TotalPrice = ({ totalNetPrice }) => {
  return (
    <div className="d-flex flex-column bd-highlight m-3 ">
      <div>
        <label className="pe-2">Marża</label>
        <input type="number" />
      </div>
      <p>cena netto : {totalNetPrice}</p>
      <p>VAT : 1</p>
      <p>cena brutton : 2</p>
    </div>
  );
};

export default TotalPrice;
