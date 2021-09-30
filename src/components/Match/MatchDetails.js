import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import BottomNav from '../App/Navigation/BottomNav';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

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
    <>
      <Navigation />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Its a match!
        </Typography>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {matchedUser.username}
        </Typography>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {matchedUser.firstName} {matchedUser.lastName}
        </Typography>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Matched on
        </Typography>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {match.matchedDate}
        </Typography>
      </div>
    </>
  );
};