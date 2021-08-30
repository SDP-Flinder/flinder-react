import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';


const FlatAddress = (props) => {
    //Pass properties
    const {navigation} = props;
    const {address} = props.formData;

    const onSubmit = e => {
      e.preventDefault();
      const newError = findError();
      console.log(newError);

      if(Object.keys(newError).length > 0){
        //Found errors and set the errors to the useState
        setError(newError);
      } else {
        navigation.next();
        console.log(address);
        props.updateUser({['address']:address});
      }
    }

    //Find the user's invalid inputs
    const [error,setError] = useState({});
    const findError = () => {
      const errorFound = {};

      if(address.street == ''){
        errorFound.street = "This field is required";
      }

      if(address.suburb == ''){
        errorFound.suburb = "Please select a suburb.";
      }

      if(address.city == ''){
        errorFound.city = "Please select a city";
      }

      if(address.country == ''){
        errorFound.country = "Please select a country.";
      }
      
      return errorFound;
    }

    
    return (
        <form onSubmit = {onSubmit}>
        <h1>This is flat address page</h1>

        <TextField
            id="outlined-basic"
            variant="outlined"
            label="Street number"
            name="address.street"
            value = {address.street}
            onChange = {props.setForm}
            margin="normal"
            variant="standard"
            autoComplete="off"
            fullWidth
        /> 
        {error.street && <div style = {{color: "red"}}>{error.street}</div>}
        <br />
        <FormControl 
        fullWidth>
        <InputLabel> Sububrb </InputLabel>
        <Select
          native
          name = "address.suburb"
          value = {address.suburb}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'Auckland CBD'}>City Centre</option>
          <option value={'Eden Terrace'}>Eden Terrace</option>
          <option value={'Freemans Bay'}>Freemans Bay</option>
          <option value={'Grafton'}>Grafton</option>
          <option value={'Grey Lynn'}>City Centre</option>
          <option value={'Kingsland'}>Kingsland</option>
          <option value={'Mt Eden'}>Mount Eden</option>
          <option value={'Parnell'}>Parnell</option>
          <option value={'Ponsonby'}>Ponsonby</option>
        </Select>
        </FormControl>
        {error.suburb ? 
        <div style = {{color: "red"}}>{error.suburb}</div>
        : <br/>}

        <br />

        <FormControl variant="filled" >
        <InputLabel> City </InputLabel>
        <Select
          native
          name = "address.city"
          value = {address.city}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'Auckland'}>Auckland</option>
        </Select>
        </FormControl>
        {error.city ? 
        <div style = {{color: "red"}}>{error.city}</div>
        : <br/>}

        <br />
        <FormControl variant="filled" >
        <InputLabel> Country </InputLabel>
        <Select
          native
          name = "address.country"
          value = {address.country}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'New Zealand'}>New Zealand</option>
        </Select>
        </FormControl>

        {error.country ? 
        <div style = {{color: "red"}}>{error.country}</div>
        : <br/>}
        
        <br />
        <br />
        <Button variant="contained"
          onClick = {() => navigation.previous()}>
          Back
        </Button>
        <Button variant="contained"
          color = "secondary"
          type = "submit">
          Next
        </Button>
        </form>
    )
}

export default FlatAddress

