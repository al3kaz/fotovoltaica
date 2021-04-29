import React, {useContext} from 'react';
import { NavLink, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
// import Calculator from '../../Pages/calculator/calculator';
import {
  ModuleSimpleView,
  InvertersSimpleView,
  Navigation,
} from './index';

const DatabaseSimple = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  if(user.user.admin) {history.push('/database')};



  let { path, url } = useRouteMatch();

  return (
    <>
      <Navigation />
      <div className="d-flex justify-content-center bd-highlight m-3">
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
        </ul>
      </div>

      <Switch>
        <Route path={`${path}/modules`} component={ModuleSimpleView} />
        <Route path={`${path}/inverters`} component={InvertersSimpleView} />
      </Switch>
    </>
  );
};
export default DatabaseSimple;
