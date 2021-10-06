import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { FormHelperText } from '@material-ui/core';


let prices = [];

const populatePriceRange = () => {
    for(let k = 0; k<50; k++){
        prices[k] = 50*(k+1);
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary,
    }
}));

const FlateeInformation = (props) => {
    const classes = useStyles();
    const {error} = props;
    populatePriceRange();
    
    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>
                <Typography variant = "h6">Are you...</Typography>
                <Grid item xs = {12}>
                    <FormGroup component="fieldset">
                    <FormControlLabel
                        control={<Checkbox
                        name = "smoker"
                        color = "primary"
                        checked={props.newUser.checklist.isSmoker} 
                        onChange = {e => {
                                props.setUser((prevUser) => ({ 
                                    ...prevUser, 
                                    checklist: {
                                        ...prevUser.checklist,
                                        isSmoker: !props.newUser.checklist.isSmoker,
                                    }}
                                    ));
                         }}
                        />}
                        label="A smoker"
                        labelPlacement = "end"
                    />
                    </FormGroup>
                </Grid>

                <Grid item xs = {12}>
                    <FormGroup component="fieldset">
                    <FormControlLabel
                        control={<Checkbox
                        name = "smoker"
                        color = "primary"
                        checked={props.newUser.checklist.isCouple} 
                        onChange = {e => {
                                props.setUser((prevUser) => ({ 
                                    ...prevUser, 
                                    checklist: {
                                        ...prevUser.checklist,
                                        isCouple: !props.newUser.checklist.isCouple,
                                    }}
                                    ));
                         }}
                        />}
                        label="A Couple"
                        labelPlacement = "end"
                    />
                    </FormGroup>
                </Grid>

                <Grid item xs = {12}>
                    <FormGroup 
                    component="fieldset"
                    >
                    <FormControlLabel
                        control={<Checkbox
                        name = "smoker"
                        color = "primary"
                        checked={props.newUser.checklist.hasPet} 
                        onChange = {e => {
                                props.setUser((prevUser) => ({ 
                                    ...prevUser, 
                                    checklist: {
                                        ...prevUser.checklist,
                                        hasPet: !props.newUser.checklist.hasPet,
                                    }}
                                    ));
                         }}
                        />}
                        label="Having Pets"
                        labelPlacement = "end"
                    />
                    </FormGroup>
                </Grid>

                <Grid item xs = {12} direction = "row">
                        <Grid item xs = {12}>
                        <Typography variant = "h6">
                            Price Range
                        </Typography>
                        </Grid>

                        <Grid item>
                        <FormControl 
                        variant="outlined"
                        error = {error.price?true:false}
                        >
                        <InputLabel htmlFor="outlined-age-native-simple"
                        error = {error.price?true:false}
                        >From</InputLabel>
                        <Select
                        native
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        value={props.newUser.checklist.priceRange.min}
                        placeholder = "min"
                        onChange={e => {
                            props.setUser((prevUser) => ({ 
                                ...prevUser, 
                                checklist: {
                                    ...prevUser.checklist,
                                    priceRange: {
                                        ...prevUser.checklist.priceRange,
                                        min: e.target.value,
                                    }
                                }}
                                ));
                        }}
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
                    
                        <FormControl variant="outlined"
                            error = {error.price?true:false}
                        >
                            <InputLabel 
                            htmlFor="outlined-age-native-simple"
                            error = {error.price?true:false}
                            >To</InputLabel>
                            <Select
                            native
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            value={props.newUser.checklist.priceRange.max}
                            placeholder = "max"
                            onChange={e => {
                                props.setUser((prevUser) => ({ 
                                    ...prevUser, 
                                    checklist: {
                                        ...prevUser.checklist,
                                        priceRange: {
                                            ...prevUser.checklist.priceRange,
                                            max: e.target.value,
                                        }
                                    }}
                                    ));
                            }}
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
                            </Grid>
                            <FormHelperText styles = {{color:"red"}}>
                                {error.price?error.price:null}
                            </FormHelperText>
                </Grid>

                
            </Grid>

        </Paper>
    )
}

export default FlateeInformation
