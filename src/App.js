import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <Route exact path="/" component={HomePage} />
        <Route path="/calculator" component={Calculator} />
        <Route exact path="/Offers" component={Offers} />
        <Route exact path="/database" component={Database} />
      </Switch>
    </div>
  );
};

export default App;
