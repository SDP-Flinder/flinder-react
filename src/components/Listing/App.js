import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import '../../style/global.css';
import { ReactComponent as FlinderLogo } from '../../assets/logo.svg';
import CreateListing from "./CreateListing";
import UpdateListing from "./UpdateListing";
import ListingList from "./ListingList";
import Listing from "./Listing";
import Login from "./Login";
import AccountPage from "./AccountPage";

//Set up the rooutes and their required states and props to be passed in

const AppRouter = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  return (
    <BrowserRouter>
      <div className="backround">
        <div className="layout">
          <div>
            <FlinderLogo className="logo-display" />
          </div>
          <Switch>
            <Route
              render={(props) => (
                <Login {...props} user={user} updateUser={updateUser} />
              )}
              path="/"
              exact={true} />
            <Route
              render={(props) => (
                <AccountPage {...props} user={user} />
              )}
              path="/account"
              exact={true} />
            <Route
              render={(props) => (
                <CreateListing {...props} user={user} />
              )}
              path="/listings/add"
              exact={true} />
            <Route
              render={(props) => (
                <UpdateListing {...props} user={user} />
              )}
              path="/listings/update"
              exact={true} />
            <Route
              render={(props) => (
                <ListingList {...props} user={user} />
              )}
              path="/listings/"
              exact={true} />
            <Route
              render={(props) => (
                <Listing {...props} user={user} />
              )}
              path="/listings/listing"
              exact={true} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
};

export default AppRouter;