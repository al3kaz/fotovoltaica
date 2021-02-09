import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Pages/homePage/homePage";
import LoginPage from "./components/login/login";
import Calculator from "./Pages/calculator/calculator";
import Offers from "./Pages/offers/offers";
import Database from "./Pages/database/database";

const App = () => {
  const [login, setLogin] = React.useState(true);

  const handleLogin = () => {
    setLogin(false);
  };
  return (
    <div className="container">
      {login ? (
        <LoginPage handleLogin={handleLogin} />
      ) : (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/calculator" component={Calculator} />
          <Route exact path="/Offers" component={Offers} />
          <Route exact path="/database" component={Database} />
        </Switch>
      )}
    </div>
  );
};

export default App;
