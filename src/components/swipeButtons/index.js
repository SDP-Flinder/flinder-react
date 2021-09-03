// import react
import React from 'react';
// import material ui components
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
// import the styles
import './styles.css';

// create swipe buttons component and export it
const SwipeButtons = () => (
  <div className="swipe-buttons">
    <IconButton className="swipe-buttons__left">
      <CloseIcon fontSize="large" />
    </IconButton>
    <IconButton className="swipe-buttons__right">
      <FavoriteIcon fontSize="large" />
    </IconButton>
  </div>
);

export default SwipeButtons;
