import React from 'react';
import useFirestoreData from '../../../hooks/useFirestoreData';

const DatabaseModuls = () => {
  const [moreInfo, setMoreInfo] = React.useState({});
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

  const toggleInfoShow = (id) => {
    setMoreInfo((prevMoreInfo) => ({
      [id]: !prevMoreInfo[id],
    }));
  };

  const invertersList = inverters.sort(sortinvertes).map((inverter) => {
    return (
      <div
        onClick={() => {
          toggleInfoShow(inverter.id);
        }}
        className="container"
      >
        <div className="row border-top  border-secondary">
          <div className="col m-2">{inverter.brand}</div>
          <div className="col m-2">{inverter.model}</div>
          <div className="col m-2">{(1 * inverter.price).toFixed(2)}</div>
        </div>
        {moreInfo[inverter.id] ? (
          <p class="card">
            <div className="card-body">
              <h5 className="card-title">{inverter.brand}</h5>
              <h6 className="card-subtitle mx-2 text-muted">
                {inverter.model}
              </h6>
              <p className="card-text">{inverter.description}</p>
              <p className="card-text">moc AC : {inverter.ACpower}</p>
              <p className="card-text">moc DC : {inverter.maxDC}</p>
              <p className="card-text">gwarancja : {inverter.warranty}</p>
            </div>
          </p>
        ) : null}
      </div>
    );
  });

  return (
    <div>
      <div className="row">
        <div className="col m-2 fw-bold">MARKA</div>
        <div className="col m-2 fw-bold">MODEL</div>
        <div className="col m-2 fw-boldcd ka  ">CENA</div>
        {invertersList}
      </div>
    </div>
  );
};

export default DatabaseModuls;
