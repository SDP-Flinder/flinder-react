import React, { createContext, useContext, useEffect, useState } from "react";

// Create Authentication Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Auth Prodiver
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Business Logic
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const isAuthed = user?.id ? true : false;

  // Fetch User's Profile Data
  useEffect(() => {
    fetch("/users/current", {
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => (res?.id ? setUser(res) : setUser(null)));
    return () => {
      setUser(null);
    };
  }, []);

  // Handle signing in
  const signin = (username, password) => {
    return fetch("/users/authenticate", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res?.error && !res?.message) {
          return setUser(res);
        }
        return res;
      })
      .catch((error) => error);
  };

  // Handle sign out
  const signout = () => {
    return fetch("/users/revoke", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then(() => setUser(null))
      .catch((error) => error);
  };

  // Handle signing up
  const signup = (firstname, lastname, email, password) => {
    return fetch("/users/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res?.error && !res?.message) {
          return setUser(res);
        }
        return res;
      })
      .catch((error) => error);
  };

  return { user, isAuthed, signin, signup, signout };
};

export const Role = {
    Admin: 'admin',
    Flat: 'flat',
    Flatee: 'flatee'
};