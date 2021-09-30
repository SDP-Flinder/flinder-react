import React, { useEffect, useState } from 'react';
// import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import { Role, useAuth } from '../App/Authentication';
import axios from 'axios';


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
}));

function MatchList(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({ name: '', age: 0, key: 0 });

  // const listingID = '6141abba9a0320596c17bc57'; // RETRIEVE LISTING ID
  // let matchparam = {
  //     listingID: listingID,
  // };

  // const getMatches = async () => {
  //     matchList();

  //     const URL = 'http://localhost:4000/matches/getSuccessMatches'
  //     const USER_TOKEN = TOKEN;

  //     axios.get(URL, { headers: { Authorization: `Bearer ${USER_TOKEN}` } })
  //         .then(res => console.log(res.data));
  // }

  const renderButtons = () => {
    let count = 0;
    if (user.role === 'flat') {
      return matches.map((match) => (
        <Button
          className="button"
          variant="contained"
          key={++count}
          onClick={function () { selectMatch(match.id) }}
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
          onClick={function () { selectMatch(match.id) }}
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

      const matchedUser = await axios.get(URL, config);

      return matchedUser.data.username;
  }

  const selectMatch = (id) => {
    matches.forEach(match => {
      if (match.id === id) {
        props.history.push({
          pathname: '/match',
          state: { match: match },
        });
        return;
      }
    })
    console.log(id);
  }

  useEffect(() => {
    async function getListings() {
      const URL = 'http://localhost:4000/listings/flat/'.concat(user.id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const listings = await axios.get(URL, config);

      const listingList = listings.data;
      console.log(listingList);

      listingList.forEach(listing => {
        getListingMatches(listing);
      })
      console.log(matches);
    }

    async function getListingMatches(listing) {
      const URL = 'http://localhost:4000/matches/getSuccessMatchesForListing';

      console.log(listing.id)

      const config = {
        params: { listingID: listing.id },
        headers: { Authorization: `Bearer ${jwt}` }
      };

      const tempMatches = await axios.get(URL, config);

      console.log(tempMatches.data);

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

      console.log(tempMatches.data);

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

    console.log(matches);
  }, [user, jwt])



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Typography component="h1" variant="h5">
          Pending Matches
        </Typography> */}
        <br />
        {renderButtons()}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default MatchList;