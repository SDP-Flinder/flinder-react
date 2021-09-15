import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useState } from 'react';
import {ReactComponent as FlinderLogo} from '../../../assets/logo.svg';
import { Typography } from '@material-ui/core';


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
    //Pass properties
    const {navigation} = props;
    const [city, setCity] = useState('');
    const [suburb, setSuburb] = useState([]);

    const onSubmit = e => {
      e.preventDefault();
      let preferredArea = {
        city: city,
        suburb: suburb,
      }
      props.updateUser({['preferredArea']:preferredArea});
      navigation.go("flatee-checklist");
    }
    
    return (
        <form className = "layout" onSubmit = {onSubmit}>
          <FlinderLogo className = "logo-display"/>
        
        <Typography component="p" variant="p">Next, please choose your preferred flatting areas.</Typography>
        <Typography component="p" variant="p">(You can change this later)</Typography>

        <FormControl>
        <InputLabel > City </InputLabel>
        <Select
          native
          name = "city"
          value = {city}
          onChange = {e => setCity(e.target.value)}
        >
          <option value={''}/>
          <option value={'Auckland'}>Auckland</option>
        </Select>
        </FormControl>

    <br />
    <br />
    {(city && suburb.length == 0 )&& <p style ={{"fontStyle":"italic", "color": "blue"}}> Then, select your preferred suburbs</p>}
    <FormControl>
        <InputLabel>Suburb</InputLabel>
        <Select className = "input"
          disabled = {!city ? true : false}
          multiple
          name = "suburb"
          variant="outlined"
          value={suburb}
          onChange = {e => setSuburb(e.target.value)}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {areas.map((area) => (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br/>
      <br/>
      <div className = "display-button">
      <IconButton variant="contained" className = "button"
          onClick = {() => navigation.go("flat-information")}>
          <ArrowBackIosIcon/>
      </IconButton>
      <IconButton variant="contained" className = "button"
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


