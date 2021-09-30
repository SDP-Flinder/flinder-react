import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
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

export default function Match(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [matches, setMatches] = useState([]);

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
    var URL = 'http://localhost:4000/listings/'.concat(match.listingID);

    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    };

    const listing = await axios.get(URL, config);

    URL = 'http://localhost:4000/users/'.concat(listing.data.flat_id);

    const matchedUser = axios.get(URL, config);

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
      const URL = 'http://localhost:4000/listings/flat/'.concat(user.id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const listings = await axios.get(URL, config);

      const listingList = listings.data;

      listingList.forEach(listing => {
        getListingMatches(listing);
      })
    }

    async function getListingMatches(listing) {
      const URL = 'http://localhost:4000/matches/getSuccessMatchesForListing';

      const config = {
        params: { listingID: listing.id },
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const tempMatches = await axios.get(URL, config);

      tempMatches.data.forEach(match => {
        setMatches(matches => [...matches, match])
      })
    }

    async function getFlateeMatches() {
      const URL = 'http://localhost:4000/matches/getSuccessMatchesForFlatee';

      const config = {
        params: { flateeUsername: user.username },
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const tempMatches = await axios.get(URL, config);

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