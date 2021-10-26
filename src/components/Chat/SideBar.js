import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, Toolbar, Drawer, IconButton, ListItemText, Avatar } from "@mui/material";
import { Role, useAuth } from "../App/Authentication";
import axios from "axios";
import { Config } from "../../config";
import { ListSubheader } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import { deepOrange, deepPurple } from '@mui/material/colors';

const drawerWidth = 240;

export default function SideBar({props, setCurrentChatThread, chatThreads, setChatThreads}) {
    const { user, jwt } = useAuth();
    const [matches, setMatches] = useState([]);


    //Helper for ease of use when making axios calls
    const instance = axios.create({
        baseURL: Config.Local_API_URL,
        timeout: 10000,
        headers: { Authorization: `Bearer ${jwt}` }
    })



  async function addNewChat(matchId) {
    console.log('Add new chat for match: ' + matchId);
    instance.post('/match/', {matchId: matchId, messages: []})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err)
    })
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
      console.log('getListingMatches for listing: ' + listing.id);
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

      //Render a set of buttons for each match loaded into the global state, depending on the role of the signed in account
  async function getChatThreads() {
    //Run the code to fetch the correct data, based on the role of the account
    if (user && user.role === Role.Flat) {
      getListings()
    }
    else if (user && user.role === Role.Flatee) {
      getFlateeMatches()
    }

    let count = 0;
    matches.sort((a, b) => a.matchedDate < b.matchedDate ? 1 : -1)
    console.log('No. of Matches: ' + matches.length);
    if (matches.length > 0) {
      const listItems = '';
      matches.map( async(match) =>  {
        console.log(match);
        const name = '';
        if(match && match !== null) {
          

          // Get or create chat object
          console.log('Getting chat for match: ' + match.id);
          if (match.messages && match.messages !== null) {
            setChatThreads([...chatThreads, match.messages]);
          } else {
            // Create new Chat
            const newChat = addNewChat(match.id);
            if(newChat && newChat !== null)
              setChatThreads([...chatThreads, newChat])
          }
        }
      })
    }
  }

  getChatThreads()
  }, [user])

  async function getMatchName(matchId) {
    const name = 'Unknown';
    // Get User's Name
    console.log('Getting name for match: ' + match.id);
    // If user is a flatee get the flat accounts details
    if(user.role === Role.Flatee) {
      // Get Flat user's account 
      instance.get(`/listings/flatAccount/${match.listingID}`)
      .then((resp) => {
        const matchee = resp.data;
        console.log('matchee: ')
        console.log(matchee)
        name = matchee.firstName + ' ' + matchee.lastName; 
      })
      .catch((err) => {
        console.log(err)
      })
    // If user is a flat get the flatee accounts details
    } else if (user.role === Role.Flat){
      instance.get(`/users/${match.flateeID}`)
      .then((resp) => {
        const matchee = resp.data;
        console.log('matchee: ')
        console.log(matchee)
        name = matchee.firstName + ' ' + matchee.lastName; 
      })
      .catch((err) => {
        console.log(err)
      })
    }
    console.log('name: ' + name);
    return name;
  }
  

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
        {chatThreads !== null ? (
          <List>
            {chatThreads.map((chat) => {
              <ListItem button key={chat.id} onClick={() => setCurrentChatThread(chat)}>
              <Avatar sx={{ bgcolor: deepOrange[500]} }>M</Avatar>
              <ListItemText primary={getMatchName}/>
            </ListItem>
            })}
          </List>
        ) : (
          <ListSubheader component="div" id="nested-list-subheader">
          You currently have no matches
        </ListSubheader>
        )}
      </Drawer>
  );
};