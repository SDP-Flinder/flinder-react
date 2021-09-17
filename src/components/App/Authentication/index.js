import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Config } from '../../../config';

const axiosapi = axios.create({
    baseURL : Config.Local_API_URL
});

// JWT Storage in ether session or local (remember me)
const getJWT = () => {
  if(sessionStorage.getItem('jwt')) {
    return sessionStorage.getItem('jwt');
  } else {
    if(localStorage.getItem('jwt')) {
      return localStorage.getItem('jwt');
      } else {
      return null;
    }
  }
}

// Create Authentication Context
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Auth Provider
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  /* User object
   * {role, firstname, lastname, username, createdDate, id, token, tokenExp}
   */
  const [user, setUser] = useState(null);
  const isAuthed = (user) ? true : false;
  // const isAuthed = (user && jwt.decode(user.token, { complete: true }).payload.exp > Date.now) ? true : false;

  // Get current user data, if they are logged in
  useEffect(() => {
    const getUser = async () => {
      await axiosapi.get('/users/current', { 
        headers: { 'Authorization': `bearer ${getJWT()}`}
      })
      .then(function (response) {
          if (response.status == 200 && response.data?.id) {
            setUser(response.data);
            console.log(response.data)
            console.log(user)
          } else {
            setUser(null);
          }
      })
      .catch(function (error) {
          if(Config.Logging) 
            console.log(error)

          setUser(null)
      })
    }

    // If JWT is stored then load user
    if (getJWT() != null) {getUser()}

    return () => {
      setUser(null);
    };
  }, []);

  // Handle signing in
  const signin = async (username, password, remember) => {
    return await axiosapi.post('/users/authenticate', { 
      username: username, 
      password: password
    })
    .then(function (response) {
        if(Config.Logging) 
          console.log(response)
        // Hey Hacker! This is great for XSS isn't it?
        if (remember) { // Local storage, Remember the user after they close the browser
          localStorage.setItem('jwt', response.data?.token);
          setUser(response.data);
        } else { // Session storage, Don't remember the user after they close the browser
          sessionStorage.setItem('jwt', response.data?.token);
          setUser(response.data);
          
        }
        if(Config.Logging)
            console.log(`User object after signin: ${user}`);

        return response;
    })
    .catch(function (error) {
        if(Config.Logging)
            console.log(error)
        return error;
    })
  };

  // Handle sign out
  const signout = () => {
    console.log('Sign Out Called:');
    console.log(user);
    console.log(getJWT());
    return axiosapi.get('/logout', { 
      headers: { 'Authorization': `bearer ${getJWT()}`}
    })
    .then(function () {
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('jwt');
      setUser(null)
    })
    .catch(function(error) {
      console.log(error);
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('jwt');
      setUser(null)
    })
  };

  // Handle signing up
  const signup = async (user) => {
    if(user.accountType == 'flatee'){
      const userParam = {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        role: user.accountType.toLowerCase(),
        preferredArea: user.preferredArea,
        checklist: user.checklist,
      };
      console.log('reachced here');
      await axiosapi.post('/users/register', {
        ...userParam
      }).then(function (response) {
        if(Config.Logging){
          console.log(response)
        }

        return response;
    })
    .catch(function (error) {
        if(Config.Logging)
            console.log(error)
        return error;
    });
    } else if(user.accountType == 'flat'){
      const userParam = {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        role: user.accountType.toLowerCase(),
        address: user.address,
        description: user.description,
        existingFlatmates: user.existingFlatmates,
      };
      console.log('reachced here');
      await axiosapi.post('/users/register', {
        ...userParam
      }).then(function (response) {
        if(Config.Logging){
          console.log(response)
        }
        return response;
    })
    .catch(function (error) {
        if(Config.Logging)
            console.log(error)
        return error;
    });
    }

    return signin(user.username, user.password, false);
  };
  
  return { user, jwt, isAuthed, signin, signout, signup };
};

export const Role = {
    Admin: 'admin',
    Flat: 'flat',
    Flatee: 'flatee'
};