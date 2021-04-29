import React from 'react';
import useFirestoreData from '../../../hooks/useFirestoreData';

const DatabaseModuls = () => {
  const [moreInfo, setMoreInfo] = React.useState({});
  const { moduls } = useFirestoreData();

  function sortmodules(a, b) {
    if (a.power < b.power) {
      return -1;
    }
    if (a.power > b.power) {
      return 1;
    }
    return 0;

  }

  const toggleInfoShow = (id) => {
    setMoreInfo((prevMoreInfo) => ({
      [id]: !prevMoreInfo[id],
    }));
  };

  const modulsList = moduls.sort(sortmodules).map((modul) => {
    return (
      <>
      <tr
          onClick={() => {
            toggleInfoShow(modul.id);
          }}
          className="container"
        >
          <td className="col mb-2">{modul.brand}</td>
          <td className="col m-2">{modul.model}</td>
          <td className="col m-2">{modul.power}</td>
        </tr>
        {moreInfo[modul.id] ? (
          <tr>
            <td colspan="3">
              <h5 className="card-title">{modul.brand}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{modul.model}</h6>
              <p className="card-text">{modul.description}</p>
              <p className="card-text">moc : {modul.power}</p>
              <p className="card-text">wysokośc : {modul.height}</p>
              <p className="card-text">szerokość : {modul.width}</p>
              <p className="card-text">gwarancja : {modul.warranty}</p>
            </td>
          </tr>
        ) : null}
      </>
    );
  });

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
          <th scope="col">MARKA</th>
          <th scope="col">MODEL</th>
          <th scope="col">MOC</th>
          </tr>
        </thead>
        <tbody>{modulsList}</tbody>
      </table>
    </>
  );
};

export default DatabaseModuls;
