import React from 'react';
import { BrowserRouter, Route, Switch, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import './styles.css';
import { ReactComponent as FlinderLogo } from './Components/assets/logo.svg';
import CreateListing from "./Components/CreateListing";
import UpdateListing from "./Components/UpdateListing";
import ListingList from "./Components/ListingList";
import Listing from "./Components/Listing";
import Button from '@mui/material/Button';
// import Navbar from "./Components/Navbar";

//This contains all the routes to the '/signup/'
const AppRouter = () => {
  const [listing, setListing] = useState({});

  const updateListing = (listing) => {
    setListing(listing);
    // setListing((prevListing) => ({ ...prevListing, ...listing }));
  };

  // const resetUser = () => {
  //   setUser({});
  // };

  return (
    <BrowserRouter>
      <div className="backround">
        <div className="layout">
          <div>
            <FlinderLogo className="logo-display" />
          </div>
          <Button component={RouterLink} to="/listings/add">
            Create Listing
          </Button>
          <Button component={RouterLink} to="/listings/">
            Listings
          </Button>
          <Switch>
            <Route
              render={(props) => (
                <CreateListing {...props} />
              )}
              path="/listings/add"
              exact={true} />
              <Route
              render={(props) => (
                <UpdateListing {...props} listing={listing} />
              )}
              path="/listings/update"
              exact={true} />
              <Route
              render={(props) => (
                <ListingList {...props} listing={listing} updateListing={updateListing} />
              )}
              path="/listings/"
              exact={true} />
              <Route
              render={(props) => (
                <Listing {...props} listing={listing} />
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