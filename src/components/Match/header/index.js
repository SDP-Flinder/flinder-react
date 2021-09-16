// import react
import React from 'react';
// import icons
import PersonIcon from '@material-ui/icons/Person';
// import Icon button
import { IconButton } from '@material-ui/core';
// import Logo
import ForumIcon from '@material-ui/icons/Forum';
import { ReactComponent as FlinderLogo } from '../assets/logo.svg';
// import forum icon
// import the styles
import './styles.css';

// create and export header component
const Header = () => (
  <div className="header">
    <IconButton>
      <PersonIcon fontSize="large" className="header__icon" />
    </IconButton>
    <FlinderLogo className="header__logo" />
    <IconButton>
      <ForumIcon fontSize="large" className="header__icon" />
    </IconButton>
  </div>
);

export default Header;
