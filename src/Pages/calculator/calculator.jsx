import React from 'react';
import axios from 'axios';
import Navigation from '../../components/navigation/navigation.component';
import Modules from '../../components/modules/modules.component';
import Inverter from '../../components/inverter/inverter.component';
import TotalPrice from '../../components/totalPrice/totalPrice.component';

const Calculator = () => {
  const [module, setModule] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/module')
      .then(function (response) {
        const data = response.data;
        const fetchedModule = data.map((item) => {
          return (
            <option key={item.model} value={item.Producent}>
              {item.Producent}
            </option>
          );
        });
        setModule(fetchedModule);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div
      data-test="component-calculator"
      className="d-flex flex-column justify-content-between"
    >
      <Navigation />
      <div className="d-flex flex-column bd-highlight m-3 ">
        <div className="m-2">
          <label className="pe-2">Moc instalacji</label>
          <input type="number" />
        </div>
        <div className="m-2">
          <label className="pe-2">rodzaj klienta</label>
          <select>
            <option defaultValue selected disabled hidden>
              Rodzaj klienta
            </option>
            <option value="person8">indywidualny 8%</option>
            <option value="person23">indywidualny 23%</option>
            <option value="company23">firma 23%</option>
            <option value="far8">rolnik 8%</option>
            <option value="far23">rolnik 23%</option>
          </select>
        </div>
      </div>
      <Modules module={module} />
      <Inverter />
      <TotalPrice />
    </div>
  );
};

export default Calculator;
