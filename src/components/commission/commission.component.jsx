import React from 'react';

const Commission = ({
  totalNetPrice,
  }) => {


  return (
    <div className="mx-auto d-flex flex-column bd-highlight m-3">
      
      
      <table>
        <tr>
          <td className='text-end fw-bold pe-2'>prowizja:</td>
          <td className='text-start'>{isNaN(totalNetPrice) ? ' brak danych' : totalNetPrice+' zł'}</td>
        </tr>
      </table>
    </div>
  );
};

export default Commission;
