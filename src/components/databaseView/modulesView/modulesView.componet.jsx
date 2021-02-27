import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import FormInput from '../../form-input/form-input.component';
import useFirestoreData from '../../../hooks/useFirestoreData';
const db = firebase.firestore();

const DatabaseModuls = () => {
  const [moreInfo, setMoreInfo] = React.useState({});
  const [moduls] = useFirestoreData();
  const [moduleCredentials, setModuleCredentials] = React.useState({
    brand: '',
    datasheet: '',
    description: '',
    model: '',
    height: '',
    width: '',
    power: '',
    powerWarranty: '',
    warranty: '',
    price: '',
    available: false,
    blackframe: false,
    fullblack: false,
  });
  const {
    brand,
    datasheet,
    description,
    model,
    height,
    width,
    power,
    powerWarranty,
    warranty,
    price,
    available,
    blackframe,
    fullblack,
  } = moduleCredentials;

  const addNewModule = (e) => {
    e.preventDefault();
    db.collection('moduls')
      .add({
        available,
        blackframe,
        brand,
        datasheet,
        description,
        fullblack,
        height,
        model,
        power,
        powerWarranty,
        price,
        warranty,
        width,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

    setModuleCredentials({
      brand: '',
      datasheet: '',
      description: '',
      model: '',
      height: '',
      width: '',
      power: '',
      powerWarranty: '',
      warranty: '',
      price: '',
      available: false,
      blackframe: false,
      fullblack: false,
    });
    return alert('dodałes nowy moduł');
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setModuleCredentials({
      ...moduleCredentials,
      [name]: value,
    });
  };
  const toggleInfoShow = (id) => {
    setMoreInfo((prevMoreInfo) => ({
      [id]: !prevMoreInfo[id],
    }));
  };

  const modulsList = moduls.map((modul) => {
    return (
      <div
        onClick={() => {
          toggleInfoShow(modul.id);
        }}
        className="container"
      >
        <div className="row border-top  border-secondary">
          <div className="col mb-2">{modul.brand}</div>
          <div className="col m-2">{modul.model}</div>
          <div className="col m-2">{modul.price}</div>
        </div>
        {moreInfo[modul.id] ? (
          <p class="card">
            <div className="card-body">
              <h5 className="card-title">{modul.brand}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{modul.model}</h6>
              <p className="card-text">{modul.description}</p>
              <p className="card-text">moc : {modul.power}</p>
              <p className="card-text">wysokośc : {modul.height}</p>
              <p className="card-text">szerokość : {modul.width}</p>
              <p className="card-text">gwarancja : {modul.warranty}</p>
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
        <div className="col m-2 fw-bold">CENA</div>
        {modulsList}
      </div>
      <form onSubmit={addNewModule}>
        <FormInput
          type="text"
          label="wpisz nazwe modułu"
          name="brand"
          value={brand}
          onChange={handleChange}
          required
        ></FormInput>
        <FormInput
          type="text"
          label="dane"
          name="datasheet"
          value={datasheet}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          type="text"
          label="opis"
          name="description"
          value={description}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          type="text"
          label="nazwa modelu"
          name="model"
          value={model}
          onChange={handleChange}
          required
        ></FormInput>
        <FormInput
          type="number"
          label="wysokość"
          name="height"
          value={height}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          type="number"
          label="szerokość"
          name="width"
          value={width}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          type="number"
          label="moc"
          name="power"
          value={power}
          onChange={handleChange}
          required
        ></FormInput>
        <FormInput
          type="number"
          label="gwaranca na moc ?"
          name="powerWarranty"
          value={powerWarranty}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          type="number"
          label="gwarancja na moduł"
          name="warranty"
          value={warranty}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          type="number"
          label="Cena"
          name="price"
          value={price}
          onChange={handleChange}
          required
        ></FormInput>
        <button className="btn btn-success mb-3" type="submit">
          dodaj Moduł
        </button>
      </form>
    </div>
  );
};

export default DatabaseModuls;
