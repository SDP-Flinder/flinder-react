import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstStep from './components/FirstStep';
// import FlinderHeader from './components/FlinderHeader';
import Flatee from './components/Flatee';
import Flat from './components/Flat';
import Confirmation from './components/Confirmation';
import { useState } from 'react';
import './styles.css';
import {ReactComponent as FlinderLogo} from './components/assets/logo.svg';
import Address from './components/FlatSteps/Address';
import WelcomePage from './components/WelcomePage';


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
  <div className = "backround">
    <div className = "layout">
      <div>
      <FlinderLogo className = "logo-display"/>
      </div>
      <Switch>
        <Route   
          render={(props) => (
          <WelcomePage {...props} user={user} updateUser={updateUser} />
          )}
         path="/" 
         exact={true}/>

        <Route   
          render={(props) => (
          <FirstStep {...props} user={user} updateUser={updateUser} />
          )}
         path="/sign-up/" 
         exact={true}/>

        <Route   
          render={(props) => (
          <Flat {...props} user={user} updateUser={updateUser} />
          )}
         path="/sign-up/flat" 
         exact={true}/>
         
         <Route   
          render={(props) => (
          <Flatee {...props} user={user} updateUser={updateUser} />
          )}
         path="/sign-up/flatee" 
         exact={true}/>

        <Route   
          render={(props) => (
          <Confirmation {...props} user={user} updateUser={updateUser} />
          )}
         path="/sign-up/complete" 
         exact={true}/>

        <Route   
          render={(props) => (
          <Address {...props} user={user} updateUser={updateUser} />
          )}
         path="/trial" 
         exact={true}/>
      </Switch>
    </div>
  </div>
  </BrowserRouter>
  )
};

export default AppRouter;