import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, Toolbar, Drawer, IconButton, ListItemText } from "@mui/material";
import { useAuth } from "../App/Authentication";
import axios from "axios";
import { Config } from "../../config";
import { ListSubheader } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

export default function SideBar(props) {
    const { user, jwt } = useAuth();
    const [matches, setMatches] = useState([]);
    const test = [{
        flateeUsername: "flateeUsername",
        listingID: "listingID",

    }]

    //Helper for ease of use when making axios calls
    const instance = axios.create({
        baseURL: Config.Local_API_URL,
        timeout: 1000,
        headers: { Authorization: `Bearer ${jwt}` }
    })

    //Render a set of buttons for each match loaded into the global state, depending on the role of the signed in account
  const renderListItems = () => {
    let count = 0;
    matches.sort((a, b) => a.matchedDate < b.matchedDate ? 1 : -1)
    console.log(matches);
    if (matches.length === 0) {
      return (
        <ListSubheader component="div" id="nested-list-subheader">
          You currently have no matches
        </ListSubheader>
      )
    }
    else {
      return matches.map((match) => (
        <ListItem button key={++count}>
            <ListItemText primary={user.role == 'flat' ? match.flateeUsername : 
                  (match.listingUsername == undefined ? `#${match.listingID.slice(-3)}`
                  : match.listingUsername)} 
            />
      </ListItem>
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
        if(!matches.find(m => m.listingUsername === match.listingUsername)) {
            setMatches(matches => [...matches, match])
        }
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
          // Only add one instance of match user 
          if(!matches.find(m => m.flateeUsername === match.flateeUsername)) {
            setMatches(matches => [...matches, match])
        }
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
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
        
        {matches.map((match, count) => (
        <ListItem button key={++count}>
            <ListItemText primary={user.role == 'flat' ? match.flateeUsername : 
                  (match.listingUsername == undefined ? `#${match.listingID.slice(-3)}`
                  : match.listingUsername)} 
            />
      </ListItem>
      ))}
        </List>
      </Drawer>
  );
};