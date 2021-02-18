import firebase from 'firebase/app';
import 'firebase/firestore';
import { data } from './data';
const db = firebase.firestore();

export const addDataToFiresotre = () => {
  data.forEach(function (obj) {
    db.collection('moduls')
      .add({
        available: obj.available,
        brand: obj.brand,
        model: obj.model,
        power: obj.power,
        width: obj.width,
        height: obj.height,
        warranty: obj.warranty,
        powerWarranty: obj.powerWarranty,
        price: obj.price,
        description: obj.description,
        datasheet: obj.datasheet,
        ncrfg: obj.ncrfg,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  });
};
