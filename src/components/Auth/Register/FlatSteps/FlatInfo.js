import React from 'react'
import { withRouter } from 'react-router'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import InputLabel from '@material-ui/core/InputLabel';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


//Styling the react calendar
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { injectGlobal } from "@emotion/css";

injectGlobal`
  .react-calendar {
    height: auto;
  },
  .react-calendar__navigation{
    height: 30px;
    margin-bottom: 0;
  }
  .react-calendar__year-view .react-calendar__tile, 
  .react-calendar__decade-view .react-calendar__tile, .react-calendar__century-view .react-calendar__tile{
    padding: 1em 0.5em;
  }
  .react-date-picker__calendar{
    position: absolute;
    height: 143px
  }
`;


const FlatInfo = (props) => {
    //Pass the navigation from the parent
    const {navigation} = props;
    //Deconstruct the form details
    const setForm = (field, value) => {
      props.updateUser({[field]: value});
    }
    
    const [dob, setDOB] = useState(props.user.dob ? props.user.dob : new Date());

    //Declare errors
    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const findError = findNewError(props.user.firstName, props.user.lastName, dob)

    const onSubmit = e => {
        e.preventDefault();
        //Check if all the inputs are valid
        const newError = findError();
        console.log(newError.errorFound);
        console.log(newError.invalid);

        //Proceed to the next step if inputs are valid
        if(Object.keys(newError.errorFound).length > 0){
          //Found errors and set the errors to the useState
          setError(newError.errorFound);
          setInvalid(newError.invalid);
          console.log(isInvalid);
        }else{
          if(props.user.accountType == 'flat'){
            navigation.go("flat-address");
          }else{
            navigation.go("flatee-area");
          }
          //Update the user details
          props.updateUser({['dob']: dob});
        }
    }

    return (
        <form
        onSubmit={onSubmit}>
        <Typography component="h3">
        First, tell us a little bit about you...
       </Typography>
        <br/>
        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="First Name"
            name="props.user.firstName"
            value={props.user.firstName}
            onChange={e => setForm('firstName', e.target.value)}
            placeholder = "Enter your first name...."
            autoComplete="off"
            error = {isInvalid.firstName}
        /> 
        <br/>
        <br/>
        <br/>

        {error.firstName && <Alert severity = "error">{error.firstName}</Alert>}
        <br/>

        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="Last Name"
            name="props.user.lastName"
            value={props.user.lastName}
            onChange={e => setForm('lastName', e.target.value)}
            placeholder = "Enter your last name...."
            autoComplete="off"
            error = {isInvalid.lastName}
        />
        <br />
        <br />
        <br />

        {error.lastName && <Alert severity = "error">{error.lastName}</Alert>}
        <br/>
        <InputLabel
            error = {isInvalid.dob}
        > D.O.B </InputLabel>
        <DatePicker id = 'datePicker'
        className = "calendar-display"
        label = "D.O.B"
        placeholder = "dob"
        onChange={setDOB}
        value={dob}
        format = "dd/MM/yyyy"
        />
        <br />
        <br />

        {error.dob && <Alert severity = "error">{error.dob}</Alert>}
        <br />

        <div className = "display-button">
        <IconButton className = "button" variant="contained"
        onClick = {() => props.navigation.go("username")}>
          <ArrowBackIosIcon/>
        </IconButton>
        <IconButton className = "button" 
         variant="contained"
        color = "primary" 
        disabled = {!props.user.firstName || !props.user.lastName ?true:false}
        type="submit">
          <ArrowForwardIosIcon/>
        </IconButton>


        </div>
        </form>
    )
}

export default withRouter(FlatInfo);

function findNewError(firstName, lastName, dob) {
  return () => {
    const errorFound = {};
    const invalid = {};

    if (!firstName.match(/^[a-zA-Z]+$/)) {
      errorFound.firstName = "First name should contain letters only.";
      invalid.firstName = true;
    }

    if (!lastName.match(/^[a-zA-Z]+$/)) {
      errorFound.lastName = "Last name should contain letters only.";
      invalid.lastName = true;
    }

    if (dob.getFullYear() < 1921) {
      errorFound.dob = "Too old";
      invalid.dob = true;
    } else if (dob.getFullYear() > 2007) {
      errorFound.dob = "This app is for 15+";
      invalid.dob = true;
    }

    return { errorFound, invalid };
  };
}

