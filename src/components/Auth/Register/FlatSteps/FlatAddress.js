import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';

const FlatAddress = (props) => {
    //Pass properties
    const {navigation} = props;

    const [smoking, setSmoking] = useState(props.user.flatRules.smoking || false);
    const [pets, setPets] = useState(props.user.flatRules.pets || false);

    const setForm = (field, value) => {
      props.updateUser({[field]: value});
    }

  const onSubmit = e => {
        e.preventDefault();
        //Check if all the inputs are valid
        const newError = findErrors();

        //Proceed to the next step if inputs are valid
        if(Object.keys(newError).length > 0){
          //Found errors and set the errors to the useState
          setError(newError);

        }else{
            navigation.go("flat-checklist");
        }
      e.preventDefault();
      setForm('flatRules', { smoking: smoking, pets: pets })
        navigation.go("flat-checklist");
    }

  //Catch any errors
  const [error, setError] = useState({});
  const findErrors = () => {

    const errorFound = {};

    if(props.user.existingFlatmates < 0){
      errorFound.existingFlatmates = 'Please enter a number larger than 0';
    }

    return errorFound;
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
        {error.existingFlatmates && <Alert severity = "error">{error.existingFlatmates}</Alert>}
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
        minDate={new Date()}
        onChange={e => setForm('leaseDate', e)}
        value={props.user.leaseDate}
        format = "dd/MM/yyyy"
        />
        <br />
        <br />

        <Typography component="h4">Flat Rules</Typography>
        <Typography component="h4">Do you allow....</Typography>
                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox
                    name = "smoking"
                    color = "primary"
                    checked={smoking} 
                    onChange={() => {setSmoking(!smoking)}}
                    />}
                    label="Smokers"
                    labelPlacement = "end"
                />
                </FormGroup>

                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox 
                    name = "pets"
                    color = "primary"
                    checked={pets} 
                    onChange={() => {setPets(!pets)}}
                    />}
                    label="Pets"
                    labelPlacement = "end"
                />
                </FormGroup>

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

