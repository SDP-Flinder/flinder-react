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
import { useEffect } from 'react';
import { Redirect } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

export default function SignUp ({ location }) {
  const { signup, isAuthed } = useAuth();

  const [user, setUser] = useState({
    username: '', 
    password: '',
    email: '',
    accountType: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: {
      street: '',
      suburb: '',
      city: '',
      country: '',
    },
    existingFlatmates: '',
    description: '',
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

  const {step, navigation} = useStep({
    steps,
    initialStep: 0,
  });

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignUp = (e) => {
      setOpen(true);
      const newUser = user;
      console.log(newUser);
      e.preventDefault();
      signup(newUser).then((res) => {
        console.log(res?.message)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const prop = {navigation};

  const [open, setOpen] = React.useState(false);

  const redirectToMain = () => {
    //Redirect to the main page
      handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className = "layout">
        {/* THIS DOES NOT WORK: {isAuthed && <Redirect to={from} />} */}
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

// {step.id == "flatee-review" &&  <Button className = "single-button"
// variant="contained" color="primary"
// >Complete</Button>}

