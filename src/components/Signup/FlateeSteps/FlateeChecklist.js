import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useState } from 'react';



let prices = [];

const populatePriceRange = () => {
    for(let k = 0; k<50; k++){
        prices[k] = 50*(k+1);
    }
}

const FlateeChecklist = (props) => {
    const {checklist} = props.formData;
    const {navigation} = props;
    populatePriceRange();
    
    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const findError = () => {
      const errorFound = {};
      const invalid = {};

      if((checklist.priceRange.max - checklist.priceRange.min) <= 0){
        console.log(checklist.priceRange.min);
        console.log(checklist.priceRange.max);
        errorFound.price = "The maximum value must be larger than the minimum."
        invalid.price = true;
      }
      
      return {errorFound, invalid};
    }

    const onSubmit = e => {
        e.preventDefault();
        const newError = findError();
        console.log(error);

        if(Object.keys(newError.errorFound).length > 0){
            //Found errors and set the errors to the useState
            setError(newError.errorFound);
            setInvalid(newError.invalid);
            console.log(isInvalid);
        }else{
            console.log(props.formData.checklist);
            props.updateUser({['checklist']: checklist});
            navigation.next();
        }
    }

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <h6>Are you....</h6>
                
                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox
                    name = "checklist.isSmoker"
                    checked={checklist.isSmoker} onChange={props.setForm}/>}
                    label="A smoker"
                    labelPlacement = "end"
                />
                </FormGroup>

                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox 
                    name = "checklist.hasPet"
                    checked={checklist.hasPet} onChange={props.setForm}/>}
                    label="Having pet(s)"
                    labelPlacement = "end"
                />
                </FormGroup>

                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox 
                    name = "checklist.isCouple"
                    checked={checklist.isCouple} onChange={props.setForm}/>}
                    label="A couple"
                    labelPlacement = "end"
                />
                </FormGroup>

                <br />
                <h6>Your price range (per week):</h6>
                <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">From</InputLabel>
                <Select
                native
                value={checklist.priceRange.min}
                onChange={props.setForm}
                label="From"
                inputProps={{
                    name: 'checklist.priceRange.min',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                {prices.map((price) => (
                    <option key = {price} value = {price}> {price} </option>
                ))}

                </Select>
                </FormControl>

                <FormControl variant="outlined" error = {isInvalid.price}>
                <InputLabel htmlFor="outlined-age-native-simple">To</InputLabel>
                <Select
                native
                value={checklist.priceRange.max}
                onChange={props.setForm}
                label="From"
                inputProps={{
                    name: 'checklist.priceRange.max',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                {prices.map((price) => (
                    <option key = {price} value = {price}> {price} </option>
                ))}

                </Select>
                </FormControl>
                <br />
                {error.price && <div className = "error-message">{error.price}</div>}
                <br/>
                <Button variant="contained" className = "button"
                disabled = {(checklist.priceRange.min == 0 || checklist.priceRange.max == 3000)? true : false}
                color = "secondary"
                type = "submit">
                Next
                </Button>

                <Button variant="contained" className = "button"
                onClick = {() => navigation.previous()}>
                Back
                </Button>
                
            </form>
        </div>
    )
}

export default FlateeChecklist;
