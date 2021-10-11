import React from 'react'
import { Grid, Paper } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import DatePicker from 'react-date-picker';
import moment from 'moment';

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
    const {error} = props;

        //Convert ISO date into readable data
        const lease = moment(props.newUser.leaseDate).format("YYYY,MM,DD");
        //Break down dates
        const leaseComponent = lease.split(',');
    
        let month = parseInt(leaseComponent[1]) - 1;
        leaseComponent[1] = month;
        
        const [date, setDate] = React.useState(new Date(leaseComponent[0], leaseComponent[1], leaseComponent[2]));

    return (
        <Paper className = {classes.paper} variant="outlined">
            <Grid container spacing = {2} xs = {12}>
                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Street" variant="outlined" 
                     error = {error.street? true: false}
                     helperText = {error.street?error.street:false}
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
                     required
                     fullWidth

                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Suburb" variant="outlined" 
                     error = {error.suburb? true: false}
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
                     required
                     fullWidth

                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="City" variant="outlined" 
                     error = {error.city?true:false}
                     helperText = {error.city?error.city:null}
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
                     fullWidth
                    />
                </Grid>

                <Grid item xs = {6}>
                    <TextField 
                     id="outlined-basic" label="Country" variant="outlined" 
                     value = {props.newUser.address.country}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    />
                </Grid>

                <Grid item xs = {12}>
                    <TextField 
                     id="outlined-basic" label="Existing flatmates" variant="outlined" 
                     value = {props.newUser.existingFlatmates}
                     onChange = {e => {
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{existingFlatmates: e.target.value} }
                            ));
                     }}
                     required
                     error = {error.flatmates ? true : false}
                     helperText = {error.flatmates ? error.flatmates : null}
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
                    required
                    error = {error.description ? true : false}
                    helperText = {error.description ? error.description : null}
                    />
                </Grid>
                

                <Grid item xs = {9}>
                    <InputLabel> Lease Date </InputLabel>
                    <DatePicker id = 'datePicker'
                    className = "calendar-display"
                    label = "Lease date"
                    value = {date}
                    minDate = {new Date()}
                    onChange = {e => {
                        setDate(e);
                        props.setUser((prevUser) => ({ 
                            ...prevUser, 
                            ...{leaseDate: e} }
                        ));
                    }}
                    placeholder = "Lease date"
                    format = "dd/MM/yyyy"
                    />
                </Grid>
            </Grid>

        </Paper>
    )
}

export default FlatInformation