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


const AccountInformation = (props) => {
    const classes = useStyles();
    const {error} = props;
    
    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>
                <Grid item xs = {12}>
                    <TextField 
                     id="outlined-basic" label="Username" variant="outlined" 
                     value = {props.newUser.username}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{username: e.target.value} }
                            ));
                     }}
                     fullWidth
                     InputProps={{
                        readOnly: true,
                    }}
                    helperText="Username cannot be changed."
                    />
                </Grid>

                <Grid item xs = {12}>
                    <TextField 
                     id="outlined-basic" label="Email" variant="outlined" 
                     error = {error.email? true: false}
                     helperText = {error.email? error.email:null}
                     value = {props.newUser.email}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{email: e.target.value} }
                            ));
                     }}
                     fullWidth
                    />
                </Grid>

    
            </Grid>

        </Paper>
    )
}

export default AccountInformation

