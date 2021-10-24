import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Navigation from "../App/Navigation";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { Config } from '../../config';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useHistory } from "react-router-dom";

//Styling used for the display of information
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bold: {
    fontWeight: 600,
    textAlign: "center"
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
    marginLeft: "50%",
    "@media screen and (max-width: 700px)": {
      marginLeft: "0%",
      width: "400px"
    },
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    width: "600px"
  },
  parentPaper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1600,
    minHeight: 1200
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

//Class for displaying the details of the matched account
export default function MatchDetails() {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const location = useLocation();
  const match = location.state.match;
  const [matchedUser, setMatchedUser] = useState([]);
  const [listing, setListing] = useState([]);
  let photoDisplay = "http://localhost:4000/";
  const history = useHistory();
  const goMatch = () => history.push('/match');

  //For ease of use for axios calls
  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

  //Load up all the necessary details for displaying the match, based on the role of the current user
  useEffect(() => {
    async function getMatch() {
      let tempMatch = [];
      if (user.role === 'flat') {
        await instance.get('/matches/findFlatee/'.concat(match.id))
          .then(res => {
            tempMatch = res.data
          });
      }
      else if (user.role === 'flatee' && listing.length !== 0) {
        await instance.get('/users/'.concat(listing.flat_id))
          .then(res => {
            tempMatch = res.data
          });
      }
      setMatchedUser(tempMatch);
    }

    //Get the listing for the match to be used in 
    async function getListing() {
      let tempListing = [];
      await instance.get('/listings/'.concat(match.listingID))
        .then(res => {
          tempListing = res.data
        });
      setListing(tempListing);
    }

    //Only run if user and match states have been set, to avoid errors
    if (user !== null && match !== null) {
      if (user.role === 'flatee') {
        getListing();
        console.log('hi',listing);
      }
      getMatch()
    }
  }, [user, listing])

  //Unmatch flatee from flat pov
  const unmatchFlatee = () => {
    let matchparam = {
      flateeUsername: matchedUser.username,
      flateeID: matchedUser.id,
      listingUsername: user.username,
      listingID: match.listingID,
    };
    instance.put('/matches/unmatch', matchparam);
    goMatch();
  }

  //Unmatch flat from flatee pov
  const unmatchFlat = () => {
    let matchparam = {
      flateeUsername: user.username,
      flateeID: user.id,
      listingUsername: matchedUser.username,
      listingID: match.listingID,
    };
    instance.put('/matches/unmatch', matchparam);
    goMatch();
  }

  //Code to display the info in a nice format
  return (
    <div className={classes.root}>
      <Navigation pageName="Match" />
      <br /><br /><br />
      <Paper className={classes.parentPaper}>
        <Grid container spacing={3}>
          <Grid item xs={12} container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs={7}>
                <Grid item xs={2}>
                  <Button
                    component={RouterLink}
                    to="/match">
                    <ArrowBackIosIcon color="primary" />
                    <Typography variant="button" color="primary">
                      Back
                    </Typography>
                  </Button>
                </Grid>
                <Paper className={classes.second}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Grid item xs container direction="row" spacing={1}>
                        <Grid item xs={12}>
                          <Typography className={classes.bold}>
                            Match Information
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <img className="avt"
                            style = {{borderRadius: 400}}
                            src={ !listing.photo ?
                              photoDisplay.concat(matchedUser.photo)
                             :
                              photoDisplay.concat(listing.photo)} />
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>Username</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}>{matchedUser.username}</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>Name</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}>{matchedUser.firstName} {matchedUser.lastName}</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>Matched on</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}>
                            {moment.utc(match.matchedDate).format('DD/MM/YYYY')}
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>
                            {matchedUser.description ? "Flat Description" : "Bio"}
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}>{matchedUser.description}{matchedUser.bio}</Paper>
                          <Paper className={classes.userInfo}>{listing.description}</Paper>
                        </Grid>

                      
                        {matchedUser.role == 'flatee' &&
                        <>
                           <Grid item xs={6}>
                            <Paper className={classes.infoDisplay}>
                              About me
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper className={classes.userInfo}>
                               
                                {matchedUser.checklist.isSmoker&& 
                                <Chip label = "Smoker" variant = "outline" 
                                style = {{margin: "5px"}}/> }
                                {matchedUser.checklist.hasPet && 
                                <Chip label = "Has Pets" variant = "outline" 
                                style = {{margin: "5px"}}/> }
                                {matchedUser.checklist.isCouple && 
                                <Chip label = "Couple" variant = "outline" 
                                style = {{margin: "5px"}}/>}
                            </Paper>
                          </Grid>

                          <Grid item container xs={12}>
                            <Grid item xs = {6}>
                              <Button variant = "contained" color = "primary"
                              onClick = {() => window.alert ('This feature is unavailable. Please come back later')}>
                                Message
                              </Button>
                            </Grid>

                            <Grid item xs = {6}>
                              <Button 
                              onClick = {() => unmatchFlatee()}>
                                Unmatch
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                        }
                      
                      {matchedUser.role == 'flat' &&
                      <>
                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>
                            Location
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}> {
                          matchedUser.address.suburb?
                          matchedUser.address.suburb : matchedUser.address.city
                          }
                          </Paper>
                        </Grid>

                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>
                            Rent
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}> NZD ${listing.rent} {listing.rentUnits}</Paper>
                        </Grid>

                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>
                            Utilities
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}> 
                           {listing.utilities.water && 
                          <Chip label = "Water" variant = "outline" 
                          style = {{margin: "5px"}}/>}
                           {listing.utilities.power && 
                          <Chip label = "Power" variant = "outline" 
                           style = {{margin: "5px"}}/>}
                           {listing.utilities.internet &&
                          <Chip label = "Internet" variant = "outline" 
                          style = {{margin: "5px"}}/>}
                          </Paper>
                        </Grid>

                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>
                            Smoking Allowed?
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}> 
                              {matchedUser.flatRules.smoking? "YES" : "NO"}
                          </Paper>
                        </Grid>

                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>
                            Pets Allowed?
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}> 
                              {matchedUser.flatRules.pets? "YES" : "NO"}
                          </Paper>
                        </Grid>
                        
                        <Grid item container xs={12}>
                          <Grid item xs = {6}>
                            <Button variant = "contained" color = "primary"
                            onClick = {() => window.alert ('This feature is unavailable. Please come back later')}>
                              Message
                            </Button>
                          </Grid>

                          <Grid item xs = {6}>
                            <Button 
                            onClick = {() => unmatchFlat()}>
                              Unmatch
                            </Button>
                          </Grid>
                        </Grid>
                        </>
                        }
                      </Grid>
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};