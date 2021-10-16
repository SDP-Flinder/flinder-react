import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import { useAuth } from '../App/Authentication';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import Navigation from "../App/Navigation";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={`${Config.AppURL}`}>
        {`${Config.AppName}`}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//Shows the current user all listings they have created, along with the ooption to create a new listing
function ListingList(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [listings, setListings] = useState([]);

  //Passes the selected listing to the listing page for displaying
  function selectListing(id) {
    props.history.push({
      pathname: '/listing/display',
      state: { id: id },
    });
  }

  //Dynamically render individual buttons for each listing under the account
  const renderButtons = () => {
    let count = 0;
    return listings.map((listing) => (
      <Button
        className="button"
        variant="contained"
        key={listing.id}
        onClick={function () { selectListing(listing.id) }}
      >
        {++count}
      </Button>
    ))
  }

  //Fetch all listings owned by the current user on page load
  useEffect(() => {
    async function getListings() {
      const URL = 'http://localhost:4000/listings/flat/'.concat(user.id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const listings = await axios.get(URL, config);

      setListings(listings.data);
    }
    getListings();
  }, [user, jwt])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Navigation />
      <div className={classes.paper}>
        <br />
        <Typography component="h1" variant="h5">
          Listings
        </Typography>
        {renderButtons()}
        <br />
        <ButtonGroup variant="contained" color="primary">
          <Button
            className="button"
            component={RouterLink}
            to="/"
          >
            Account
          </Button>
          <Button
            className="button"
            component={RouterLink}
            to="/newlisting"
          >
            Create Listing
          </Button>
        </ButtonGroup>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default ListingList;