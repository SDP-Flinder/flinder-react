import React, { createContext, useContext, useEffect, useState } from "react";
import * as API from "../api"

// Create Authentication Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Auth Provider
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const isAuthed = user?.id ? true : false;

  // Get current user data
  useEffect(() => {
    //TypeError: _api__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser(...) is null
    API.getCurrentUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzEzNDUxMjEsImV4cCI6MTYzMTk0OTkyMX0.yBRm2cBo3Iv9MX1W1toJU5P5HSCh0DWHyt4Tb7nj2rg')// TODO: Find place to store token and insert into function
    .then((res) => (
      console.log(res)
      (res?.id ? setUser(res) : setUser(null)
  )));
    return () => {
      setUser(null);
    };
  }, []);

  // Handle signing in
  const signin = (username, password, remember) => {
    API.authenticate(username, password)
    .then(function (response) {
      if (!response?.error && !response?.message) {
        if (remember) { // TODO: Session management
          return setUser(response);
         } else {
          return setUser(response);
         }
        return response;
      }
    })
    .catch(function (error) {
      // TODO: Deal with axios api errors
    })
  };

  // // Handle sign out
  // const signout = () => {
  //   return Api.revoke();
  // };

  // // Handle signing up
  // const signup = (data) => {
  //   return Api.register(data)
  // };

  return { user, isAuthed, signin, };
};

export const Role = {
    Admin: 'admin',
    Flat: 'flat',
    Flatee: 'flatee'
};