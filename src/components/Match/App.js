import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { useState } from 'react';
import '../../style/global.css';
import MatchList from "./MatchList";


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

  return (
    <BrowserRouter>
      <Route path="/" exact component={MatchList} />
    </BrowserRouter>
  )
};

export default AppRouter;