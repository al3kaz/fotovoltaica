import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import Modules from '../../components/modules/modules.component';
import Inverter from '../../components/inverter/inverter.component';
import TotalPrice from '../../components/totalPrice/totalPrice.component';
import Spinner from '../../components/spinner/spinner';

const db = firebase.firestore();

const Calculator = () => {
  //fetch data
  const [moduls, setModuls] = React.useState(false);
  const [inverters, setInverters] = React.useState(false);
  //input data
  const [requestedPower, setRequestedPower] = React.useState('');
  const [moduleIndex, setModuleIndex] = React.useState('');
  const [modulePower, setModulePower] = React.useState('');
  const [clientInfo, setClientInfo] = React.useState('');
  const [phase, setPhase] = React.useState('');
  const [inverterProducent, setInverterProducent] = React.useState('');
  const [
    correctInverterModelPrice,
    setCorrectInverterModelPrice,
  ] = React.useState('');
  const [typeOfRoof, setTypeofRoof] = React.useState('');

  React.useEffect(() => {
    const modulesRef = db.collection('moduls');
    const invertersRef = db.collection('inverters');
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
  }, []);

  if (!inverters) {
    return <Spinner />;
  }

  const modulePrice = () => {
    if (moduleIndex) return moduls[moduleIndex].price;
  };
  const instalationPower = (e) => setRequestedPower(e.target.value);
  const modulesCount = Math.floor((requestedPower * 1000) / modulePower);
  const truePower = (modulesCount * modulePower) / 1000;

  const totalNetPrice = 1;

  console.log('żądana moc', requestedPower);
  console.log('ilość modułów', modulesCount);
  console.log('moc modułu', modulePower);
  console.log('konstrukcja dachu', typeOfRoof);
  console.log(clientInfo, '%');
  console.log(phase, 'fazowy');
  console.log('inwerter Producent:', inverterProducent);
  console.log('inwerter cena', correctInverterModelPrice);
  console.log('-----------------------');

  return (
    <div
      data-test="component-calculator"
      className="d-flex flex-column justify-content-between"
    >
      <Navigation />
      <div className="d-flex flex-column bd-highlight m-3 ">
        <div className="m-2">
          <label className="pe-2">Żądana moc</label>
          <input type="number" onChange={instalationPower} />
          <label>kWp</label>
        </div>
        <Modules
          moduls={moduls}
          setModulePower={setModulePower}
          setTypeofRoof={setTypeofRoof}
          setModuleIndex={setModuleIndex}
        />
        <p className="fw-bold">moc : {truePower} kWp</p>
        <div className="m-2">
          <label className="pe-2">liczba modułów</label>
          <input type="number" value={modulesCount} />
        </div>
        <div className="m-2">
          <label className="pe-2">rodzaj klienta</label>
          <select onChange={(e) => setClientInfo(e.target.value)}>
            <optgroup label="klient">
              <option value="" selected disabled hidden />
              <option value="8">indywidualny 8%</option>
              <option value="23">indywidualny 23%</option>
              <option value="23">firma 23%</option>
              <option value="8">rolnik 8%</option>
              <option value="23">rolnik 23%</option>
            </optgroup>
          </select>
        </div>
      </div>
      <Inverter
        inverters={inverters}
        truePower={truePower}
        phase={phase}
        setPhase={setPhase}
        inverterProducent={inverterProducent}
        setInverterProducent={setInverterProducent}
        setCorrectInverterModelPrice={setCorrectInverterModelPrice}
      />
      <TotalPrice totalNetPrice={totalNetPrice} />
    </div>
  );
};

export default Calculator;
