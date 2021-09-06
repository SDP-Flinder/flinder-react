import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const FlatAddress = (props) => {
    //Pass properties
    const {navigation} = props;
    const {address, existingFlatmates, description} = props.formData;

      //This useState is used to store data from the API
  const [repo, setRepo] = useState([]);

  //Fetch authorised data from the API with token
  const getRepo = async () => {

    const URL = 'http://localhost:4000/users/'
    const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzAzNzk4ODIsImV4cCI6MTYzMDk4NDY4Mn0.NVxePRJRI7TMIUGWvPLQUP6fERI8O5Jw-uAB3buXWvk';
    const AuthString = 'Bearer '.concat(USER_TOKEN); 
  
    //Using .get to retrieve data 
    await axios.get(URL, { headers: { Authorization: AuthString } })
    .then(response => {
      //Display for debugging
       console.log(response.data);
       //Store data in a local variable
       const myRepo = response.data;
       //Updata the state
       setRepo(myRepo);
    })
    .catch((error) => {
      //Display error
       console.log('error ' + error);
    });
  }

  //Set the data in the local state
  useEffect(()=>getRepo(), []);

  const onSubmit = e => {
      e.preventDefault();
      const newError = findError();
      console.log(newError.errorFound);
      console.log(newError.invalid);

      if(Object.keys(newError.errorFound).length > 0){
        //Found errors and set the errors to the useState
        setError(newError.errorFound);
        setInvalid(newError.invalid);
      } else {
        navigation.next();
        console.log(address);
        props.updateUser({['address']:address});
        props.updateUser({['existingFlatmates']: existingFlatmates});
        props.updateUser({['description']: description})
      }
    }

    //Find the user's invalid inputs
    const [error,setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const findError = () => {
      const errorFound = {};
      const invalid = {};

      if(address.street == ''){
        errorFound.street = "This field is required";
        invalid.street = true;
      }

      if(address.suburb == ''){
        errorFound.suburb = "Please select a suburb.";
        invalid.suburb = true;
      }

      if(address.city == ''){
        errorFound.city = "Please select a city";
        invalid.city = true;
      }

      if(address.country == ''){
        errorFound.country = "Please select a country.";
        invalid.country = true;
      }

      for(let k =0; k<repo.length; k++){
        if(repo[k].role == 'flat'){
          console.log(repo[k]);
          if(repo[k].address.street == address.street 
            && repo[k].address.suburb == address.suburb
            && repo[k].address.city == address.city){
              errorFound.street = "This address has already been used."
              invalid.street = true;
            }
        }
      }
      
      return {errorFound, invalid};
    }

    
    return (
        <form onSubmit = {onSubmit}>
        <h6>Next, please provide you flat's address...</h6>

        <div>
        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="Street number"
            name="address.street"
            value = {address.street}
            onChange = {props.setForm}
            autoComplete="off"
            error = {isInvalid.street}
        /> 
        <br/>
        <br/>
        {error.street && <div className = "error-message">{error.street}</div>}
        <br />

        <FormControl>
        <InputLabel
            error = {isInvalid.suburb}
        > Sububrb </InputLabel>
        <Select
          native
          disabled = {!address.street ? true : false}
          name = "address.suburb"
          value = {address.suburb}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'Auckland CBD'}>City Centre</option>
          <option value={'Eden Terrace'}>Eden Terrace</option>
          <option value={'Freemans Bay'}>Freemans Bay</option>
          <option value={'Grafton'}>Grafton</option>
          <option value={'Grey Lynn'}>Grey Lynn</option>
          <option value={'Kingsland'}>Kingsland</option>
          <option value={'Mt Eden'}>Mount Eden</option>
          <option value={'Parnell'}>Parnell</option>
          <option value={'Ponsonby'}>Ponsonby</option>
        </Select>
        </FormControl>
        {error.suburb ? 
        <div className = "error-message">{error.suburb}</div>
        : null }
        <FormControl error = {isInvalid.city}>
        <InputLabel > City </InputLabel>
        <Select
          native
          disabled = {!address.suburb ? true : false}
          name = "address.city"
          value = {address.city}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'Auckland'}>Auckland</option>
        </Select>
        </FormControl>
        {error.city ? 
        <div className = "error-message">{error.city}</div>
        : null }
        <FormControl>
        <InputLabel
              error = {isInvalid.country}
        > Country </InputLabel>
        <Select
          native
          disabled = {!address.city ? true : false}
          name = "address.country"
          value = {address.country}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'New Zealand'}>New Zealand</option>
        </Select>
        </FormControl>

        {error.country ? 
        <div className = "error-message">{error.country}</div>
        : <br/>}
        <br />
        </div>

          <TextField
            id="outlined-basic"
            variant="outlined"
            type = "number"
            label="Existing flatmate(s): "
            name="existingFlatmates"
            value = {existingFlatmates}
            onChange = {props.setForm}
            autoComplete="off"
        /> 
        <br />
        <br />
        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="Description"
            name="description"
            value = {description}
            onChange = {props.setForm}
            autoComplete="off"
            multiline
            rows={4}
        /> 

        <br />
        <br />
        <br />
        <br />
        <br />

        
        <Button variant="contained" className = "button"
          color = "secondary"
          disabled = {!address.street || !address.city || !address.suburb || !address.country || !description || !existingFlatmates ? true : false}
          type = "submit">
          Next
        </Button>
        <Button variant="contained" className = "button"
          onClick = {() => navigation.previous()}>
          Back
        </Button>
        </form>
    )
}

export default FlatAddress

