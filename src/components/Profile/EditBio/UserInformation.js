import React from 'react'
import { Grid, Paper, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from '@mui/material';
import DatePicker from 'react-date-picker';
import moment from "moment";

//Styling the react calendar
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { injectGlobal } from "@emotion/css";

injectGlobal`
  .react-calendar {
    height: auto;
  },
  .react-calendar__navigation{
    height: 30px;
    margin-bottom: 0;
  }
  .react-calendar__year-view .react-calendar__tile, 
  .react-calendar__decade-view .react-calendar__tile, .react-calendar__century-view .react-calendar__tile{
    padding: 1em 0.5em;
  }
  .react-date-picker__calendar{
    position: absolute;
    height: 143px
  }
`;


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

    //Convert ISO date into readable data
    const dob = moment(props.newUser.dob).format("YYYY,MM,DD");
    //Break down dates
    const dobComponent = dob.split(',');

    let month = parseInt(dobComponent[1]) - 1;
    dobComponent[1] = month;
    
    const [date, setDate] = React.useState(new Date(dobComponent[0], dobComponent[1], dobComponent[2]));
    const {error} = props;

    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>
                <Grid item xs = {6}>
                    <TextField 
                     error = {error.firstName? true: false}
                     label="First name" variant="outlined" 
                     name = "user.firstName"
                     value = {props.newUser.firstName}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{firstName: e.target.value} }
                            ));
                     }}
                    helperText = {error.firstName && error.firstName}
                    fullWidth

                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     label="Last name" variant="outlined" 
                     error = {error.lastName? true: false}
                     value = {props.newUser.lastName}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{lastName: e.target.value} }
                            ));
                     }}
                    helperText = {error.lastName && error.lastName}
                    fullWidth

                    />
                </Grid>

                <Grid item xs = {9}>
                    <InputLabel> D.O.B </InputLabel>
                    <DatePicker id = 'datePicker'
                    className = "calendar-display"
                    label = "D.O.B"
                    value = {date}
                    minDate = {new Date(1921,2,1)}
                    maxDate = {new Date(2006,2,1)}
                    onChange = {e => {
                        setDate(e);
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{dob: e} }
                        ));
                    }}
                    placeholder = "dob"
                    format = "dd/MM/yyyy"
                    />
                </Grid>
                
            </Grid>

        </Paper>
    )
}

export default UserInformation
