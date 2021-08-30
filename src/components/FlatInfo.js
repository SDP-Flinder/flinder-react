import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-date-picker';
import InputLabel from '@material-ui/core/InputLabel';

const FlatInfo = (props) => {
    //Pass the navigation from the parent
    const {navigation} = props;
    //Deconstruct the form details
    const {firstName, lastName} = props.formData;
    
    const [dob, setDOB] = useState(new Date());
    //Declare errors
    const [error, setError] = useState({});
    const findError = () => {
      const errorFound = {};

      if(!firstName.match(/^[a-zA-Z]+$/)){
        errorFound.firstName = "First name should contain letters only.";
      }

      if(!lastName.match(/^[a-zA-Z]+$/)){
        errorFound.lastName = "Last name should contain letters only.";
      }

      if(dob.getFullYear() < 1921){
        errorFound.dob = "Too old";
      } else if (dob.getFullYear() > 2007){
        errorFound.dob = "This app is for 15+";
      }
      
      return errorFound;
    }

    const onSubmit = e => {
        e.preventDefault();
        //Check if all the inputs are valid
        const newError = findError();
        console.log(newError);

        //Proceed to the next step if inputs are valid
        if(Object.keys(newError).length > 0){
          //Found errors and set the errors to the useState
          setError(newError);
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
            <h1>This is flat info page</h1>

        <TextField
            id="outlined-basic"
            variant="outlined"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={props.setForm}
            placeholder = "Enter your first name...."
            margin="normal"
            variant="standard"
            autoComplete="off"
        /> 
        <br />
        {error.firstName && <div style = {{color: "red"}}>{error.firstName}</div>}

        <TextField
            id="outlined-basic"
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={props.setForm}
            placeholder = "Enter your last name...."
            margin="normal"
            variant="standard"
            autoComplete="off"
        />
        <br />
        {error.lastName && <div style = {{color: "red"}}>{error.lastName}</div>}

        <InputLabel> D.O.B </InputLabel>
        <DatePicker
        label = "D.O.B"
        onChange={setDOB}
        value={dob}
        dateFormat = "YYYY-MM-DDTHH:mm:ss.sssZ"
        />
        {error.dob && <div style = {{color: "red"}}>{error.dob}</div>}

        <br />
        <br />


        <Button variant="contained"
        onClick = {() => props.history.push('/')}>Back</Button>
        <Button variant="contained"
        color = "secondary" 
        type="submit">Next</Button>
        </form>
    )
}

 export default withRouter(FlatInfo);


