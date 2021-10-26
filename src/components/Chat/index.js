import React, { useEffect, useRef, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Navigation from "../App/Navigation";
import { Box } from "@mui/system";
import { Divider, List, ListItem, Toolbar, Typography, Drawer, IconButton, ListItemText, Avatar } from "@mui/material";
import SideBar from "./SideBar";
import ChatThread from "./ChatThread"; 
import { AppBar, CssBaseline } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { ListSubheader } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Role, useAuth } from "../App/Authentication";
import BottomNav from "../App/Navigation/BottomNav";
import Message from "./Message";
import { io } from "socket.io-client";

import "../../style/chat.css";
import "../../style/thread.css";
import axios from "axios";
import { Config } from "../../config";

const drawerWidth = 240;

const MessageInput = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '70ch',
        '&:focus': {
          width: '74ch',
        },
      },
    },
  }));

//Class for displaying a list of buttons for each successful match on an account
export default function Chat() {
  const [matches, setMatches] = useState([]);
  const [currentMatchID, setCurrentMatchID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user, jwt } = useAuth();
  const scrollRef = useRef();

  //Helper for ease of use when making axios calls
  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

   //Render a set of buttons for each match loaded into the global state, depending on the role of the signed in account
   const renderDrawerContents = () => {
    let count = 0;
    matches.sort((a, b) => a.matchedDate < b.matchedDate ? 1 : -1)
    if (matches.length === 0) {
      return (
        <ListSubheader component="div" id="nested-list-subheader">
          You currently have no matches
        </ListSubheader>
      )
    }
    else {
      return matches.map((match) => (
        <ListItem button key={match.id} onClick={() => setCurrentMatchID(match.id)}>
          <Avatar sx={{ bgcolor: deepOrange[500]} }>M</Avatar>
          <ListItemText primary={(user && user.role === Role.Flatee ? (match.flateeUsername) : (match.listingUsername))}/>
        </ListItem>
      ))
    }
  }

 // Setup and receive messages
 useEffect(() => {
  socket.current = io("ws://localhost:8900");
  socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      chatId: data.chatId,
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, []);

// Process Arriving Messages
useEffect(() => {
  arrivalMessage && 
    (currentMatchID === arrivalMessage.matchId) &&
    setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage, currentMatchID]);


useEffect(() => {
  socket.current.emit("addUser", user.id);
}, [user]);

// Load messages for current chat thread
useEffect(() => {
  if(currentMatchID != null) {
    instance.get(`/match/messages/${currentMatchID}`)
    .then((res) => {
      setMessages(res.data);
    })
  }
}, [currentMatchID]);

// Send Message
const handleSubmit = async (e) => {
  e.preventDefault();
  const message = {
    matchId: currentMatchID,
    sender: user.id,
    text: newMessage
  };

  // Find receiver's ID
  let receiverId;
  if (currentMatchID && user !== null) {
    instance.get(`/match/${currentMatchID}`)
    .then((res) => {
      if(user.role === Role.Flat) {
        receiverId = res.data.listingId
      } else if(user.role === Role.Flatee){
        receiverId = res.data.flateeId;
      }
    })
  }

  // Send web socket message
  socket.current.emit("sendMessage", {
    senderId: user.id,
    receiverId,
    text: newMessage,
  });

  // Add Message to DB
  instance.post(`/match/message/${currentMatchID}`, message)
  .then((res) => {
    setMessages([...messages, res.data]);
    setNewMessage("");
  })
};

// Move to bottom (newest messages)
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

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
    })
  }

  //Run the code to fetch the correct data, based on the role of the account
  if (user && user.role === Role.Flat) {
    getListings()
  }
  else if (user && user.role === Role.Flatee) {
    getFlateeMatches()
  }
}, [user])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navigation />
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
            {renderDrawerContents()}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {currentMatchID ? (
        // Messages
        <> 
            {/* Messages */}
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div key={m.id} ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id} />
                </div>
              ))}
            </div>
            
            {/* Bottom Message Bar */}
            <AppBar
              position="fixed"
              sx={{ top: 'auto', bottom: 0, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
              <Toolbar>
                <MessageInput>
                  <StyledInputBase
                    className="chatMessageInput"
                    placeholder="Message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage} 
                    inputProps={{ 'aria-label': 'message' }}/>
                </MessageInput>
                <IconButton
                  size="large"
                  aria-label="send message"
                  color="inherit"
                  className="chatSubmitButton"
                  onClick={handleSubmit}
                >
                  <SendIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </> 
        ) : ( 
        <Typography variant="h3" className="noConversationText" component="span">
          Open a match to start a chat.
        </Typography>
      )} 
      </Box>
      <BottomNav />
    </Box>
  );
};