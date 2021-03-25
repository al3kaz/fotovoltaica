import React from 'react';
import useFirestoreData from '../../../hooks/useFirestoreData';
import AddToFirestore from '../../../CSVToFirestore/AddToFirestore';

const DatabaseModuls = () => {
  const [moreInfo, setMoreInfo] = React.useState({});
  const { inverters } = useFirestoreData();

  function sortinvertes(a, b) {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  }

  const toggleInfoShow = (id) => {
    setMoreInfo((prevMoreInfo) => ({
      [id]: !prevMoreInfo[id],
    }));
  };

  const invertersList = inverters.sort(sortinvertes).map((inverter) => {
    return (
      <>
        <tr
          onClick={() => {
            toggleInfoShow(inverter.id);
          }}
          className="container"
        >
          <td className="col mb-2">{inverter.brand}</td>
          <td className="col m-2">{inverter.model}</td>
          <td className="col m-2">{inverter.price}</td>
        </tr>
        {moreInfo[inverter.id] ? (
          <tr>
            <td colspan="3">
              <h5 className="card-title">{inverter.brand}</h5>
              <h6 className="card-subtitle mx-2 text-muted">
                {inverter.model}
              </h6>
              <p className="card-text">{inverter.description}</p>
              <p className="card-text">moc AC : {inverter.ACpower}</p>
              <p className="card-text">moc DC : {inverter.maxDC}</p>
              <p className="card-text">gwarancja : {inverter.warranty}</p>
            </td>
          </tr>
        ) : null}
      </>
    );
  });

  return (
    <>
      <AddToFirestore collection="inverters2" />
      <table class="table table-striped table-hover">
        <thead>
          <th scope="col">MARKA</th>
          <th scope="col">MODEL</th>
          <th scope="col">CENA</th>
        </thead>
        <tbody>{invertersList}</tbody>
      </table>
    </>
  );
};

export default DatabaseModuls;
