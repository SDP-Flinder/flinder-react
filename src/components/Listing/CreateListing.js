import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { Chip, Typography, Grid, InputLabel, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { useAuth } from '../App/Authentication';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import Navigation from "../App/Navigation";
import { Stack } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={`${Config.AppURL}`}>
        {`${Config.AppName}`}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//Form for a Flat user to create a new listing under their Flat account
function CreateListing(props) {

  const classes = useStyles();
  const { user, jwt } = useAuth();
  const currentDate = new Date();

  const [error, setError] = useState({});
  const [isInvalid, setInvalid] = useState({});

  const [description, setDescription] = useState("");
  const [roomAvailable, setRoomAvailable] = useState(currentDate);
  const [rent, setRent] = useState(0);
  const [rentUnits, setRentUnits] = useState("");
  const [power, setPower] = useState(false);
  const [water, setWater] = useState(false);
  const [internet, setInternet] = useState(false);

  //Method to check if an error is detected on form submit - rent can't be $0
  const findError = () => {
    const errorFound = {};
    const invalid = {};

    if (rent < 0.01) {
      errorFound.rent = "Rent can't be 0";
      invalid.rent = true;

      return { errorFound, invalid };
    }

    return { errorFound, invalid };
  }

  //Form submit method - first checks for errors with the rent field, then calls the axios method
  const onSubmit = (e) => {
    e.preventDefault();

    const newError = findError();

    //Proceed to the next step if inputs are valid
    if (Object.keys(newError.errorFound).length > 0) {
      //Found errors and set the errors to the useState
      setError(newError.errorFound);
      setInvalid(newError.invalid);
    } else {
      createNewListing();
      props.history.push('/listings');
    }
  }

  const changePower = () => {
      setPower(!power);
  }

  const changeWater = () => {
    setWater(!water);
}

const changeInternet = () => {
    setInternet(!internet);
}

  //Axios method to post the new listing to the DB
  const createNewListing = async () => {
    const URL = 'http://localhost:4000/listings/add/'

    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    };

    const bodyParameters = {
      flat_id: user.id,
      description: description,
      roomAvailable: roomAvailable,
      rent: rent,
      rentUnits: rentUnits,
      utilities: {
          power: power,
          water: water,
          internet: internet,
      },
      active: true
    };

    axios.post(URL, bodyParameters, config);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Navigation />
      <div className={classes.paper}>
        <br/>
        <Typography component="h1" variant="h5">
          Create New Listing
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <div>
              <FormControl>
                <TextField className="input"
                  label="Flat/Room Description"
                  multiline
                  maxRows={3}
                  minRows={3}
                  autoFocus
                  required
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                  variant="outlined"
                />
              </FormControl>
            </div>
            <br /><br /><br /><br />
            <div>
              <InputLabel
                error={isInvalid.rent}
              > Rent Amount (in $NZ)</InputLabel>
              <FormControl>
                <NumberFormat
                  className="input"
                  allowEmptyFormatting={true}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  decimalScale={2}
                  required
                  value={rent}
                  onChange={(e) => { setRent(e.target.value) }}
                />
                {error.rent && <div className="error-message">{error.rent}</div>}
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                {/* Generates warning upon first clicking drop down - library hasn't kept up with react */}
                <TextField className="input"
                  label="Rent Units"
                  variant="outlined"
                  select
                  required
                  value={rentUnits}
                  onChange={(e) => { setRentUnits(e.target.value) }}>
                  <MenuItem value="Per Week">Per Week</MenuItem>
                  <MenuItem value="Per Fortnight">Per Fortnight</MenuItem>
                  <MenuItem value="Per Month">Per Month</MenuItem>
                </TextField>
              </FormControl>
            </div>
            <br /><br />
            <InputLabel>Utilities Included</InputLabel>
            <Grid item xs = {12} >
                    <br/>
                    <Stack direction = "row" spacing = {2}>
                        <Chip 
                        label = "Power" 
                        variant = {power == false ? "outlined" : "default"}
                        onClick ={changePower}
                        color = {power == false ? "default" : "primary"}
                        />
                        <Chip 
                        label = "Water" 
                        variant = {water == false ? "outlined" : "default"}
                        onClick ={changeWater}
                        color = {water == false ? "default" : "primary"}
                        />
                        <Chip 
                        label = "Internet" 
                        variant = {internet == false ? "outlined" : "default"} 
                        onClick ={changeInternet}
                        color = {internet == false ? "default" : "primary"}
                        />
                    </Stack>
                </Grid>
                <br/>
            <div>
              <InputLabel>Available From:</InputLabel>
              <DatePicker
                label="Available From"
                format="dd/MM/yyyy"
                minDate={currentDate}
                value={roomAvailable}
                onChange={(e) => { setRoomAvailable(e) }}
              />
            </div>
            <br />
            <ButtonGroup variant="contained" color="primary">
              <Button
                className="button"
                type="submit"
              >
                Create
              </Button>
              <Button className="button"
                component={RouterLink}
                to="/listings"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default CreateListing;