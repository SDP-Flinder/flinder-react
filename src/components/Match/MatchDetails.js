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

export default function MatchDetails() {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const location = useLocation();
  const match = location.state.match;
  const [matchedUser, setMatchedUser] = useState([]);

  useEffect(() => {
    async function getMatch() {
      let URL = '';
      if (user.role === 'flat') {
        // needs to be reworked to get info on matched flatee
        URL = 'http://localhost:4000/users/'.concat(user.id);
      }
      else if (user.role === 'flatee') {
        URL = 'http://localhost:4000/listings/'.concat(match.listingID);
      }

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      };

      let tempMatch = await axios.get(URL, config);

      console.log(tempMatch.data)

      if (user.role === 'flatee') {
        URL = 'http://localhost:4000/users/'.concat(tempMatch.data.flat_id);
      }

      tempMatch = await axios.get(URL, config);

      console.log(tempMatch.data)

      setMatchedUser(tempMatch.data);
    }

    if (user !== null && match !== null) {
      getMatch()
    }
  }, [user, jwt])

  return (
    <div className={classes.root}>
    <Navigation pageName = "Match"/>
    <br/><br/><br/>
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