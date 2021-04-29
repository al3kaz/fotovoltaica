import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { useModuls } from '../providers/modulsProvider';
import { useInverters } from '../providers/invertersProvider';
import { useConstructions } from '../providers/constructionsProvider';
import { useInstallation } from '../providers/installationProvider';
import { useProtection } from '../providers/protectionProvider';
import { useSettings } from '../providers/settingsProvider';
import { useOpti } from '../providers/optiProvider';

const db = firebase.firestore();

const useFirestoreData = () => {
  const [moduls, setModuls] = useModuls();
  const [inverters, setInverters] = useInverters();
  const [constructions, setConstructions] = useConstructions();
  const [installation, setInstallation] = useInstallation();
  const [protection, setProtection] = useProtection();
  const [settings, setSettings] = useSettings();
  const [opti, setOpti] = useOpti();

  React.useEffect(() => {
    if (moduls.length !== 0) return;
    const modulesRef = db.collection('moduls');
    const invertersRef = db.collection('inverters');
    const constructionsRef = db.collection('constructions');
    const installationRef = db.collection('installation');
    const protectionRef = db.collection('protection');
    const settingsRef = db.collection('settings').doc('settings');
    const optiRef = db.collection('opti');

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
    settingsRef.get().then((snapshot) => {
      const data = snapshot.data();
      // const data = snapshot.data.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      console.log(data);
      setSettings(data);
    });
    optiRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOpti(data);
    });
  }, []);

  return { moduls, inverters, constructions, installation, protection, settings, opti };
};
export default useFirestoreData;
