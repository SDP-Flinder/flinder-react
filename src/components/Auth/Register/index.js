import React from 'react'
import {useState} from 'react';
import { useStep } from "react-hooks-helper";
import FirstStep from './FirstStep';
import FlatInfo from './FlatSteps/FlatInfo';
import Address from './FlatSteps/Address';
import FlatAddress from './FlatSteps/FlatAddress';
import FlatChecklist from './FlatSteps/FlatChecklist';
import FlateePreferredAreas from './FlateeSteps/FlateePreferredAreas';
import FlateeChecklist from './FlateeSteps/FlateeChecklist';
import FlateeReview from './FlateeSteps/FlateeReview';
import '../../../style/global.css';
import { Button } from '@material-ui/core';
import {ReactComponent as FlinderLogo} from '../../../assets/logo.svg';
import { useAuth } from "../../App/Authentication";
import { Redirect } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


//This is the steps of the form
const steps = [
  {id: "username"},
  {id: "flat-information"},
  {id: "flat-address"},
  {id: "flat-description"},
  {id: "flat-checklist"},
  {id: "flatee-information"},
  {id: "flatee-area"},
  {id: "flatee-checklist"},
  {id: "flatee-review"},
]


//Render the current step
const renderStep = (step, prop, user, updateUser) => {
  switch(step.id){
    case "username":
        return <FirstStep className = "layout" {...prop} user = {user} updateUser = {updateUser}/>;
    case "flat-information":
        return <FlatInfo {...prop} user = {user} updateUser = {updateUser}/>;
    case "flat-address":
        return <Address {...prop} user = {user} updateUser = {updateUser}/>;
    case "flat-description":
        return <FlatAddress {...prop} user = {user} updateUser = {updateUser}/>;
    case "flat-checklist":
        return <FlatChecklist {...prop} user = {user} updateUser = {updateUser}/>;
    case "flatee-area":
        return <FlateePreferredAreas {...prop} user = {user} updateUser = {updateUser}/>;
    case "flatee-checklist":
          return <FlateeChecklist {...prop} user = {user} updateUser = {updateUser}/>;
    case "flatee-review":
          return <FlateeReview {...prop} user = {user} updateUser = {updateUser}/>;
    
  }
}


//The main component
export default function SignUp ({ location }) {

  //Retrive the signup for posting data to the API
  const { signup, isAuthed } = useAuth();


  //Store the user information
  const [user, setUser] = useState({
    username: '', 
    password: '',
    email: '',
    accountType: '',
    firstName: '',
    lastName: '',
    dob: '',

    //This part is for user type flat
    address: {
      street: '',
      suburb: '',
      city: '',
      country: '',
    },
    existingFlatmates: '',
    description: '',

    //This part is for user type flatee
    preferredArea:{
        city: '',
        suburb: [],
    },
    checklist: {
        isCouple: false,
        isSmoker: false,
        hasPet: false,
        priceRange: {
            min: 0,
            max: 3000,
        },
    },
  });

  //This is to navigate through different steps
  const {step, navigation} = useStep({
    steps,
    initialStep: 0,   //The initial step will render the FirstStep component
  });

  //Update the user once they fill in their information
  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  //This is to redirect the user to their home page upon completion
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignUp = (e) => {
      e.preventDefault();
      setOpen(true);
  }

  const prop = {navigation};

  //This is to open the confimation dialog page
  const [open, setOpen] = React.useState(false);

  const redirectToMain = () => {
    //Redirect to the main page
      handleClose();
    //Submit the form
      const newUser = user;
      signup(newUser).then((res) => {
        console.log('User has been added to the server');
        console.log(res?.message)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className = "layout">
        {isAuthed && <Redirect to={from} />}
        <FlinderLogo className = "logo-display"/>
       {renderStep(step, prop, user, updateUser)}
       {(step.id == "flatee-review" || step.id == "flat-checklist") && 
        <div>
        <Button className = "single-button"
        variant="contained" color="primary" onClick = {handleSignUp}
        >Complete</Button>
        <Dialog
        open={open}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account has been created. You are officially a member of Flinder now.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={redirectToMain} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
        </Dialog>
        </div>
        }
    </div>
  )
}

