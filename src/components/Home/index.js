import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { useAuth } from "../App/Authentication";
import Navigation from "../App/Navigation";
import CardsForFlatee from "../Match/cardsForFlatee/index";
import FilterDrawerForFlatee from "../Match/filterDrawerForFlatee/index";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from "@mui/system";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
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
  const { user } = useAuth();

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

  const blank = () => (
    console.log("hello")
  );

    return (
        <>
            <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Navigation currentPath = "home" pageName = "Home"/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {`Hello ${user.firstName} ${user.lastName}`}
                </Typography>
                {user.role == "flatee"?
                <FilterDrawerForFlatee/>:
                blank()}
                {/* User should only be able to access this page when authorised, but just incase. Could remove check */}
                {user.role == "flatee"?
                //  If the user is a flatee, render this card
                 <CardsForFlatee/>:
                // If the user is a flat, render this card. listingID = {?}
                renderFlatButtons()}
            </div>
            </Box>
        </>
    );

};