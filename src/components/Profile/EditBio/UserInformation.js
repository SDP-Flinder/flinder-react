import React, { useEffect } from 'react'
import { Grid, Paper, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from '@mui/material';
import DatePicker from 'react-date-picker';


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

const UserInformation = (props) => {
    const classes = useStyles();
    const [date, setDate] = React.useState(new Date());
    const [error, setError] = React.useState({});

    const checkError = () => {
        if(!props.newUser.firstName.match(/^[a-zA-Z]+$/)){
            error.firstName = true;
        } else if (props.newUser.firstName.match(/^[a-zA-Z]+$/)) {
            error.firstName = false;
        }

        if(!props.newUser.lastName.match(/^[a-zA-Z]+$/)){
            error.lastName = true;
        }
    }
    
    
    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>
                <Grid item xs = {6}>
                    <TextField 
                     error = {error.firstName? true: false}
                     id="outlined-basic" label="First name" variant="outlined" 
                     name = "user.firstName"
                     value = {props.newUser.firstName}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{firstName: e.target.value} }
                            ));
                     }}
                    helperText = {error.firstName && "Name should not have special characters."}
                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Last name" variant="outlined" 
                     error = {error.lastName? true: false}
                     value = {props.newUser.lastName}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{lastName: e.target.value} }
                            ));
                     }}
                    helperText = {error.lastName && "Name should not have special characters."}
                    />
                </Grid>

                <Grid item xs = {9}>
                    <InputLabel> D.O.B </InputLabel>
                    <DatePicker id = 'datePicker'
                    className = "calendar-display"
                    label = "D.O.B"
                    value = {date}
                    onChange = {setDate}
                    placeholder = "dob"
                    format = "dd/MM/yyyy"
                    />
                </Grid>
                
            </Grid>

        </Paper>
    )
}

export default UserInformation
