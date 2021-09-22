import * as React from 'react';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ForumIcon from '@mui/icons-material/Forum';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

function getCurrentpage (route) {
  switch(route){
    case '/match':
      return 0;
    case '/':
      return 1;
    case '/profile':
      return 2;
    default:
      return 0;
  }
}

function BottomNav(props) {
  //Get the current path
  const value = getCurrentpage(props.location.pathname);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={() => getCurrentpage(props.location.pathname)}
        showLabels
      >
        <BottomNavigationAction 
        component={Link}
        to="/match" 
        label="Matches" 
        icon={<ForumIcon />} />

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

export default withRouter(BottomNav)