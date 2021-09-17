import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { useAuth } from "../App/Authentication";
import Navigation from "../App/Navigation";
import CardsForFlatee from "../Match/cardsForFlatee/index";
import CardsForFlat from "../Match/cardsForListing/index";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Home() {
  const classes = useStyles();

  //Retrieve the user information from the authentication
  const { user } = useAuth();

  console.log(user);

  const renderFlatButtons = () => {
    if (user.role === 'flat') {
      return (
        <div>
          <Button
            className="button"
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/listings"
          >
            Listings
          </Button>
        </div>
      )
    }
  }

  return (
    <>
      <Navigation />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Home
        </Typography>
        {/* User should only be able to access this page when authorised, but just incase. Could remove check */}

        {user.role == "flatee" ?
          //  If the user is a flatee, render this card
          <CardsForFlatee token={user.token} username={user.username} /> :
          // If the user is a flat, render this card. listingID = {?}
          renderFlatButtons()}
      </div>
    </>
  );
};