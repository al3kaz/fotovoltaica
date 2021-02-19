import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { useModuls } from '../context/moduls.context';
import { useInverters } from '../context/inverters.context';
import { useConstructions } from '../context/constructions.context';
import { useInstallation } from '../context/installation.context';
import { useProtection } from '../context/protection.context';

const db = firebase.firestore();

const useFirestoreData = () => {
  const [moduls, setModuls] = useModuls();
  const [inverters, setInverters] = useInverters();
  const [constructions, setConstructions] = useConstructions();
  const [installation, setInstallation] = useInstallation();
  const [protection, setProtection] = useProtection();

  React.useEffect(() => {
    const modulesRef = db.collection('moduls');
    const invertersRef = db.collection('inverters');
    const constructionsRef = db.collection('constructions');
    const installationRef = db.collection('installation');
    const protectionRef = db.collection('protection');

    modulesRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModuls(data);
    });
    invertersRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInverters(data);
    });
    constructionsRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConstructions(data);
    });
    installationRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstallation(data);
    });
    protectionRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProtection(data);
    });
  }, []);

  return [moduls, inverters, constructions, installation, protection];
};
export default useFirestoreData;
