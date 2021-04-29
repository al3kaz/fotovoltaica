import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ModulsProvider } from './providers/modulsProvider';
import { InvertersProvider } from './providers/invertersProvider';
import { ConstructionsProvider } from './providers/constructionsProvider';
import { InstallationProvider } from './providers/installationProvider';
import { ProtectionProvider } from './providers/protectionProvider';
import HomePage from './Pages/homePage/homePage';
import Profile from './Pages/profile/profile';
import SignIn from './components/signIn/signIn';
import Calculator from './Pages/calculator/calculator';
import Offers from './Pages/offers/offers';
import Database from './Pages/database/database';
import DatabaseSimple from './Pages/databaseSimple/databaseSimple';
import Spinner from './components/spinner/spinner';
import { UserContext } from './providers/UserProvider';
import { SettingsProvider } from './providers/settingsProvider';
import { OptiProvider } from './providers/optiProvider';

const App = () => {
  const user = useContext(UserContext);
  if (user === null) return <Spinner />;
  if (user.user === undefined) return <SignIn />;

  return (
    <div className="container justify-content-center">
      <Switch>
        <InvertersProvider>
          <ModulsProvider>
            <ConstructionsProvider>
              <InstallationProvider>
                <ProtectionProvider>
                  <SettingsProvider>
                    <OptiProvider>
                      <Route exact path="/" component={Calculator}/>
                      {/* <Route path="/calculator" component={Calculator} /> */}
                      <Route path="/Offers" component={Offers} />
                      <Route path="/database" component={Database} />
                      <Route path="/databaseSimple" component={DatabaseSimple} />
                      <Route path="/profile" component={Profile} />
                    </OptiProvider>
                  </SettingsProvider>
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
