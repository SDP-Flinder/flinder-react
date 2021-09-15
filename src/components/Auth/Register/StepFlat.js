import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(3),
      },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
        actionsContainer: {
        marginBottom: theme.spacing(2),
    },
        resetContainer: {
        padding: theme.spacing(3),
    },
  }));

export default function Step2Flat() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        smoking: false,
        pets: false,
      });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { smoking, pets } = state;

    return(
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <Typography component="h3" variant="h5">
                    Address
                </Typography>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="street"
                        variant="outlined"
                        required
                        fullWidth
                        id="street"
                        label="Street"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="suburb"
                        label="Suburb"
                        name="suburb"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="city"
                        variant="outlined"
                        required
                        fullWidth
                        id="city"
                        label="City / Region"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        />
                    </Grid>
                </Grid>
                <Typography component="h3" variant="h5">
                    Address
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        label="Email Address"
                        name="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        />
                    </Grid>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={smoking} onChange={handleChange} name="smoking" />}
                            label="Smoking allowed"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={pets} onChange={handleChange} name="pets" />}
                            label="Pets Allowed"
                        />
                        </FormGroup>
                    </FormControl>
                </Grid>
            </form>
        </div>
    );
};