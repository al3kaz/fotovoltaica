import firebase from 'firebase/app';
import 'firebase/firestore';
import { data } from './data';
const db = firebase.firestore();

export const addDataToFiresotre = () => {
  data.forEach(function (obj) {
    db.collection('inverters')
      .add({
        available: obj.available,
        brand: obj.brand,
        model: obj.model,
        ACpower: obj.ACpower,
        maxDC: obj.maxDC,
        mppt: obj.mppt,
        stringsNum: obj.stringsNum,
        phase: obj.phase,
        warranty: obj.warranty,
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
