import React from 'react'
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import InputLabel from '@material-ui/core/InputLabel';

const FlatAddress = (props) => {
    //Pass properties
    const {navigation} = props;

    const setForm = (field, value) => {
      props.updateUser({[field]: value});
    }

  const onSubmit = e => {
      e.preventDefault();
        navigation.go("flat-checklist");
    }

    
    return (
        <form onSubmit = {onSubmit}>
      
        <Typography component="h3">Next, please provide you flat&apos;s details...</Typography>

        <br/>
         <TextField
            id="outlined-basic"
            variant="outlined"
            type = "number"
            label="Existing flatmate(s): "
            placeholder = "Number of flatmates"
            name="props.user.existingFlatmates"
            value = {props.user.existingFlatmates}
            onChange = {e => setForm('existingFlatmates', e.target.value)}
            autoComplete="off"
        /> 
        <br />
        <br />
        <TextField className = "input"
            id="outlined-basic"
            variant="outlined"
            label="Description"
            name="props.user.description"
            placeholder = "Brief description"
            value = {props.user.description}
            onChange = {e => setForm('description', e.target.value)}
            autoComplete="off"
            multiline
            rows={4}
        /> 
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <InputLabel> Lease Expiration Date </InputLabel>
        <DatePicker id = 'datePicker'
        className = "calendar-display"
        label = "Lease Date"
        placeholder = "leaseDate"
        onChange={e => setForm('leaseDate', e)}
        value={props.user.leaseDate}
        format = "dd/MM/yyyy"
        />
        <br />
        <br />

        <div className = "display-button">
        <IconButton variant="contained"
          onClick = {() => navigation.go("flat-address")}>
          <ArrowBackIosIcon/>
        </IconButton>
        <IconButton variant="contained"
          name = "next"
          color = "primary"
          disabled = {!props.user.description || !props.user.existingFlatmates || !props.user.leaseDate ? true : false}
          type = "submit">
          <ArrowForwardIosIcon/>
        </IconButton>
        </div>
        </form>
    )
}

export default FlatAddress

