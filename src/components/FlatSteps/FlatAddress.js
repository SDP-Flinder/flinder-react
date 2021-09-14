import React from 'react'
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const FlatAddress = (props) => {
    //Pass properties
    const {navigation} = props;
    const {address, existingFlatmates, description} = props.formData;

  const onSubmit = e => {
      e.preventDefault();
        navigation.next();
        console.log(address);
        props.updateUser({['address']:address});
        props.updateUser({['existingFlatmates']: existingFlatmates});
        props.updateUser({['description']: description})
        console.log(props.user);
    }

    
    return (
        <form onSubmit = {onSubmit}>
        <br />
        <h6>Next, please provide you flat's details...</h6>
         <TextField
            id="outlined-basic"
            variant="outlined"
            type = "number"
            label="Existing flatmate(s): "
            placeholder = "Number of flatmates"
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
            placeholder = "Brief description"
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

        <div className = "display-button">
        <IconButton variant="contained" className = "button"
          onClick = {() => navigation.previous()}>
          <ArrowBackIosIcon/>
        </IconButton>
        <IconButton variant="contained" className = "button"
          name = "next"
          color = "secondary"
          disabled = {!address.street || !address.city || !address.suburb || !address.country || !description || !existingFlatmates ? true : false}
          type = "submit">
          <ArrowForwardIosIcon/>
        </IconButton>
        </div>
        </form>
    )
}

export default FlatAddress
