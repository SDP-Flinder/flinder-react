import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from ".";
import ErrorRoute from "../Router/ErrorRoute";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthed, user } = useAuth();
  const role = user?.role;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed) {
          // RBAC if route is restricted by role
          if (roles && roles.indexOf(role) === -1) {
            return (
              <ErrorRoute
                title="Insufficient Permissions"
              >
                You have insufficient permissions to view this page.
              </ErrorRoute>
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