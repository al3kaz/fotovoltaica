import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import Modules from '../../components/modules/modules.component';
import Inverter from '../../components/inverter/inverter.component';
import TotalPrice from '../../components/totalPrice/totalPrice.component';
import Spinner from '../../components/spinner/spinner';

const db = firebase.firestore();

function reducer(state, action) {
  switch (action.type) {
    case 'setRequestedPower':
      return { ...state, requestedPower: action.payload };
    case 'setModuleIndex':
      return { ...state, moduleIndex: action.payload };
    case 'setModulePower':
      return { ...state, modulePower: action.payload };
    case 'setClientInfo':
      return { ...state, clientInfo: action.payload };
    case 'setPhase':
      return { ...state, phase: action.payload };
    case 'setInverterProducent':
      return { ...state, inverterProducent: action.payload };
    case 'setCorrectInverterModelPrice':
      return { ...state, correctInverterModelPrice: action.payload };
    case 'setTypeOfRoof':
      return { ...state, typeOfRoof: action.payload };
    default:
      throw new Error(`invalid aciotn type: ${action.type}`);
  }
}

const Calculator = () => {
  //fetch data
  const [moduls, setModuls] = React.useState(false);
  const [inverters, setInverters] = React.useState(false);

  const [state, dispatch] = React.useReducer(reducer, {
    requestedPower: 0,
    moduleIndex: '',
    modulePower: 0,
    clientInfo: 0,
    phase: 1,
    inverterProducent: '',
    correctInverterModelPrice: 0,
    typeOfRoof: 0,
  });

  const setRequestedPower = (requestedPower) =>
    dispatch({ type: 'setRequestedPower', payload: requestedPower });

  const setModuleIndex = (moduleIndex) =>
    dispatch({ type: 'setModuleIndex', payload: moduleIndex });

  const setModulePower = (modulePower) =>
    dispatch({ type: 'setModulePower', payload: modulePower });

  const setClientInfo = (clientInfo) =>
    dispatch({ type: 'setClientInfo', payload: clientInfo });

  const setPhase = (phase) => dispatch({ type: 'setPhase', payload: phase });

  const setInverterProducent = (inverterProducent) =>
    dispatch({ type: 'setInverterProducent', payload: inverterProducent });

  const setCorrectInverterModelPrice = (correctInverterModelPrice) =>
    dispatch({
      type: 'setCorrectInverterModelPrice',
      payload: correctInverterModelPrice,
    });

  const setTypeOfRoof = (typeOfRoof) =>
    dispatch({ type: 'setTypeOfRoof', payload: typeOfRoof });

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
    if (state.moduleIndex || state.moduleIndex === 0)
      return moduls[state.moduleIndex].price;
  };
  console.log(modulePrice());
  const instalationPower = (e) => setRequestedPower(e.target.value);

  const modulesCount = Math.floor(
    (state.requestedPower * 1000) / state.modulePower
  );
  const truePower = (modulesCount * state.modulePower) / 1000;

  const totalNetPrice = modulesCount * modulePrice;
  console.log(typeof modulesCount, typeof modulePrice);

  console.log('żądana moc', state.requestedPower);
  console.log('ilość modułów', modulesCount);
  console.log('moc modułu', state.modulePower);
  console.log('cena modułu');
  console.log('konstrukcja dachu', state.typeOfRoof);
  console.log(state.clientInfo, '%');
  console.log(state.phase, 'fazowy');
  console.log('inwerter Producent:', state.inverterProducent);
  console.log('inwerter cena', state.correctInverterModelPrice);
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
          setTypeOfRoof={setTypeOfRoof}
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
        phase={state.phase}
        setPhase={setPhase}
        inverterProducent={state.inverterProducent}
        setInverterProducent={setInverterProducent}
        setCorrectInverterModelPrice={setCorrectInverterModelPrice}
      />
      <TotalPrice totalNetPrice={totalNetPrice} />
    </div>
  );
};

export default Calculator;
