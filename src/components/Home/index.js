import React from "react";
import { Typography, CssBaseline, makeStyles, Button } from "@material-ui/core";
import { useAuth } from "../App/Authentication";
import Navigation from "../App/Navigation";
import CardsForFlatee from "../Match/cardsForFlatee/index";
import FilterDrawerForFlatee from "../Match/filterDrawerForFlatee/index";
import { Link as RouterLink } from 'react-router-dom';
import { Box } from "@mui/system";
import ListingList from "../Listing/";

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
    console.log("No filter drawer for flat acc. Future user stories needed.")
  );

    return (
        <>
            <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Navigation currentPath = "home" pageName = "Home"/>
            <div className={classes.paper}>
                {user.role == "flatee"?
                //  If the user is a flatee, render this card
                 <CardsForFlatee/>:
                // If the user is a flat, render this card. listingID = {?}
                <ListingList/>}
            </div>
            </Box>
        </>
    );

};