import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import ModulesLink from '../../components/databaseLink/modulesLink/modulesLink.componet';
import invertersLink from '../../components/databaseLink/invertersLink/invertersLink.components';
import Navigation from '../../components/navigation/navigation.component';
import AcDcLink from '../../components/databaseLink/AcDcLink/AcDcLink.component';
import InstallationLink from '../../components/databaseLink/installationLink/installationLink.component';
import ConstructionLink from '../../components/databaseLink/constructionsLink/contructionsLink.components';
import ProtectionLink from '../../components/databaseLink/protectionLink/protectionLink.component';

const Database = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Navigation />
      <div className="d-flex flex-column bd-highlight m-3 justify-content-center">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/modules`}>
              Moduły
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/inverters`}>
              Falowniki
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/constructions`}>
              Konstrukcja
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/installation`}>
              Montaż (Cennik)
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/ppoz`}>
              Zabezpieczenie PPOŻ
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/ac/dc`}>
              Zabezpieczenie AC/DC
            </NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path={`${path}/modules`} component={ModulesLink} />
        <Route path={`${path}/inverters`} component={invertersLink} />
        <Route path={`${path}/constructions`} component={ConstructionLink} />
        <Route path={`${path}/installation`} component={InstallationLink} />
        <Route path={`${path}/ppoz`} component={ProtectionLink} />
        <Route path={`${path}/ac/dc`} component={AcDcLink} />
      </Switch>
    </>
  );
};
export default Database;
