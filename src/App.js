import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModulsProvider } from './context/moduls.context';
import { InvertersProvider } from './context/inverters.context';
import { ConstructionsProvider } from './context/constructions.context';
import { InstallationProvider } from './context/installation.context';
import { ProtectionProvider } from './context/protection.context';
import HomePage from './Pages/homePage/homePage';
import SignIn from './components/signIn/signIn';
import Calculator from './Pages/calculator/calculator';
import Offers from './Pages/offers/offers';
import Database from './Pages/database/database';
import Spinner from './components/spinner/spinner';
import { UserContext } from './providers/UserProvider';

const App = () => {
  const user = useContext(UserContext);
  if (user === null) return <Spinner />;
  if (user.user === undefined) return <SignIn />;

  return (
    <div className="container">
      <Switch>
        <InvertersProvider>
          <ModulsProvider>
            <ConstructionsProvider>
              <InstallationProvider>
                <ProtectionProvider>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/calculator" component={Calculator} />
                  <Route path="/Offers" component={Offers} />
                  <Route path="/database" component={Database} />
                </ProtectionProvider>
              </InstallationProvider>
            </ConstructionsProvider>
          </ModulsProvider>
        </InvertersProvider>
      </Switch>
    </div>
  );
};

export default App;
