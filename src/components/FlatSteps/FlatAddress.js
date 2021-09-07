import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        <h6>Next, please provide you flat's address...</h6>
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

