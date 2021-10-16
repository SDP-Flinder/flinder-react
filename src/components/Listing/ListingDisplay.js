import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Chip, Grid, Slide } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { useAuth } from '../App/Authentication';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import CardsForListing from "../Match/cardsForListing/index";
import Navigation from "../App/Navigation";
import { Stack } from '@mui/material';
import Zoom from '@mui/material/Zoom';

//Transition effect
const zoom = true;

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
    marginBottom: 30,
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
  info: {
    marginTop: 10,
    marginBottom: 10,
    boxSizing: "border-box",
    maxWidth: 500,
    padding: 10,
  }
}));

//Component to display the details of the selected listing for the owner flat account
function ListingDisplay(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const location = useLocation();
  const id = location.state.id;
  const [listing, setListing] = useState([]);
  const [date, setDate] = useState('');
  const [active, setActive] = useState(true);
  const [button, setButton] = useState(0);
  const [owner, setOwner] = useState(false);

  const [viewMatch, setViewMatch] = useState(true);

  //Submit button for deleting the selected listing
  const onSubmit = (e) => {
    e.preventDefault();

    if (button === 1) {
      props.history.push({
        pathname: '/updatelisting',
        state: { id: listing.id },
      });
    }
    if (button === 2) {
      deleteListing();
      props.history.push('/listings');
    }
  }

  const deleteListing = async () => {
    const URL = 'http://localhost:4000/listings/'.concat(listing.id);

    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    };

    await axios.delete(URL, config);
  }

  //Event handler for the active switch - the owner accoount is able to toggle whether the listing is available or not directly from the listing page, without having to oopen the update listing page
  const handleChange = (event) => {
    setActive(event.target.checked);
    const activeStatus = event.target.checked;
    updateActive(activeStatus);
  };

  const updateActive = async (activeStatus) => {
    const URL = 'http://localhost:4000/listings/'.concat(listing.id);

    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    };

    await axios.put(URL, { active: activeStatus }, config);
  }

  //Check if the user viewing is the owner of the listing before rendering the update/delete buttons
  const renderButtons = () => {
    if (owner) {
      return (
        <ButtonGroup variant="contained" color="primary">
          <Button
            onClick={() => (setButton(1))}
            className="button"
            type="submit"
          >
            Update Listing
          </Button>
          <Button
            onClick={() => (setButton(2))}
            className="button"
            type="submit"
          >
            Delete Listing
          </Button>
        </ButtonGroup>

      )
    }
  }

  //Check if the user viewing is the owner of the listing before rendering the active switch
  const renderSwitch = () => {
    if (owner) {
      return (
        <Slide in = {zoom} direction = "up">
        <FormControlLabel
          control={
            <Switch
              checked={active}
              onChange={handleChange}
              name="checked"
              color="primary"
            />}
          label="Active"
        />
        </Slide>
      );
    }
  }

  //Methods to ensure current displayed information is accurate
  useEffect(() => {
    async function getListing() {
      const URL = 'http://localhost:4000/listings/'.concat(id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const listing = await axios.get(URL, config)

      setListing(listing.data);
    }
    getListing();
  }, [user, id, jwt])

  useEffect(() => {
    if (listing.active !== undefined) {
      setActive(listing.active)
    }
  }, [listing]);

  useEffect(() => {
    if (listing.roomAvailable !== undefined) {
      let d = listing.roomAvailable;
      setDate(moment(d).format("DD/MM/YYYY"));
    }
  }, [listing])

  useEffect(() => {
    if (listing.flat_id === user.id) {
      setOwner(true)
    }
  }, [user, listing])

  const viewListingMatches = () => {
    setViewMatch(!viewMatch);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Navigation />
      <div className={classes.paper}>
        <br/>
        <form onSubmit={onSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {viewMatch &&
            <ButtonGroup variant="contained" color="primary">
              <Button
                className="button"
                component={RouterLink}
                to="/listings"
              >
                Listings
              </Button>
              <Button
                className="button"
                component={RouterLink}
                to="/newlisting"
              >
                Create Listing
              </Button>
            </ButtonGroup>}

            {/* Placeholder listing information - will replace with a more elegant display, such as cards, once developed */}
            <div>
              { viewMatch &&
              <>
              <Grid container spacing = {2} className = {classes.info}>
                <Grid item xs = {12}>
                  <Slide in={zoom} direction = "up">
                  <div >
                    <Typography variant = "caption">
                    DESCRIPTION
                    </Typography> 
                    <Typography varian = "body1">
                    {listing.description}
                    </Typography>
                  </div>
                  </Slide>
                </Grid>

                <Slide in = {zoom} direction = "up" >
                <Grid item container xs = {12}>
                  <Grid item xs = {3}>
                  <Typography variant = "caption">UTILITIES </Typography>
                  </Grid>
                  <Grid item xs = {12} >
                        <br/>
                        <Stack direction = "row" spacing = {2}>
                            <Chip 
                            label = "Power" 
                            variant = {listing.utilities == undefined ? "outlined" : 
                            (listing.utilities.power == false ? "outlined" : "default")}
                            color = {listing.utilities == undefined ? "default" : 
                            (listing.utilities.power == false ? "default" : "primary")}
                            />
                            <Chip 
                            label = "Water" 
                            variant = {listing.utilities == undefined ? "outlined" : 
                            (listing.utilities.water == false ? "outlined" : "default")}
                            color = {listing.utilities == undefined ? "default" : 
                            (listing.utilities.water == false ? "default" : "primary")}
                            />
                            <Chip 
                            label = "Internet" 
                            variant = {listing.utilities == undefined ? "outlined" : 
                            (listing.utilities.internet == false ? "outlined" : "default")} 
                            color = {listing.utilities == undefined ? " " : 
                            (listing.utilities.internet == false ? "default" : "primary")}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                </Slide>

                <Slide in = {zoom} direction = "up">
                <Grid item xs = {12}>
                    <>
                    <Typography variant ="caption">
                    RENT
                    </Typography>

                    <Typography variant = "body1">
                    ${listing.rent} {listing.rentUnits}
                    </Typography>
                    </>
                </Grid>
                </Slide>

                <Slide in ={zoom} direction = "up">
                <Grid item xs = {12}>
                    <>
                    <Typography variant = "caption">
                    AVAILABLE
                    </Typography>

                    <Typography variant = "body1">
                    {date}
                    </Typography>
                    </>

                    <Grid item xs = {12}>
                    {renderSwitch()}
                    </Grid>
                </Grid>
                </Slide>
              <br/>
              <br/>
              </Grid>
              {renderButtons()}
              </>
              }
            </div>
            <br/>
            <Grid item>
            <Button variant = "outlined" color = "primary"
                onClick = {viewListingMatches}
                >
                  <Typography variant = "subtitle1">
                  {viewMatch? 'My potential flatties' : 'View Listing Details'}
                  </Typography>
            </Button>
            </Grid>
              { !viewMatch &&
                <Grid item>
                <CardsForListing listingID={listing.id} />
                </Grid>
              }
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default ListingDisplay;