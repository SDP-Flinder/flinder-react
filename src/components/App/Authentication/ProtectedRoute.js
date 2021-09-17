import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from ".";
import ErrorRoute from "../Router/ErrorRoute";
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { jwt, isAuthed, user } = useAuth();
  const role = user?.role;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed) {
          // Return back error if route is restricted by role
          if (roles && roles.indexOf(role) === -1) {
            return (
              <ErrorRoute
                title="Insufficient Permissions"
                
              />
            );
          }
          // Return component
          return <Component {...rest} {...props} />;
          
        } else {
          return (
            <Redirect
              to={{
                pathname: "/landing",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
