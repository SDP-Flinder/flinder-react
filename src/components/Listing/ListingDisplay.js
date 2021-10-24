import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Grid, Slide } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import * as moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { Config } from '../../config';
import { useAuth } from '../App/Authentication';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardsForListing from "../Match/cardsForListing/index";
import Navigation from "../App/Navigation";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListingList from "../Listing";
import UpdateListing from './UpdateListing';
import Confirmation from '../Profile/EditBio/Confirmation';

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
    minHeight: "650px",
  },
  first: {
    padding: theme.spacing(2),
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
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1600
  },
  standalone: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 70,
    boxShadow: "none",
  },
  standaloneView: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(8),
    textAlign: "right",
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
  },
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
  const [owner, setOwner] = useState(false);
  const [viewMatch, setViewMatch] = useState(true);
  const [open, setOpen] = useState(false);

  //Helper axios calls
  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

  //Delete the current listing from the database
  const deleteListing = async () => {
    await instance.delete('/listings/'.concat(listing.id));
    props.history.push('/');
  }

  //Event handler for the active switch - the owner accoount is able to toggle whether the listing is available or not directly from the listing page, without having to oopen the update listing page
  const handleChange = (event) => {
    setActive(event.target.checked);
    const activeStatus = event.target.checked;
    updateActive(activeStatus);
  };

  //Update the active status of the current listing in the database
  const updateActive = async (activeStatus) => {
    await instance.put('/listings/'.concat(listing.id), { active: activeStatus });
  }

  //Check if the user viewing is the owner of the listing before rendering the update/delete buttons
  const renderButtons = () => {
    if (owner) {
      return (
        <div>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
            Update Listing
          </Button>
          <Button style = {{margin: "10px"}} variant="outlined" color="primary" onClick={deleteListing}>
            Delete Listing
          </Button>
        </div>
      )
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
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
      const listing = await instance.get('/listings/'.concat(id));
      setListing(listing.data);
    }
    getListing();
  }, [id])

  useEffect(() => {
    if (listing.active !== undefined) {
      setActive(listing.active)
    }
    if (listing.roomAvailable !== undefined) {
      let d = listing.roomAvailable;
      setDate(moment(d).format("DD/MM/YYYY"));
    }
  }, [listing]);

  useEffect(() => {
    if (listing.flat_id === user.id) {
      setOwner(true)
    }
  }, [user, listing])

  useEffect(() => {
    async function getListing() {
      const listing = await instance.get('/listings/'.concat(id));
      setListing(listing.data);
    }
    getListing();
  }, [open])

  const viewListingMatches = () => {
    setViewMatch(!viewMatch);
  }

  //Handle upload photo
  const [confirmation, setConfirmation] = React.useState(false);
  const handleConfirmationOpen = () => {
    setConfirmation(true);
  }
  const handleConfirmationClose = () => {
      window.location.reload();
  }


  const [photo, setPhoto] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photo);
    
    if(!photo || photo === ''){
        window.alert('Please choose a file.');
    }
    else
    {

    const URL = 'http://localhost:4000/'.concat("listings/photo/").concat(id);

    const formData = new FormData();

    formData.append('profileImage', photo);

    const config = {
        headers: {
        Authorization: `Bearer ${jwt}`,
            
        'content-type': 'multipart/form-data'
        }
    }

    await axios.put(URL, formData, config).then(setConfirmation(true)).catch(err =>console.log(err));
    }
  }
  
  const [editPhoto, setEditPhoto] = React.useState(true);

  return (
    <div className={classes.root}>
      <Paper className={classes.parentPaper}>
        <CssBaseline />
        <Navigation />
        <Slide in={checked} direction="left">
          <div className={classes.paper}>
              <Grid item xs={12} container>
              <Slide
                  direction="up" in={checked} mountOnEnter unmountOnExit
                >
                  <Grid item xs={12}>
                    <Paper 
                    className={!viewMatch ? classes.standalone : classes.standaloneView}>
                      <Grid item>
                        <Button variant="contained" color="primary"
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
                
                <Grid item xs container direction="column" spacing={3}>
                  {viewMatch &&
                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                      <Grid item xs={5}>
                        <Paper variant="outlined" className={classes.first}>

                          {(listing.photo && editPhoto) ?
                          <div>
                          <img className = "listing-avt"
                          src = {"http://localhost:4000/".concat(listing.photo)} />

                          <br/> 
                          
                          <Button onClick = {() => setEditPhoto(!editPhoto)}>
                              Edit
                          </Button>
                          </div>
                          :
                          <div>
                          <form onSubmit={handleSubmit}>
                              <input
                                  id = "profile-photo"
                                  type="file"
                                  accept="image/*"
                                  onChange={e => {
                                      setPhoto(e.target.files[0]);
                                  } }
                              />
                              <br/>
                              <br/>

                              <Button 
                              variant="contained" 
                              color="primary"
                              type="submit"
                              >
                                {listing.photo ?
                                  'Update' : 'Add listing photo'}
                              </Button>

                              {listing.photo &&
                              <Button onClick = {() => setEditPhoto(!editPhoto)}>
                                Cancel 
                              </Button>}
                          </form>
                          </div>}
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
              </Grid>
            <br />
          </div>
        </Slide>
      </Paper>
      <UpdateListing open={open} setOpen={setOpen} />

      <Confirmation
                open={confirmation}
                handleClickOpen={handleConfirmationOpen}
                handleClose={handleConfirmationClose}
      />
    </div>
  );
}

export default ListingDisplay;