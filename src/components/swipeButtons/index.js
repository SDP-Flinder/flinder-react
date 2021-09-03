// import react
import React from 'react';
// import material ui components
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FLashOnIcon from '@material-ui/icons/FlashOn';
import IconButton from '@material-ui/core/IconButton';
// import the styles
import './styles.css';

// create swipe buttons component and export it
const SwipeButtons = () => (
  <div className="swipe-buttons">
    <IconButton className="swipe-buttons__repeat">
      <ReplayIcon fontSize="large" />
    </IconButton>
    <IconButton className="swipe-buttons__left">
      <CloseIcon fontSize="large" />
    </IconButton>
    <IconButton className="swipe-buttons__star">
      <StarRateIcon fontSize="large" />
    </IconButton>
    <IconButton className="swipe-buttons__right">
      <FavoriteIcon fontSize="large" />
    </IconButton>
    <IconButton className="swipe-buttons__lightning">
      <FLashOnIcon fontSize="large" />
    </IconButton>
  </div>
);

export default SwipeButtons;
