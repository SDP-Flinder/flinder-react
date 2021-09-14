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
    const {preferredArea} = props.formData;

  const onSubmit = e => {
    e.preventDefault();
    console.log(areas);
    console.log(props.formData);
    navigation.next();
    props.updateUser({['preferredArea']: preferredArea});
    }
    
    return (
        <form onSubmit = {onSubmit}>
        <h6>Next, please choose your preferred flatting areas.</h6>
        <p>(You can change this later)</p>

        <FormControl>
        <InputLabel > City </InputLabel>
        <Select
          native
          name = "preferredArea.city"
          value = {preferredArea.city}
          onChange = {props.setForm}
        >
          <option value={''}/>
          <option value={'Auckland'}>Auckland</option>
        </Select>
        </FormControl>

    <br />
    <br />
    {(preferredArea.city && preferredArea.suburb.length == 0 )&& <p style ={{"fontStyle":"italic", "color": "blue"}}> Then, select your preferred suburbs</p>}
    <FormControl>
        <InputLabel>Suburb</InputLabel>
        <Select className = "input"
          disabled = {!preferredArea.city ? true : false}
          multiple
          name = "preferredArea.suburb"
          value={preferredArea.suburb}
          onChange={props.setForm}
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
          onClick = {() => navigation.previous()}>
          <ArrowBackIosIcon/>
      </IconButton>
      <IconButton variant="contained" className = "button"
          disabled = {!preferredArea.city ? true: false}
          color = "secondary"
          type = "submit">
          <ArrowForwardIosIcon/>
      </IconButton>
      </div>
        </form>
    )
}

export default FlateePreferredAreas


