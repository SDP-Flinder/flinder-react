import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
   * {role, firstname, lastname, username, createdDate, id}
   */
  const jwt = getJWT();
  const [user, setUser] = useState(null);
  // const isAuthed = user?.id ? true : false;
  const isAuthed = (user && jwt && jwtDecode(jwt).exp * 1000 > Date.now()) ? true : false;

  // Get current user data, if they are logged in
  useEffect(() => {
    const getUser = async () => {
      await axiosapi.get('/users/current', { 
        headers: { 'Authorization': `bearer ${getJWT()}`}
      })
      .then((response) => {
        setUser({
          firstName: response.data.firstName, 
          lastName: response.data.lastName,
          role: response.data.role,
          id: response.data.id,
          username: response.data.username
        })
        
      })
      .catch(function (error) {
          if(Config.Logging) 
            console.log(error)
          setUser(null)
      })
    }

    console.log(jwt);
    // If JWT is stored then load user
    if (jwt != null) {getUser()}
    console.log(`User object: ${user}`);
    console.log(`Is authed: ${isAuthed}`);

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
          console.log(`Sign in Response: ${response}`);
        // Hey Hacker! This is great for XSS isn't it?
        if (remember) { // Local storage, Remember the user after they close the browser
          localStorage.setItem('jwt', response.data?.token);
          setUser(response.data);
        } else { // Session storage, Don't remember the user after they close the browser
          sessionStorage.setItem('jwt', response.data?.token);
          setUser(response.data);
        }
        return response;
    })
    .catch(function (error) {
        if(Config.Logging)
            console.log(`Sign in Error: ${error}`);
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
  const signup = async(data) => {
    return await axiosapi.put('/users/register', 
      data.json()
    )
    .then(function (response) {
        if(Config.Logging) 
          console.log(response)
        // Hey Hacker! This is great for XSS isn't it?
        // if (remember) { // Local storage, Remember the user after they close the browser
        //   localStorage.setItem('jwt', response.data?.token);
        //   setUser(response.data);
        // } else { // Session storage, Don't remember the user after they close the browser
          sessionStorage.setItem('jwt', response.data?.token);
          setUser(response.data);
          
        // }
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

  return { user, isAuthed, signin, signout, signup, jwt };
};

export const Role = {
    Admin: 'admin',
    Flat: 'flat',
    Flatee: 'flatee'
};
