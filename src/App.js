import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstStep from './components/FirstStep';
// import FlinderHeader from './components/FlinderHeader';
import Flatee from './components/Flatee';
import Flat from './components/Flat';
import Confirmation from './components/Confirmation';
import { useState } from 'react';
import './styles.css';
import {ReactComponent as FlinderLogo} from './components/assets/logo.svg';
import WelcomePage from './components/WelcomePage';
import Navigationbar from './components/NavBar/NavigationBar';
import Home from './components/NavBar/Home';
import Profile from './components/NavBar/Profile';



//This contains all the routes to the '/signup/'
const App = () => {
  //Best place to store data entered by user is here
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    accountType: '',
    loggedIn: false,
  });

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  // const resetUser = () => {
  //   setUser({});
  // };

  return(
  <BrowserRouter>
    <div>
      <Navigationbar user = {user} resetUser = {resetUser}/>
      <Switch>
        <Route   
          render={(props) => (
            <div className = "layout">
            <FlinderLogo className = "logo-display"/>
            <WelcomePage {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/" 
         exact={true}/>

        <Route   
          render={(props) => (
            <div className = "layout">
            <FlinderLogo className = "logo-display"/>
            <FirstStep {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/sign-up/" 
         exact={true}/>

        <Route   
          render={(props) => (
            <div className = "layout">
            <FlinderLogo className = "logo-display"/>
            <Flat {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/sign-up/flat" 
         exact={true}/>
         
         <Route   
          render={(props) => (
            <div className = "layout">
            <FlinderLogo className = "logo-display"/>
            <Flatee {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/sign-up/flatee" 
         exact={true}/>

        <Route   
          render={(props) => (
            <div className = "layout">
            <FlinderLogo className = "logo-display"/>
            <Confirmation {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/sign-up/complete" 
         exact={true}/>

        <Route   
          render={(props) => (
            <div>
            <Home {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/home" 
         exact={true}/>

        <Route   
          render={(props) => (
            <div>
            <Profile {...props} user={user} updateUser={updateUser} />
            </div>
          )}
         path="/profile" 
         exact={true}/>
         
      </Switch>
    </div>
  </BrowserRouter>
  )
};

export default App;