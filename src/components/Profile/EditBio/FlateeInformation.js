import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { FormControl } from '@mui/material';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { FormHelperText , MenuItem} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


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
                <Grid item xs = {12}>
                <Typography variant = "h6">Are you...</Typography>
                </Grid>
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
            </Grid>
            <br/>
            <br/>
        </Paper>
    )
}

export default FlateeInformation