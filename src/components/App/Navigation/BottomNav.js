import * as React from 'react';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PersonIcon from '@mui/icons-material/Person';

import Home from '../../Home';

export default function Test(props) {
    const [value, setValue] = React.useState(props.activeStep);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
        showLabels
      >
        <BottomNavigationAction 
        component={Link}
        to="/match" 
        label="Matches" 
        icon={<AddReactionIcon />} />

        <BottomNavigationAction 
        component={Link}
        to="/" 
        label="Home" 
        icon={<HomeIcon />} />

        <BottomNavigationAction 
        component={Link}
        to="/profile" 
        label="Profile" 
        icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}