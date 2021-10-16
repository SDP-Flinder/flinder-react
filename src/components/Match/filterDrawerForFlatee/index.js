import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { useAuth } from "../../App/Authentication";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from "@mui/system";
import { CssBaseline } from "@material-ui/core";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormHelperText , MenuItem} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from '@mui/material';
import { Config } from '../../../config';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@material-ui/core/Select';
import { FormControl } from '@mui/material';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
// import axios
import axios from 'axios';
// import styles
import './styles.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 150,
    },
  }));
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};
export default function FilterDrawerForFlatee() {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [rightDrawer, setRightDrawer] = useState(false);
  const [rentUnits, setRentUnits] = useState(user.rentUnits);
  const [min, setMin] = useState(user.checklist.priceRange.min);
  const [max, setMax] = useState(user.checklist.priceRange.max);
  const [city, setCity] = useState('');
  const [suburb, setSuburb] = useState([]);
  const [region, setRegion] = useState('');
  //Display the locations from the database
  const [regionbDisplay, setRegionDisplay] = useState([]);
  const [suburbDisplay, setSuburbDisplay] = useState([]);
  //This useState is used to store data from the API
  const [repo, setRepo] = useState([]);
  const [feedback, setFeedback] = useState("");
  let prices = [];

  //Fetch authorised data from the API with token
  const getRepo = async () => {
    //Retrive the token
    let token = await FetchToken();
    //Retrive location data
    await FetchLocationData(token, setRepo);
  }

  //Set the data in the local state
  useEffect(()=>getRepo(), []);

  const populatePriceRange = () => {
    for(let k = 0; k<50; k++){
      prices[k] = 50*(k+1);
    }
  }

  const renderRightDrawer = () => {
    populatePriceRange();
    return (
      <>
        <Button onClick={toggleDrawer(true)}>{'rightDrawerToggle'}</Button>
        <Drawer
          variant="persistent"
          anchor={'right'}
          open={rightDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </Drawer>
      </>
    )
  }

  const toggleDrawer = (state) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setRightDrawer(state);
  };

  async function FetchLocationData(token, setRepo) {
    const URL = `${Config.Local_API_URL}/locations/`;
    const USER_TOKEN = token;
    const AuthString = 'Bearer '.concat(USER_TOKEN);
  
    //Using .get to retrieve data 
    await axios.get(URL, { headers: { Authorization: AuthString } })
      .then(response => {
        //Store data in a local variable
        const myRepo = response.data;
        console.log(myRepo);
        //Update the state
        setRepo(myRepo);
      })
      .catch((error) => {
        //Display error
        console.log('error ' + error);
      });
  }

  async function FetchToken() {
    let token = '';
  
    const account = {
      username: 'admin',
      password: 'admin'
    };
  
    await axios.post(`${Config.Local_API_URL}/users/authenticate`, account)
      .then(res => {
        token = res.data.token;
      });
    return token;
  }

  useEffect(() => {
    function fetchFeedback() {
      let minTemp = min;
      let maxTemp = max;

      if (min == 50)
      {
        minTemp = 50;
      }
      if (max == 50)
      {
        maxTemp = 50;
      }

      if (maxTemp >= minTemp)
      {
        setFeedback("");
      }
      else 
      {
        setFeedback(`Invalid Price Bound. min: ${minTemp}, max: ${maxTemp}`);
      }
    }

    fetchFeedback();
  }, [min, max]);

  const list = () => (
    <Box
      role="presentation"
    >
      <Button 
        className="back"
        onClick={toggleDrawer(false)}
      >
        Back
      </Button>
      <h1>Filter</h1>
      <Divider>
        <Chip label="Price Range" />
      </Divider>
      <br/>
      <br/>
      <Grid item xs = {12} direction = "row">
        <Grid item>
          <FormControl 
            variant="outlined"
          >
            <InputLabel 
              htmlFor="outlined-age-native-simple"
              >From
            </InputLabel>
            <Select
              native
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              value={min}
              placeholder = "min"
              onChange={e => {
                setMin(e.target.value);
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
                      
          <FormControl 
            variant="outlined"
          >
            <InputLabel 
              htmlFor="outlined-age-native-simple"
              >To
            </InputLabel>
            <Select
              native
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              value={max}
              placeholder = "max"
              onChange={e => {
                setMax(e.target.value);
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
      </Grid>
      <br/>
      <br/>
      <Grid item xs = {12}>
        <TextField className="input"
          label="Rent Units"
          variant="outlined"
          select
          required
          value={rentUnits}
          onChange={e => {
            setRentUnits(e.target.value);
          }}
        >
          <MenuItem value="Per Week">Per Week</MenuItem>
          <MenuItem value="Per Fortnight">Per Fortnight</MenuItem>
          <MenuItem value="Per Month">Per Month</MenuItem>
        </TextField>
      </Grid>
      <br/>
      <br/>
      <br/>
      <br/>
      <Divider>
        <Chip label="Location" />
      </Divider>
          <Grid item>
        <FormControl variant="standard" className={classes.formControl}>
            <InputLabel > City (Required) </InputLabel>
            <Select
              native
              name = "city"
              value = {city}
              onChange = {e => {
                //Save the current city
                setCity(e.target.value);

                //Reset the field
                setRegion('');
                setRegionDisplay('');
                setSuburbDisplay([]);

                let region = [];
                for(var k = 0; k < repo.length; k++ ){
                  if(repo[k].city == e.target.value){
                    region.push(repo[k].region.name);
                  }
                }

                setRegionDisplay(region);
              }}
            >
              <option value={''}/>
              <option value={'Auckland'}>Auckland</option>
              <option value={'Wellington'}>Wellington</option>
            </Select>
            </FormControl>
          </Grid>

          {city &&
          <Grid item>
          <FormControl variant="standard" className={classes.formControl}>
          <InputLabel> District (Optional) </InputLabel>
          <Select
            native
            placeholder = "Optional"
            name = "region"
            value = {region}
            onChange = {e => {
              //Save the current city
              setRegion(e.target.value);
              setSuburb([]);

              for(var k = 0; k < repo.length; k++ ){
                if(repo[k].region.name == e.target.value){
                  setSuburbDisplay(repo[k].region.suburb)
                }
              }
            }}
          >
            <option value={''}/>
            {regionbDisplay.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Select>
          </FormControl>
          </Grid>}  

          {region &&
          <Grid item >
            <FormControl className={classes.formControl}>
            <InputLabel>Suburb (Optional)</InputLabel>
            <Select className = "input"
              multiple
              name = "suburb"
              variant="outlined"
              value={suburb}
              onChange = {e => setSuburb(e.target.value)}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {suburbDisplay.map((suburb) => (
                <MenuItem key={suburb} value={suburb}>
                  {suburb}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>}
          
      <br/>
      <br/>
      <Button 
        className="filter"
        onClick={() => submit()}
      >
        Submit
      </Button>
      <p className="feedback">
          {feedback}
      </p>
    </Box>
  );

  const submit = () => {
    if ((max - min) >= 0 && (min != '') && (max != '') && (city != '')){
      const URL = `${Config.Local_API_URL}/users/`.concat(user.id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}`}
      };

      let preferredArea = {
        city: city,
        suburb: suburb,
      }

      //Set the preferred suburb to ALL if the user leaves this field blank
      if(suburb.length == 0){
        if(regionbDisplay.length != 0){
          preferredArea.suburb.push(suburbDisplay);
        } 

        if(region == ''){
          for(let k =0; k<repo.length;k++){
            preferredArea.suburb.push(...repo[k].region.suburb);
          }
        }
      }

      const checklist = Object.assign({}, user.checklist);
      checklist.priceRange.min = min;
      checklist.priceRange.max = max;

      const bodyParameters = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        role: user.role.toLowerCase(),
        address: user.address,
        description: user.description,
        preferredArea: preferredArea,
        checklist: checklist,
        rentUnits: rentUnits,
      };
      axios.put(URL, bodyParameters, config);
      window.location.reload(false);
    } 
  };

    return (
        <>
        {renderRightDrawer()}
        </>
    );
};