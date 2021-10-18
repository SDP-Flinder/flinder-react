import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Chip, Grid, Slide } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from "@material-ui/core/Paper";
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListingList from "../Listing";

//Transition effect
const checked = true;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  first: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  second: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none"
  },
  parentPaper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1600
  },
  standalone: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 70,
    boxShadow: "none",
  },
  infoDisplay: {
    padding: theme.spacing(2),
    fontWeight: 600,
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  },
  userInfo: {
    padding: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.secondary,
    boxShadow: "none",
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
      props.history.push('/');
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
        <div>
          <Button
            onClick={() => (setButton(1))}
            className="button"
            type="submit"
            variant="outlined"
            color="primary"
          >
            Update Listing
          </Button>
          <Button
            onClick={() => (setButton(2))}
            className="button"
            type="submit"
            variant="outlined"
            color="primary"
          >
            Delete Listing
          </Button>
        </div>
      )
    }
  }

  //Check if the user viewing is the owner of the listing before rendering the active switch
  const renderSwitch = () => {
    if (owner) {
      return (
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
    <div className={classes.root}>
      <Paper className={classes.parentPaper}>
        <CssBaseline />
        <Navigation />
        <Slide in={checked} direction="left">
          <div className={classes.paper}>
            <br /> <br /> <br /> <br /> <br />
            <form onSubmit={onSubmit}>
              <Grid item xs={12} container>
                <Grid item xs container direction="column" spacing={3}>
                  {viewMatch &&
                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                      <Grid item xs={5}>
                        <Paper variant="outlined" className={classes.first}>
                          <ListingList />
                        </Paper>
                      </Grid>
                    </Slide>
                  }
                  <Grid item xs={7}>
                    <Paper className={classes.second}>
                      <Grid item xs container direction="column" spacing={2}>
                        {viewMatch &&
                          <Grid item xs={12}>
                            <Paper variant="outlined" className={classes.paper}>
                              <Grid item xs container direction="row" spacing={1}>
                                <Grid item xs={2}>
                                  <Button
                                    component={RouterLink}
                                    to="/">
                                    <ArrowBackIosIcon color="primary" />
                                    <Typography variant="button" color="primary">
                                      Back
                                    </Typography>
                                  </Button>
                                </Grid>

                                <Grid item xs={12}>
                                  <Typography variant="h5">
                                    Listing #{listing.id}
                                  </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.infoDisplay}>DESCRIPTION</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.userInfo}>
                                    {listing.description}
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.infoDisplay}>RENT</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.userInfo}>
                                    ${listing.rent} {listing.rentUnits}
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.infoDisplay}>AVAILABLE</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.userInfo}>
                                    {date}
                                  </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                  <Paper className={classes.infoDisplay}>
                                    UTILITIES
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.infoDisplay}>POWER</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.userInfo}>
                                    {listing.utilities == undefined ? "N/A" :
                                      (listing.utilities.power == false ? "Not included" : "Included")}
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.infoDisplay}>WATER</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.userInfo}>
                                    {listing.utilities == undefined ? "N/A" :
                                      (listing.utilities.water == false ? "Not included" : "Included")}
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.infoDisplay}>INTERNET</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.userInfo}>
                                    {listing.utilities == undefined ? "N/A" :
                                      (listing.utilities.internet == false ? "Not included" : "Included")}
                                  </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                  {renderSwitch()}
                                </Grid>
                              </Grid>
                              {renderButtons()}
                            </Paper>
                          </Grid>
                        }
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <Slide
                  direction="up" in={checked} mountOnEnter unmountOnExit
                >
                  <Grid item xs={12}>
                    <Paper className={classes.standalone}>
                      <Grid item>
                        <Button variant="outlined" color="primary"
                          onClick={viewListingMatches}
                        >
                          <Typography variant="subtitle1">
                            {viewMatch ? 'My potential flatties' : 'View Listing Details'}
                          </Typography>
                        </Button>
                      </Grid>
                      {!viewMatch &&
                        <Grid item>
                          <CardsForListing listingID={listing.id} />
                        </Grid>
                      }
                    </Paper>
                  </Grid>
                </Slide>
              </Grid>
            </form>
            <br />
          </div>
        </Slide>
      </Paper>
    </div>
  );
}

export default ListingDisplay;