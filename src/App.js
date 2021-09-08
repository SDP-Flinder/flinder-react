import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { useState } from 'react';
import './styles.css';
import {ReactComponent as FlinderLogo} from './Components/assets/logo.svg';
import CreateListing from "./Components/CreateListing";


//This contains all the routes to the '/signup/'
const AppRouter = () => {
  // //Best place to store data entered by user is here
  // const [user, setUser] = useState({});

  // const updateUser = (data) => {
  //   setUser((prevUser) => ({ ...prevUser, ...data }));
  // };

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
        <Route path="/listings/add" exact component={CreateListing} />
    </div>
  </div>
  </BrowserRouter>
  )
};

export default AppRouter;