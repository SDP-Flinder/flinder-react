import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navigation from "../App/Navigation";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import BottomNav from '../App/Navigation/BottomNav';
import axios from 'axios';
import moment from "moment";
import { Config } from '../../config';

//Styling used for the display of information
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bold: {
    fontWeight: 600,
    textAlign: "left"
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

//Class for displaying the details of the matched account
export default function MatchDetails() {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const location = useLocation();
  const match = location.state.match;
  const [matchedUser, setMatchedUser] = useState([]);
  const [listing, setListing] = useState([]);

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
      }
      getMatch()
    }
  }, [user, listing])

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
                <Paper className={classes.second}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Grid item xs container direction="row" spacing={1}>
                        <Grid item xs={12}>
                          <Typography className={classes.bold}>
                            Match Information
                          </Typography>
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
                            {moment.utc(match.matchedDate).format('MM/DD/YYYY')}
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.infoDisplay}>Description/Bio</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper className={classes.userInfo}>{matchedUser.description}{matchedUser.bio}</Paper>
                          <Paper className={classes.userInfo}>{listing.description}</Paper>
                        </Grid>
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