import React from 'react';
import axios from 'axios';
import Navigation from '../../components/navigation/navigation.component';
import Modules from '../../components/modules/modules.component';
import Inverter from '../../components/inverter/inverter.component';
import TotalPrice from '../../components/totalPrice/totalPrice.component';

const Calculator = () => {
  //fetch data
  const [components, setComponents] = React.useState(false);
  //input data
  const [requestedPower, setRequestedPower] = React.useState(0);
  const [clientInfo, setClientInfo] = React.useState(0);
  const [modulePower, setModulePower] = React.useState('');
  const [phase, setPhase] = React.useState('');
  const [inverterProducent, setInverterProducent] = React.useState('');
  const [correctInverterModel, setCorrectInverterModel] = React.useState('');

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/components')
      .then(function (response) {
        const data = response.data;
        setComponents(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!components) return <p>loading...</p>;

  const instalationPower = (e) => setRequestedPower(e.target.value);
  const modulesCount = Math.floor((requestedPower * 1000) / modulePower);
  const truePower = (modulesCount * modulePower) / 1000;

  console.log('żądana moc', requestedPower);
  console.log('ilość modułów', modulesCount);
  console.log(clientInfo, '%');
  console.log(phase, 'fazowy');
  console.log('inwerter Producent:', inverterProducent);
  console.log('inwerter cena', correctInverterModel);

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
        </div>
        <Modules module={components.module} setModulePower={setModulePower} />
        <p>moc : {truePower}</p>
        <div className="m-2">
          <label className="pe-2">liczba modułów</label>
          <input type="number" value={modulesCount} />
        </div>
        <div className="m-2">
          <label className="pe-2">rodzaj klienta</label>
          <select onChange={(e) => setClientInfo(e.target.value)}>
            <option defaultValue selected disabled hidden>
              Rodzaj klienta
            </option>
            <option value="8">indywidualny 8%</option>
            <option value="23">indywidualny 23%</option>
            <option value="23">firma 23%</option>
            <option value="8">rolnik 8%</option>
            <option value="23">rolnik 23%</option>
          </select>
        </div>
      </div>
      <Inverter
        inverter={components.inverter}
        truePower={truePower}
        phase={phase}
        setPhase={setPhase}
        inverterProducent={inverterProducent}
        correctInverterModel={correctInverterModel}
        setInverterProducent={setInverterProducent}
        setCorrectInverterModel={setCorrectInverterModel}
      />
      <TotalPrice />
    </div>
  );
};

export default Calculator;
