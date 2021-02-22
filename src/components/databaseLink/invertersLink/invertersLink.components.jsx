import React from 'react';
import useFirestoreData from '../../../hooks/useFirestoreData';

const DatabaseModuls = () => {
  const [modules, inverters] = useFirestoreData();

  function sortinvertes(a, b) {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  }
  const inverterslist = inverters.sort(sortinvertes).map((inverter) => {
    return (
      <tr key={inverter.model}>
        <td>{inverter.brand}</td>
        <td>{inverter.model}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table table-striped table-hover">
        <tr className="table-active">
          <th scope="col">Marka</th>
          <th scope="col">Model</th>
        </tr>
        <tbody>{inverterslist}</tbody>
      </table>
    </div>
  );
};

export default DatabaseModuls;
