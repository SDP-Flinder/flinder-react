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
import Paper from "@material-ui/core/Paper";

//Set the styles to be used on the page
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  parentPaper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1600
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
    marginBottom: 10,
  },
}))

const checked = true;

//Class for displaying a list of buttons for each successful match on an account
export default function Match(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [matches, setMatches] = useState([]);
  let photoDisplay = "http://localhost:4000/";

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
    else {
      return matches.map((match) => (
        <div key={++count}>
          <Grow
            in={checked}
          >
            <Grid className={classes.matchIcon} container item xs={12} direction="row" >
              <Grid item>
                <img src={photoDisplay.concat(match.photo)}
                  className={classes.avt} />
              </Grid>

              <Grid>
                <Typography variant="body1" className={classes.info}>
                  {user.role == 'flat' ? match.flateeUsername : match.listingUsername}
                </Typography>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={function () { selectMatch(match) }}
                >
                  <Typography variant="caption">
                    View
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grow>
          <br />
          <br />
        </div>
      ))
    }
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
        }).catch((error) => {
          console.log('error ' + error)
        });
      listings.forEach(listing => {
        getListingMatches(listing);
      })
    }

    //Fetches all successful matches for a given listing
    async function getListingMatches(listing) {
      await instance.get('/matches/getSuccessMatchesForListing/'.concat(listing.id))
        .then(res => {
          tempMatches = res.data
        }).catch((error) => {
          console.log('error ' + error)
        });
      tempMatches.forEach(match => {
        getPhoto(match)
        setMatches(matches => [...matches, match])
      })
    }

    //Fetches all successful matches for the signed in flatee
    async function getFlateeMatches() {
      await instance.get('/matches/getSuccessMatchesForFlatee/'.concat(user.id))
        .then(res => {
          tempMatches = res.data
        }).catch((error) => {
          console.log('error ' + error);
        });
        tempMatches.forEach(match => {
          getPhoto(match)
          setMatches(matches => [...matches, match])
        })
    }

    //Fetches and adds the flatee or listing photo to the match object, for display on the matchlist
    async function getPhoto(match) {
      let param = ''
      if (user.role === 'flat') {
        param = '/users/'.concat(match.flateeID)
      } else {
        param = '/listings/'.concat(match.listingID)
      }
      await instance.get(param)
        .then(res => {
          Object.assign(match, { photo: res.data.photo })
        }).catch((error) => {
          console.log('error ' + error)
        });
    }

    //Run the code to fetch the correct data, based on the role of the account
    if (user && user.role === 'flat') {
      getListings()
    }
    else if (user && user.role === 'flatee') {
      getFlateeMatches()
    }
  }, [user])

  useEffect(() => {
    console.log(matches);
  }, [matches])

  //Simple display of the match list buttons
  return (
    <div className={classes.root}>
      <Navigation />
      <Paper className={classes.parentPaper}>
        <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
          Your Matches
        </Typography>
        <br />
        <Grid container spacing={1}>
          {renderButtons()}
        </Grid>
      </Paper>
    </div>
  );
};