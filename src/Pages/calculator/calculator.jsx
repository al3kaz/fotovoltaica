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
} from './index';

const Calculator = () => {
  const {
    moduls,
    inverters,
    constructions,
    installation,
    protection,
  } = useFirestoreData();

  const [state, dispatch] = React.useReducer(reducer, {
    requestedPower: 0,
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
  });
  React.useEffect(() => {
    if (moduls.length === 0) return;
    setModuleCount(
      Math.floor((state.requestedPower * 1000) / state.modulePower)
    );
  }, [state.requestedPower, state.modulePower, moduls.length]);

  if (moduls.length === 0) return <Spinner />;

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

  const setInverterProducent = (inverterProducent) =>
    dispatch({ type: 'setInverterProducent', payload: inverterProducent });

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
  ///////////////////////////////// end

  const modulePrice = () => {
    if (state.moduleIndex >= 0) return moduls[state.moduleIndex].price;
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

  const selectedInverterModel = selectedInverter.map((item) => item.model);

  const totalNetPrice =
    state.moduleCount * modulePrice() +
    parseInt(selectedInverterPrice[0]) +
    state.moduleCount * state.typeOfRoof +
    truePower * installationPrice() /*koszty AC/DC tutaj*/ +
    protectionCount();
  /*narzut na koszty stałe*/

  const totalNetPriceWithMargins = (
    (state.margins / 100) * totalNetPrice +
    totalNetPrice
  ).toFixed(2);

  const totalGrosPrice = (totalNetPriceWithMargins * state.clientInfo).toFixed(
    2
  );
  const vat = () => {
    if (totalGrosPrice === 0) return null;
    else return (totalGrosPrice - totalNetPriceWithMargins).toFixed(2);
  };

  return (
    <div
      data-test="component-calculator"
      className="d-flex flex-column justify-content-between"
    >
      <Navigation />
      <div className="d-flex flex-column bd-highlight m-3 ">
        <div className="m-2">
          <label className="pe-2">Żądana moc</label>
          <input
            type="number"
            onChange={(e) => {
              setRequestedPower(1 * e.target.value);
            }}
          />
          <label>kWp</label>
        </div>
        <Modules
          moduls={moduls}
          constructions={constructions}
          setModulePower={setModulePower}
          setTypeOfRoof={setTypeOfRoof}
          setModuleIndex={setModuleIndex}
        />
        <div className="m-2">
          <p className="fw-bold">
            moc : {isNaN(truePower) ? '' : truePower} kWp
          </p>
          <label className="pe-2">liczba modułów</label>
          <button
            className="btn btn-light btn-sm mx-1"
            onClick={() => {
              setModuleCount(state.moduleCount - 1);
            }}
          >
            -
          </button>
          <input type="number" value={state.moduleCount} />
          <button
            className="btn btn-light btn-sm mx-1"
            onClick={() => {
              setModuleCount(state.moduleCount + 1);
            }}
          >
            +
          </button>
        </div>
        <div className="m-2">
          <label className="pe-2">podatek</label>
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
      <TotalPrice
        totalNetPriceWithMargins={totalNetPriceWithMargins}
        totalGrosPrice={totalGrosPrice}
        vat={vat()}
        setMargins={setMargins}
      />
      <NewClientForm
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
      />
    </div>
  );
};

export default Calculator;
