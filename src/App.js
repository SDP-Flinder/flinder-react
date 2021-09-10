import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import './styles.css';
import { ReactComponent as FlinderLogo } from './Components/assets/logo.svg';
import CreateListing from "./Components/CreateListing";
import UpdateListing from "./Components/UpdateListing";
import ListingList from "./Components/ListingList";
import Listing from "./Components/Listing";
import Login from "./Components/Login";
import AccountPage from "./Components/AccountPage";

const AppRouter = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const [listing, setListing] = useState({});

  const updateListing = (listing) => {
    setListing(listing);
  };

  const [listings, setListings] = useState({});

  const updateListings = (listings) => {
    setListings(listings);
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
                <Login {...props} updateUser={updateUser} />
              )}
              path="/"
              exact={true} />
              <Route
              render={(props) => (
                <AccountPage {...props} user={user} updateListings={updateListings} />
              )}
              path="/account"
              exact={true} />
            <Route
              render={(props) => (
                <CreateListing {...props} user={user} updateListing={updateListing} />
              )}
              path="/listings/add"
              exact={true} />
              <Route
              render={(props) => (
                <UpdateListing {...props} listing={listing} user={user} />
              )}
              path="/listings/update"
              exact={true} />
              <Route
              render={(props) => (
                <ListingList {...props} updateListing={updateListing} user={user} listings={listings} />
              )}
              path="/listings/"
              exact={true} />
              <Route
              render={(props) => (
                <Listing {...props} listing={listing} user={user} />
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