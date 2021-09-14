import React from 'react'
import { withRouter } from 'react-router'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-date-picker';
import InputLabel from '@material-ui/core/InputLabel';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

const FlateeInfo = (props) => {
    //Pass the navigation from the parent
    const {navigation} = props;
    //Deconstruct the form details
    const {firstName, lastName} = props.formData;
    
    const [dob, setDOB] = useState(props.user.dob ? props.user.dob : new Date());
    //Declare errors
    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const findError = checkError(firstName, lastName, dob)

    const onSubmit = e => {
        e.preventDefault();
        console.log(typeof props.user.preferredSuburb);
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
          navigation.next();
          //Update the user details
          props.updateUser({['firstName']:firstName});
          props.updateUser({['lastName']:lastName});
          props.updateUser({['dob']: dob});
        }
    }

    return (
        <form
        onSubmit={onSubmit}>
        <h6>First, tell us a little bit about you...</h6>

        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={props.setForm}
            placeholder = "Enter your first name...."
            autoComplete="off"
            error = {isInvalid.firstName}
        /> 
        <br/>
        <br/>
        {error.firstName && <div className = "error-message">{error.firstName}</div>}
        <br/>

        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={props.setForm}
            placeholder = "Enter your last name...."
            autoComplete="off"
            error = {isInvalid.lastName}
        />
        <br />
        <br />
        {error.lastName && <div className = "error-message">{error.lastName}</div>}
        <br/>
        <InputLabel
            error = {isInvalid.dob}
        > D.O.B </InputLabel>
        <DatePicker
        label = "D.O.B"
        onChange={setDOB}
        value={dob}
        dateFormat = "YYYY-MM-DDTHH:mm:ss.sssZ"
        />
        <br />
        {error.dob && <div className = "error-message">{error.dob}</div>}
        <br />

        <div className = "display-button">
        <IconButton className = "button" variant="contained"
        onClick = {() => props.history.push('/sign-up/')}>
          <ArrowBackIosIcon/>
        </IconButton>
        <IconButton className = "button" 
         variant="contained"
        color = "secondary" 
        disabled = {!firstName || !lastName ?true:false}
        type="submit">
          <ArrowForwardIosIcon/>
        </IconButton>
        </div>
        </form>
    )
}

 export default withRouter(FlateeInfo);


function checkError(firstName, lastName, dob) {
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

