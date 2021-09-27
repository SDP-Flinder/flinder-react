import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Grid, MenuItem } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

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

  const areas = [
    'Auckland CBD',
    'Eden Terrace',
    'Freemans Bay',
    'Grafton',
    'Grey Lynn',
    'Kingsland',
    'Mt Eden',
    'Parnell',
    'Ponsonby'
  ]
  
const FlateePreferredAreas = (props) => {
    const classes = useStyles();
    //Pass properties
    const {navigation} = props;
    const [city, setCity] = useState('');
    const [suburb, setSuburb] = useState([]);
    const [region, setRegion] = useState('');

    //This useState is used to store data from the API
    const [repo, setRepo] = useState([]);

    //Fetch authorised data from the API with token
    const getRepo = async () => {
    //Retrive the token
    let token = await FetchToken();
    
    //Retrive location data
    await FetchLocationData(token, setRepo);
    }
          
    //Set the data in the local state
    useEffect(()=>getRepo(), []);
    

    //Display the locations from the database
    const [regionbDisplay, setRegionDisplay] = useState([]);
    const [suburbDisplay, setSuburbDisplay] = useState([]);

    const onSubmit = e => {
      e.preventDefault();
      let preferredArea = {
        city: city,
        suburb: suburb,
      }

      //Set the preferred suburb to ALL if the user leaves this field blank
      if(suburb.length == 0){
        preferredArea.suburb.push("All suburbs");
      }

      props.updateUser({['preferredArea']:preferredArea});
      navigation.go("flatee-checklist");
    }
    
    return (
        <form onSubmit = {onSubmit}>
        
        <Typography component="h3">Next, please choose your preferred flatting areas.</Typography>
        <Typography variant="body2">(You can change this later)</Typography>
        <br/>
        <Grid container spacing = {2}>
          {city &&
          <Grid item>
            <Alert severity = "info"> Being more specific with your preferred areas can help you find your perfect flat faster</Alert>
          </Grid>}
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

      </Grid>
      <br/>
      <br/>
      <div className = "display-button">
      <IconButton variant="contained"
          onClick = {() => navigation.go("flat-information")}>
          <ArrowBackIosIcon/>
      </IconButton>
      <IconButton variant="contained"
          disabled = {!city ? true: false}
          color = "primary"
          type = "submit">
          <ArrowForwardIosIcon/>
      </IconButton>
      </div>
        </form>
    )
}

export default FlateePreferredAreas


async function FetchToken() {
  let token = '';

  const account = {
    username: 'admin',
    password: 'admin'
  };

  await axios.post('http://localhost:4000/users/authenticate', account)
    .then(res => {
      token = res.data.token;
    });
  return token;
}

async function FetchLocationData(token, setRepo) {
  const URL = 'http://localhost:4000/locations/';
  const USER_TOKEN = token;
  const AuthString = 'Bearer '.concat(USER_TOKEN);

  //Using .get to retrieve data 
  await axios.get(URL, { headers: { Authorization: AuthString } })
    .then(response => {
      //Store data in a local variable
      const myRepo = response.data;
      console.log(myRepo);
      //Updata the state
      setRepo(myRepo);
    })
    .catch((error) => {
      //Display error
      console.log('error ' + error);
    });
}

