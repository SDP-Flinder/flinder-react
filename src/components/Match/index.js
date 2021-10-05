import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import BottomNav from '../App/Navigation/BottomNav';
import axios from 'axios';
import {Config} from '../../config';

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

export default function Match(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [matches, setMatches] = useState([]);

  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

  const renderButtons = () => {
    let count = 0;
    if (user.role === 'flat') {
      return matches.map((match) => (
        <Button
          className="button"
          variant="contained"
          key={++count}
          onClick={function () { selectMatch(match) }}
        >
          {match.flateeUsername}
        </Button>
      ))
    }
    else if (user.role === 'flatee') {
      return matches.map((match) => (
        <Button
          className="button"
          variant="contained"
          key={++count}
          onClick={function () { selectMatch(match) }}
        >
          {/* {getFlatUsername(match)} */}
          {match.listingID}
        </Button>
      ))
    }
  }

  const getFlatUsername = async(match) => {
    const matchedUser = await instance.get('/listings/flatAccount/'.concat(match.listingID));

    return matchedUser.data.username;
  }

  const selectMatch = (match) => {
    props.history.push({
      pathname: '/match/details',
      state: { match: match },
    });
  }

  useEffect(() => {
    async function getListings() {
      const listings = await instance.get('/listings/flat/'.concat(user.id));

      const listingList = listings.data;

      listingList.forEach(listing => {
        getListingMatches(listing);
      })
    }

    async function getListingMatches(listing) {
      const tempMatches = await instance.get('/matches/getSuccessMatchesForListing/'.concat(listing.id));

      tempMatches.data.forEach(match => {
        setMatches(matches => [...matches, match])
      })
    }

    async function getFlateeMatches() {
      const tempMatches = await instance.get('/matches/getSuccessMatchesForFlatee/'.concat(user.id));

      console.log(typeof tempMatches.data)

      console.log(tempMatches.data[0].listingID);

      // setMatches(tempMatches.data);
      tempMatches.data.forEach(match => {
        setMatches(matches => [...matches, match])
      })
    }

    if (user !== null && user.role === 'flat') {
      getListings()
    }
    else if (user !== null && user.role === 'flatee') {
      getFlateeMatches()
    }
  }, [user, jwt])

  return (
    <>
      <Navigation />
      <div className={classes.paper}>
        <br />
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          This is the match page for {user.firstName}
        </Typography>
        <br />
        {renderButtons()}
      </div>
    </>
  );
};