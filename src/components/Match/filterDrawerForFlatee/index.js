import React, { useEffect, useState } from "react";
import { useAuth } from "../../App/Authentication";
import { Config } from '../../../config';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import axios from 'axios';
import './styles.css';
import { Box } from "@mui/system";
import { MenuItem, IconButton, Button, Checkbox, Input, 
  InputLabel, Select, TextField, makeStyles, Typography } from '@material-ui/core';
import { Grid, FormGroup, FormControlLabel, Chip, Divider, 
  FormControl, InputAdornment, Drawer} from '@mui/material';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 150,
    },
    listDisplay: {
      margin: 30,
    }
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
  const [isCouple, setIsCouple] = useState(user.checklist.isCouple);
  const [isSmoker, setIsSmoker] = useState(user.checklist.isSmoker);
  const [hasPet, setHasPet] = useState(user.checklist.hasPet);
  const [min, setMin] = useState(user.checklist.priceRange.min);
  const [max, setMax] = useState(user.checklist.priceRange.max);
  const [rentUnits, setRentUnits] = useState(user.rentUnits);
  const [city, setCity] = useState('');
  const [suburb, setSuburb] = useState([]);
  const [region, setRegion] = useState('');
  const [regionbDisplay, setRegionDisplay] = useState([]);
  const [suburbDisplay, setSuburbDisplay] = useState([]);
  const [repo, setRepo] = useState([]);
  const [feedback, setFeedback] = useState("");
  let prices = [];

  //Fetch authorised data from the API with token
  const getRepo = async () => {
    //Retrieve the token
    let token = await FetchToken();
    //Retrieve location data
    await FetchLocationData(token, setRepo);
  }

  //Set the data in the local state
  useEffect(()=>getRepo(), []);

  // populate the prices available to select in the price filter
  const populatePriceRange = () => {
    for(let k = 0; k<50; k++){
      prices[k] = 50*(k+1);
    }
  }

  // make the drawer, compiled with its content
  const renderRightDrawer = () => {
    populatePriceRange();
    return (
      <>
        <IconButton onClick={toggleDrawer(!rightDrawer)}>
          <FilterAltIcon></FilterAltIcon>
        </IconButton>
        <Drawer
          variant="temporary"
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

  // opens and closes drawer. reset all variables in the drawer when it closes.
  const toggleDrawer = (state) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsCouple(user.checklist.isCouple);
    setIsSmoker(user.checklist.isSmoker);
    setHasPet(user.checklist.hasPet);
    setMin(user.checklist.priceRange.min);
    setMax(user.checklist.priceRange.max);
    setRentUnits(user.rentUnits);
    setCity('');
    setSuburb([]);
    setRegion('');
    setFeedback('');

    setRightDrawer(state);
  };

  // fetch all locations available to choose from and store them in local variable
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

  // fetch token to access all locations available to choose from
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

  // show error in drawer just in case the price settings aren't put right
  useEffect(() => {
    function fetchFeedback() {
      let minTemp = min;
      let maxTemp = max;

      if (min == 50)
      {
        minTemp = 50;
      }
      else if (min == '')
      {
        minTemp = maxTemp + 1;
      }
      if (max == 50)
      {
        maxTemp = 50;
      }
      else if (max == '')
      {
        maxTemp = 0;
      }

      if (maxTemp >= minTemp)
      {
        setFeedback("");
      }
      else 
      {
        setFeedback(`Invalid Price Bound.`);
      }
    }

    fetchFeedback();
  }, [min, max]);

  // contents of the drawer: texts, buttons etc.
  const list = () => (
    <Box
      role="presentation"
      className = {classes.listDisplay}
    >
      <Typography variant = "h4" 
      className = "filterText"
      >Filter</Typography>
      <Divider>
        <Chip label="Are you..." />
      </Divider>
      <Grid item xs = {12}>
        <FormGroup component="fieldset">
          <FormControlLabel
            control={<Checkbox
            name = "smoker"
            color = "primary"
            checked={isSmoker} 
              onChange = {e => {
                setIsSmoker(!isSmoker);
              }}
            />}
            label="A Smoker"
            labelPlacement = "end"
          />
        </FormGroup>
      </Grid>

      <Grid item xs = {12}>
        <FormGroup component="fieldset">
          <FormControlLabel
            control={<Checkbox
            name = "couple"
            color = "primary"
            checked={isCouple} 
              onChange = {e => {
                setIsCouple(!isCouple);
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
          name = "pets"
          color = "primary"
          checked={hasPet} 
            onChange = {e => {
              setHasPet(!hasPet);
            }}
          />}
          label="Having Pets"
          labelPlacement = "end"
        />
        </FormGroup>
      </Grid>
      <Divider>
        <Chip label="Price Range" />
      </Divider>
      <br/>
      <Grid item container xs = {12} direction = "row" justifyContent = "space-around">
        <Grid item spacing = {2}>
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
        </Grid>

        <Grid item>          
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
      <Divider>
        <Chip label="Location" />
      </Divider>
      <br/>
      <Grid item>
      <FormControl variant="standard" className={classes.formControl}>
        <InputLabel > City (If you wish to change location) </InputLabel>
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
      <br/>
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
      <br/>
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
      <Button 
        className = "filter"
        variant = "contained"
        color = "primary"
        size="large"
        onClick={() => submit()}
      >
        Submit
      </Button>
      <p className="feedback">
          {feedback}
      </p>
    </Box>
  );

  // update preferences in backend when clicked on Submit button
  const submit = () => {
    if ((max - min) >= 0 && (min != '') && (max != '')){
      const URL = `${Config.Local_API_URL}/users/`.concat(user.id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}`}
      };

      let preferredArea = {
        city: city,
        suburb: suburb,
      }

      //Set the preferred suburb to ALL if the user leaves this field blank
      if (city != '')
      {
        if(suburb.length == 0)
        {
          if(regionbDisplay.length != 0)
          {
            for(let k =0; k<repo.length;k++)
            {
              if(repo[k].region.name == region)
              {
                preferredArea.suburb.push(...repo[k].region.suburb);
              }
            }
          } 
  
          if(region == '')
          {
            for(let k =0; k<repo.length;k++)
            {
              if (repo[k].city == city)
              {
                preferredArea.suburb.push(...repo[k].region.suburb);
              }
            }
          }
        }
      }
      else if (city == '')
      {
        preferredArea = user.preferredArea;
      }
      
      const checklist = Object.assign({}, user.checklist);
      checklist.priceRange.min = min;
      checklist.priceRange.max = max;
      checklist.isCouple = isCouple;
      checklist.isSmoker = isSmoker;
      checklist.hasPet = hasPet;

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

  // return the drawer
  return (
      <>
      {renderRightDrawer()}
      </>
  );
};