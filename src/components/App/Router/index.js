import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../Auth/Login";
import Logout from "../../Auth/Logout";
import Register from "../../Auth/Register";
import Dashboard from "../../Dashboard";
import Landing from "../../Landing";
import Listing from "../../Listing";
import Profile from "../../Profile";
import NewListing from "../../Listing/newListing"
import Home from "../../Home"
import { Role } from "../Authentication";
import ProtectedRoute from "../Authentication/ProtectedRoute";
import ErrorRoute from "./ErrorRoute";

const Router = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/landing" component={Landing} />
    {/* Protected */}
    <ProtectedRoute exact roles={[Role.Admin]} path="/dashboard" component={Dashboard} />
    <ProtectedRoute exact roles={[Role.Flat]} path="/newlisting" component={NewListing} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/listing" component={Listing} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <Route component={ErrorRoute} />
  </Switch>
);

export default Router;