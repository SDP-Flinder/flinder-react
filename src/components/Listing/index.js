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
import Grid from '@mui/material/Grid';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@material-ui/core';
import { Grow } from '@material-ui/core';
import { withRouter } from 'react-router';

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
    marginTop: theme.spacing(1),
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
  button: {
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 10
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
      <>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1000 + count * 300 }}
        >
          <Button
            key={listing.id}
            className={classes.button}
            variant="contained"
            onClick={function () { selectListing(listing.id) }}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <MeetingRoomIcon color="primary" />
              </Grid>

              <Grid item xs={12}>
                {++count}
              </Grid>
            </Grid>
          </Button>
        </Grow>
      </>
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
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Your Listings
        </Typography>
        <Grid containder direction="row">
          <Tooltip title="Add new listing">
            <Button variant="contained" color="primary" className={classes.button}
              component={RouterLink}
              to="/newlisting"
            >
              <AddCircleIcon />
            </Button>
          </Tooltip>
          {renderButtons()}
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(ListingList);