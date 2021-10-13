import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Config } from '../../config';
import { Grid } from "@material-ui/core";
import { Grow } from "@material-ui/core";

//Set the styles to be used on the page
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  matchIcon: {
    marginLeft: 20,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    width: 170,
    height: 160,
    borderRadius: 20,
    //backgroundColor: "#FFC745",
    border: "1px solid #007A78",
  },
  avt: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  title: {
    padding: 10,
    marginLeft: 10,
  },
  info: {
    marginBottom: 10
  }
}))

const checked = true;

//Class for displaying a list of buttons for each successful match on an account
export default function Match(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [matches, setMatches] = useState([]);

  //Helper for ease of use when making axios calls
  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

  //Render a set of buttons for each match loaded into the global state, depending on the role of the signed in account
  const renderButtons = () => {
    let count = 0;
    matches.sort((a, b) => a.matchedDate < b.matchedDate ? 1 : -1)
    if (matches.length === 0) {
      return (
        <Typography component="h3" variant="h6" color="inherit" noWrap className={classes.title}>
          No matches yet
        </Typography>
      )
    }
    else if (user.role === 'flat') {
      return matches.map((match) => (
        <div key={++count}>
        <Grow
          in={checked}
        >
          <Grid className = {classes.matchIcon} container item xs = {12} direction = "row" >
            <Grid item>
              <img src = "https://forums.terraria.org/data/avatars/l/128/128493.jpg?1550988870"
              className = {classes.avt}/>
            </Grid>

            <Grid>
              <Typography variant = "body1" className = {classes.info}>
                  {match.flateeUsername}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color = "primary"
                onClick={function () { selectMatch(match) }}
              >
                <Typography variant = "caption">
                View
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grow>
        <br/>
        <br/>
        </div>
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

  //Method to get the username of the matched flat account
  //Currently bugged, some of the code is present for debugging efforts
  const getFlatUsername = async (match) => {
    var matchedUser = [];
    await instance.get('/listings/flatAccount/'.concat(match.listingID))
      .then(res => {
        matchedUser = res.data
      });
    console.log(matchedUser);
    return matchedUser.username;
  }

  //Method for handling the buttons' onclick function, for the correct match
  const selectMatch = (match) => {
    props.history.push({
      pathname: '/match/details',
      state: { match: match },
    });
  }

  //Load and set all the states with data from the database
  useEffect(() => {
    var tempMatches = [];
    //Fetches all listings for the signed in flat account, to then be used to fetch their matches
    async function getListings() {
      var listings = [];
      await instance.get('/listings/flat/'.concat(user.id))
        .then(res => {
          listings = res.data
        });
      const listingList = listings;
      listingList.forEach(listing => {
        getListingMatches(listing);
      })
    }

    //Fetches all successful matches for a given listing
    async function getListingMatches(listing) {
      await instance.get('/matches/getSuccessMatchesForListing/'.concat(listing.id))
        .then(res => {
          tempMatches = res.data
        });
      tempMatches.forEach(match => {
        setMatches(matches => [...matches, match])
      })
    }

    //Fetches all successful matches for the signed in flatee
    async function getFlateeMatches() {
      await instance.get('/matches/getSuccessMatchesForFlatee/'.concat(user.id))
        .then(res => {
          tempMatches = res.data
        });
      // setMatches(tempMatches);
      tempMatches.forEach(match => {
        setMatches(matches => [...matches, match])
        //This is here for debugging purposes
        getFlatUsername(match)
      })
    }

    //Run the code to fetch the correct data, based on the role of the account
    if (user && user.role === 'flat') {
      getListings()
    }
    else if (user && user.role === 'flatee') {
      getFlateeMatches()
    }
  }, [user])

  //Simple display of the match list buttons
  return (
    <>
      <Navigation />
      <div className={classes.paper}>
        <br />
        <Typography component="h1" variant="h5" color="inherit" noWrap className = {classes.title}>
          Your Matches
        </Typography>
        <br />
        <Grid container spacing = {1}>
        {renderButtons()}
        </Grid>
      </div>
    </>
  );
};