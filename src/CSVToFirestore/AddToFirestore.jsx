import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import CSVReader from 'react-csv-reader';
const db = firebase.firestore();

const AddToFirestore = ({ collection }) => {
  const [csvData, setCsvData] = React.useState(false);

  const addDataToFiresotre = (file, collection) => {
    file.forEach(function (obj) {
      const keys = Object.keys(obj);
      const tmp = {};
      keys.forEach((key) => (tmp[key] = obj[key]));
      db.collection(collection)
        .add(tmp)
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
    });
  };

  const handleForce = (data, fileInfo) => {
    setCsvData(data);
    console.log(data, fileInfo);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <CSVReader
        cssClass="react-csv-input"
        label="Dodaj dane z pliku CSV "
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      <button
        className="btn btn-dark btn-sm "
        onClick={() => addDataToFiresotre(csvData, collection)}
      >
        dodaj
      </button>
    </div>
  );
};

export default AddToFirestore;
