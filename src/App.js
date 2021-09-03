import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstStep from './components/FirstStep';
// import FlinderHeader from './components/FlinderHeader';
import Flatee from './components/Flatee';
import Flat from './components/Flat';
import Confirmation from './components/Confirmation';
import { useState } from 'react';
import './styles.css';
import {ReactComponent as FlinderLogo} from './components/assets/logo.svg'

//This contains all the routes to the '/signup/'
const AppRouter = () => {
  //Best place to store data entered by user is here
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  // const resetUser = () => {
  //   setUser({});
  // };

  return(
  <BrowserRouter>
    <div className = "layout">
      <div>
      <FlinderLogo className = "logo-display"/>
      </div>
      <Switch>
        <Route   
          render={(props) => (
          <FirstStep {...props} user={user} updateUser={updateUser} />
          )}
         path="/" 
         exact={true}/>

        <Route   
          render={(props) => (
          <Flat {...props} user={user} updateUser={updateUser} />
          )}
         path="/flat" 
         exact={true}/>
         
        <Route component={Flatee} path="/flatee" />

        <Route   
          render={(props) => (
          <Confirmation {...props} user={user} updateUser={updateUser} />
          )}
         path="/complete" 
         exact={true}/>

      </Switch>
    </div>
  </BrowserRouter>
  )
};

export default AppRouter;