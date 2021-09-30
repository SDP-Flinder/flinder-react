import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../Auth/Login";
import Logout from "../../Auth/Logout";
import Register from "../../Auth/Register";
import Dashboard from "../../Dashboard";
import Landing from "../../Landing";
import Profile from "../../Profile";
import Home from "../../Home"
import { Role } from "../Authentication";
import ProtectedRoute from "../Authentication/ProtectedRoute";
import ErrorRoute from "./ErrorRoute";
import CreateListing from '../../Listing/CreateListing';
import UpdateListing from '../../Listing/UpdateListing';
import ListingList from '../../Listing';
import ListingDisplay from '../../Listing/ListingDisplay';
import Forgot from "../../Auth/Forgot";
import AddBio from "../../Profile/AddBio";
import Match from "../../Match";
import MatchDetails from "../../Match/MatchDetails";
import BottomNav from "../Navigation/BottomNav";
import { useLocation } from "react-router";

//Display the navigation bar if the user is in those 3 routes
const displayNav = (route) => {
  switch(route){
    case "/":
      return true;
    case "/match":
      return true;
    case "/profile":
      return true;
    case "/listings":
      return true;
    case "/listing/display":
      return true;
    case "/newlisting":
      return true;
    case "/updatelisting":
      return true;
    default:
      return false;
  }
}

const Router = () => {
  //Retrive the location of the curernt path
  const location = useLocation();
  //Check if the user is in home, message, or profile page to display the navigation bar
  const setDisplay = displayNav(location.pathname);

  return (
  <>
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot" component={Forgot} />
    <Route exact path="/landing" component={Landing} />
    {/* Protected */}
    <ProtectedRoute exact roles={[Role.Admin]} path="/dashboard" component={Dashboard} />
    <ProtectedRoute exact roles={[Role.Flatee]} path="/addbio" component={AddBio} />
    <ProtectedRoute exact roles={[Role.Flat]} path="/newlisting" component={CreateListing} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact roles={[Role.Flat]} path="/updatelisting" component={UpdateListing} />
    <ProtectedRoute exact roles={[Role.Flat]} path="/listings" component={ListingList} />
    <ProtectedRoute exact path="/listing/display" component={ListingDisplay} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <ProtectedRoute exact path="/match" component={Match} />
    <ProtectedRoute exact path="/match/details" component={MatchDetails} />
    <Route component={ErrorRoute} />
  </Switch>
  {setDisplay && <BottomNav/>}
  </>
  )
};

export default Router;