import React, { useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';



let prices = [];

const populatePriceRange = () => {
    for(let k = 0; k<50; k++){
        prices[k] = 50*(k+1);
    }
}


const FlateeChecklist = (props) => {

    const [smoker, setSmoker] = useState(false);
    const [couple, setCouple] = useState(false);
    const [pet, setPet] = useState(false);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(3000);

    const {navigation} = props;
    populatePriceRange();
    
    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const findError = () => {
      const errorFound = {};
      const invalid = {};

      if((max - min) <= 0){
        errorFound.price = "The maximum value must be larger than the minimum."
        invalid.price = true;
      }
      
      return {errorFound, invalid};
    }

    const onSubmit = e => {
        e.preventDefault();
        const newError = findError();

        if(Object.keys(newError.errorFound).length > 0){
            //Found errors and set the errors to the useState
            setError(newError.errorFound);
            setInvalid(newError.invalid);
        }else{
            let checklist = {
                isCouple: couple,
                isSmoker: smoker,
                hasPet: pet,
                priceRange: {
                    min: min,
                    max: max,
                },
            }
            props.updateUser({['checklist']: checklist});
            navigation.go("flatee-review");
        }
    }

    useEffect(() => null, [props.user]);

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <Typography component="h4">Are you....</Typography>
                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox
                    name = "smoker"
                    color = "primary"
                    checked={smoker} 
                    onChange={() => {setSmoker(!smoker)}}
                    />}
                    label="A smoker"
                    labelPlacement = "end"
                />
                </FormGroup>

                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox 
                    name = "pet"
                    color = "primary"
                    checked={pet} 
                    onChange={() => {setPet(!pet)}}
                    />}
                    label="Having pet(s)"
                    labelPlacement = "end"
                />
                </FormGroup>

                <FormGroup component="fieldset">
                <FormControlLabel
                    control={<Checkbox 
                    name = "couple"
                    color = "primary"
                    checked={couple}
                    onChange={() => {setCouple(!couple)}}
                    />}
                    label="A couple"
                    labelPlacement = "end"
                />
                </FormGroup>

                <br />
                <Typography component="h4">Your price range (per week):</Typography>
                <br />
                <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">From</InputLabel>
                <Select
                native
                value={min}
                placeholder = "min"
                onChange={e => setMin(e.target.value)}
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
                value={max}
                placeholder = "max"
                onChange={e => setMax(e.target.value)}
                label="To"
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
                {error.price && <Alert severity = "error">{error.price}</Alert>}
                <br/>

                <div className = "display-button">

                <IconButton variant="contained"
                onClick = {() => navigation.go("flatee-area")}>
                    <ArrowBackIosIcon/>
                </IconButton>

                <IconButton variant="contained"
                disabled = {(min == 0 || max == 3000)? true : false}
                color = "primary"
                type = "submit">
                    <ArrowForwardIosIcon/>
                </IconButton>

                </div>
                
            </form>
        </div>
    )
}

export default FlateeChecklist;
