import React from 'react';
import {
  reducer,
  useFirestoreData,
  Navigation,
  Modules,
  Inverter,
  TotalPrice,
  Spinner,
  NewClientForm,
  Opti,
} from './index';

const Calculator = () => {
  const {
    moduls,
    inverters,
    constructions,
    installation,
    protection,
    settings,
    opti
  } = useFirestoreData();
  
// console.log(state.moduleIndex)

  const [state, dispatch] = React.useReducer(reducer, {
    requestedPower: 10,
    moduleIndex: 0,
    modulePower: 0,
    clientInfo: 0,
    phase: 3,
    inverterProducent: '',
    correctInverterModelId: '',
    typeOfRoof: 0,
    intallationPrice: 0,
    margins: 0,
    moduleCount: 0,
    optiIndex: 0,
    optiCount: 0,
    optiCheck: false
  });

console.log(state.moduleIndex)

  React.useEffect(() => {
    if (moduls.length === 0 || settings.length === 0 || opti.length === 0) return;
    setModuleCount(
      Math.floor((state.requestedPower * 1000) / state.modulePower)
    );
  }, [state.requestedPower, state.modulePower, moduls.length, settings.length]);

  if (moduls.length === 0 || settings.length === 0 || opti.length === 0) return <Spinner />;
  

  //////////////////////reducer functions
  const setRequestedPower = (requestedPower) =>
    dispatch({ type: 'setRequestedPower', payload: requestedPower });

  const setModuleIndex = (moduleIndex) =>
    dispatch({ type: 'setModuleIndex', payload: moduleIndex });

  const setModulePower = (modulePower) =>
    dispatch({ type: 'setModulePower', payload: modulePower });

  const setClientInfo = (clientInfo) =>
    dispatch({ type: 'setClientInfo', payload: clientInfo });

  const setPhase = (phase) => dispatch({ type: 'setPhase', payload: phase });

  const setInverterProducent = (inverterProducent) => {
    dispatch({ type: 'setInverterProducent', payload: inverterProducent });
  }

  const setCorrectInverterModelId = (correctInverterModelId) =>
    dispatch({
      type: 'setCorrectInverterModelId',
      payload: correctInverterModelId,
    });

  const setTypeOfRoof = (typeOfRoof) =>
    dispatch({ type: 'setTypeOfRoof', payload: typeOfRoof });

  const setModuleCount = (moduleCount) =>
    dispatch({ type: 'setModuleCount', payload: moduleCount });

  const setMargins = (margins) =>
    dispatch({ type: 'setMargins', payload: margins });
  
  const setOptiIndex = (optiIndex) =>
    dispatch({ type: 'setOptiIndex', payload: optiIndex });
  
  const setOptiCount = (optiCount) =>
    dispatch({ type: 'setOptiCount', payload: optiCount });
  
  const setOptiCheck = (optiCheck) =>
    dispatch({ type: 'setOptiCheck', payload: optiCheck });
  ///////////////////////////////// end

  // React.useEffect(() => {

  // }, [])

  const modulePrice = () => {
    if (state.moduleIndex >= 0) return moduls[state.moduleIndex].price;
  };
  
  const optiPrice = () => {
    if (state.optiIndex >= 0) return opti[state.optiIndex].price;
  };

  const truePower = (state.moduleCount * state.modulePower) / 1000;

  const installationPrice = () => {
    if (truePower) {
      const installFilter = installation.filter(
        (item) => item.powermax > truePower && item.powermin < truePower
      );
      if (installFilter.length !== 0) {
        return installFilter[0].price;
      } else return 0;
    }
  };

  const protectionCount = () => {
    if (truePower) {
      const protFilter = protection.filter(
        (item) => item.powermax >= truePower && item.powermin <= truePower
      );
      if (protFilter.length !== 0) {
        return protFilter
          .map((item) => item.price)
          .reduce((totalProtectionCount, protectionPrice) => {
            return totalProtectionCount + protectionPrice;
          });
      } else return 0;
    }
  };
  const selectedInverter = inverters.filter(
    (item) => item.id === state.correctInverterModelId
  );

  const selectedInverterPrice = selectedInverter.map((item) => item.price);

  // const selectedInverterModel = selectedInverter.map((item) => item.model);

  const constMargin = 1* settings.constmargin;

  // const minMargin = 12
  const minMargin = 1* settings.minmargin
  

  const totalNetPrice =
    (state.moduleCount * modulePrice() +
    parseFloat(selectedInverterPrice[0]) +
    state.moduleCount * state.typeOfRoof +
    truePower * installationPrice() +
    protectionCount() +
    state.optiCount * optiPrice())*(1+constMargin);
  
  // console.log(settings[0].constmargin)
  // console.log(settings[0].minmargin)

  const totalNetPriceWithMargins = (
    (state.margins / 100) * totalNetPrice +
    totalNetPrice
  ).toFixed(2);

  const totalGrosPrice = (totalNetPriceWithMargins * state.clientInfo).toFixed(2);
  const vat = () => {
    if (totalGrosPrice === 0) return null;
    else return (totalGrosPrice - totalNetPriceWithMargins).toFixed(2);
  };

  console.log('protection '+protectionCount())
  console.log('inverter price '+ selectedInverterPrice)
  console.log('module price '+ modulePrice())
  console.log('margin z profile ')

  return (
    <div
      data-test="component-calculator"
      className="mx-auto d-flex flex-column justify-content-center text-end"
    >
      <Navigation />
      <div className="mx-auto d-flex flex-column bd-highlight m-3 justify-content-center">
        <div className="mx-auto m-2 ">
          <label className="mx-auto pe-2">Żądana moc (kWp)</label>
          <input
            type="number"
            value={state.requestedPower!=0 ? state.requestedPower : ''}
            onChange={(e) => {e.target.value>50 ? setRequestedPower(50) :
              setRequestedPower(1 * e.target.value);
            }}
          />
        </div>
        <Modules
          moduls={moduls}
          constructions={constructions}
          setModulePower={setModulePower}
          setTypeOfRoof={setTypeOfRoof}
          setModuleIndex={setModuleIndex}
        />
        <div className="mx-auto m-2">
          <table className="mx-auto fw-bold mb-2">
            <tr>
              <td className='text-end pe-2'>
                moc:
              </td>
              <td className='text-start'>
                {isNaN(truePower) ? '0' : truePower} kWp
              </td>
            </tr>
          </table>
          <label className="mx-auto pe-2">liczba modułów</label>
          <input type="number" value={state.moduleCount} className='mb-2' readOnly/>
          <div className='d-flex justify-content-center'>
          <button
            className="btn btn-outline-warning mx-2 fw-bold"
            onClick={() => {
              state.moduleCount>0 ? setModuleCount(state.moduleCount - 1) : setModuleCount(0);
            }}
          >
            odejmij
          </button>
          <button
            className="btn btn-outline-warning mx-2 fw-bold"
            onClick={() => {
              setModuleCount(state.moduleCount + 1);
            }}
          >
            dodaj
          </button>
          </div>
        </div>
        <div className="mx-auto m-2">
          <label className="mx-auto pe-2">podatek</label>
          <select onChange={(e) => setClientInfo(1 * e.target.value)}>
            <optgroup label="podatek">
              <option value="" selected disabled hidden />
              <option value="1.08">8%</option>
              <option value="1.23">23%</option>
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
        setCorrectInverterModelId={setCorrectInverterModelId}
      />
      
      <Opti
        opti = {opti}
        optiCheck = {state.optiCheck}
        optiIndex = {state.optiIndex}
        optiCount = {state.optiCount}
        setOptiCheck = {setOptiCheck}
        setOptiCount = {setOptiCount}
        setOptiIndex = {setOptiIndex}
        moduleCount = {state.moduleCount}
        inverterProducent = {state.inverterProducent}
      />
      <TotalPrice
        totalNetPriceWithMargins={totalNetPriceWithMargins}
        totalGrosPrice={totalGrosPrice}
        vat={vat()}
        setMargins={setMargins}
        margins={state.margins}
        minMargin = {minMargin}
      />
      {/* <Commission 
        totalNetPrice={totalNetPrice}
      /> */}
      {/* <NewClientForm
        power={JSON.stringify(truePower)}
        installationType={JSON.stringify(state.typeOfRoof)}
        phase={state.phase}
        moduleCount={JSON.stringify(state.moduleCount)}
        module={moduls[state.moduleIndex].model}
        inverter={selectedInverterModel[0]}
        netPrice={JSON.stringify(totalNetPriceWithMargins)}
        grosPrice={totalGrosPrice}
        vat={vat()}
        interestVat={JSON.stringify(Math.round((state.clientInfo - 1) * 100))}
      /> */}
    </div>
  );
};

export default Calculator;
