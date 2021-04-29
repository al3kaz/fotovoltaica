import React, {useContext} from 'react';
import { NavLink, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
// import Calculator from '../../Pages/calculator/calculator';
import {
  ModuleView,
  InvertersView,
  Navigation,
  AcDcView,
  InstallationView,
  ConstructionView,
  ProtectionView,
} from './index';

const Database = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  if(!user.user.admin) {history.push('/databaseSimple')};



  let { path, url } = useRouteMatch();

  return (
    <>
      <Navigation />
      <div className="d-flex bd-highlight m-3 justify-content-center">
        <ul className="nav nav-pills text-center">
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
        <Route path={`${path}/modules`} component={ModuleView} />
        <Route path={`${path}/inverters`} component={InvertersView} />
        <Route path={`${path}/constructions`} component={ConstructionView} />
        <Route path={`${path}/installation`} component={InstallationView} />
        <Route path={`${path}/ppoz`} component={ProtectionView} />
        <Route path={`${path}/ac/dc`} component={AcDcView} />
      </Switch>
    </>
  );
};
export default Database;
