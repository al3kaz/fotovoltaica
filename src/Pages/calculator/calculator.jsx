import React from 'react';

import { useModuls } from '../../context/moduls.context';
import { useInverters } from '../../context/inverters.context';
import { useConstructions } from '../../context/constructions.context';
import { useInstallation } from '../../context/installation.context';
import { useProtection } from '../../context/protection.context';

import Navigation from '../../components/navigation/navigation.component';
import Modules from '../../components/modules/modules.component';
import Inverter from '../../components/inverter/inverter.component';
import TotalPrice from '../../components/totalPrice/totalPrice.component';

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
    case 'setMargins':
      return { ...state, margins: action.payload };
    default:
      throw new Error(`invalid aciotn type: ${action.type}`);
  }
}

const Calculator = () => {
  const [moduls] = useModuls();
  const [inverters] = useInverters();
  const [constructions] = useConstructions();
  const [installation] = useInstallation();
  const [protection] = useProtection();

  const [state, dispatch] = React.useReducer(reducer, {
    requestedPower: 0,
    moduleIndex: 0,
    modulePower: 0,
    clientInfo: 0,
    phase: 3,
    inverterProducent: '',
    correctInverterModelPrice: 0,
    typeOfRoof: 0,
    intallationPrice: 0,
    margins: 0,
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

  const setMargins = (margins) =>
    dispatch({ type: 'setMargins', payload: margins });

  const modulePrice = () => {
    if (state.moduleIndex >= 0) return moduls[state.moduleIndex].price;
  };
  const instalationPower = (e) => setRequestedPower(e.target.value);

  const modulesCount = Math.floor(
    (state.requestedPower * 1000) / state.modulePower
  );
  const truePower = (modulesCount * state.modulePower) / 1000;

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

  const totalNetPrice =
    modulesCount * modulePrice() +
    state.correctInverterModelPrice +
    modulesCount * state.typeOfRoof +
    truePower * installationPrice() /*koszty AC/DC tutaj*/ +
    protectionCount(); /*narzut na koszty stałe*/

  const totalNetPriceWithMargins =
    (state.margins / 100) * totalNetPrice + totalNetPrice;

  const totalGrosPrice = (totalNetPriceWithMargins * state.clientInfo).toFixed(
    2
  );

  const vat = (totalGrosPrice - totalNetPriceWithMargins).toFixed(2);

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
          constructions={constructions}
          setModulePower={setModulePower}
          setTypeOfRoof={setTypeOfRoof}
          setModuleIndex={setModuleIndex}
        />
        <p className="fw-bold">moc : {isNaN(truePower) ? '' : truePower} kWp</p>
        <div className="m-2">
          <label className="pe-2">liczba modułów</label>
          <input type="number" value={modulesCount} />
        </div>
        <div className="m-2">
          <label className="pe-2">rodzaj klienta</label>
          <select onChange={(e) => setClientInfo(1 * e.target.value)}>
            <optgroup label="klient">
              <option value="" selected disabled hidden />
              <option value="1.08">indywidualny 8%</option>
              <option value="1.23">indywidualny 23%</option>
              <option value="1.23">firma 23%</option>
              <option value="1.08">rolnik 8%</option>
              <option value="1.23">rolnik 23%</option>
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
      <TotalPrice
        totalNetPriceWithMargins={totalNetPriceWithMargins}
        totalGrosPrice={totalGrosPrice}
        vat={vat}
        setMargins={setMargins}
      />
    </div>
  );
};

export default Calculator;
