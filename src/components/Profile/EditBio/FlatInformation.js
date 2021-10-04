import React from 'react'
import { Grid, Paper, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";


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

const FlatInformation = (props) => {
    const classes = useStyles();
    
    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>
                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Street" variant="outlined" 
                     value = {props.newUser.address.street}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            address: {
                                ...prevUser.address,
                                street: e.target.value
                            } }
                            ));
                     }}
                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Suburb" variant="outlined" 
                     value = {props.newUser.address.suburb}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            address: {
                                ...prevUser.address,
                                suburb: e.target.value
                            } }
                            ));
                     }}
                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="City" variant="outlined" 
                     value = {props.newUser.address.city}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            address: {
                                ...prevUser.address,
                                city: e.target.value
                            } }
                            ));
                     }}
                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Country" variant="outlined" 
                     value = {props.newUser.address.country}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </Grid>

                <Grid item xs = {12}>
                    <TextField 
                     id="outlined-basic" label="Existing flatmates" variant="outlined" 
                     type = "number"
                     value = {props.newUser.existingFlatmates}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{existingFlatmates: e.target.value} }
                            ));
                     }}
                    />
                </Grid>

                <Grid item xs = {12}>
                    <TextField 
                     id="outlined-basic" label="Flat description" variant="outlined" 
                     type = "text"
                     value = {props.newUser.description}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{description: e.target.value} }
                            ));
                     }}
                     autoComplete="off"
                     multiline
                     rows={4}
                    fullWidth
                    />
                </Grid>
                
            </Grid>

        </Paper>
    )
}

export default FlatInformation
