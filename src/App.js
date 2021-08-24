import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstStep from './components/FirstStep';
import FlinderHeader from './components/FlinderHeader';
import Flatee from './components/Flatee';
import Flat from './components/Flat';
import Confirmation from './components/Confirmation';

//This contains all the routes to the '/signup/'
const AppRouter = () => {

  return(
  <BrowserRouter>
    <div className="container">
      <FlinderHeader />
      <Switch>
        <Route component={FirstStep} path="/" exact={true} />
        <Route component={Flat} path="/flat" />
        <Route component={Flatee} path="/flatee" />
        <Route component={Confirmation} path="/complete" />
      </Switch>
    </div>
  </BrowserRouter>
  )
};

export default AppRouter;