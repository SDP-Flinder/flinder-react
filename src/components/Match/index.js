import React, { useEffect, useState, useRef } from "react";
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Message from './Message';
import { AppBar, Toolbar, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { styled, alpha } from "@mui/system";
import { InputBase } from "@mui/material";
import { io } from "socket.io-client";

const drawerWidth = 240;

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

const MessageInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  //backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
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
export default function Match(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

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
        <>
          <ListItem key={++count} disablePadding alignItems="flex-start" onClick={function () { selectMatch(match) }}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://forums.terraria.org/data/avatars/l/128/128493.jpg?1550988870" />
              </ListItemAvatar>
              <ListItemText
                primary={user.role == 'flat' ? match.flateeUsername : match.listingUsername}
              />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))
    }
  }

  const renderMessages = () => {
    let count = 0;
    if (messages.length === 0) {
      return (
        <Typography component="h3" variant="h6" color="inherit" noWrap className={classes.title}>
          No Messages yet
        </Typography>
      )
    }
    else {
      return messages.map((m) => (
        <div key={m.id} ref={scrollRef}>
          <Message message={m} own={m.sender === user._id} />
        </div>
      ))
    }
  }

  //Method for handling the buttons' onclick function, for the correct match
  const selectMatch = (match) => {
    // props.history.push({
    //   pathname: '/match/details',
    //   state: { match: match },
    // });
    setCurrentMatch(match)
  }

  // Setup socket
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
      (currentMatch?.id === arrivalMessage.matchId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentMatch]);

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
          console.log('error ' + error);
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
          console.log('error ' + error);
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
        }).catch((error) => {
          console.log('error ' + error);
        });
      setMatches(tempMatches);
    }

    //Run the code to fetch the correct data, based on the role of the account
    if (user && user.role === 'flat') {
      getListings()
    }
    else if (user && user.role === 'flatee') {
      getFlateeMatches()
    }
  }, [user])


  // Load messages for current chat thread
  useEffect(() => {
    if(currentMatch && currentMatch !== null) {
      instance.get(`/match/messages/${currentMatch.id}`)
      .then((res) => {
        setMessages(res.data);
      })
    }
  }, [currentMatch
]);

  // Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      matchId: currentMatch.id,
      sender: user.id,
      text: newMessage
    };

    // Find receiver's ID
    let receiverId;
    if (currentMatch && user !== null) {
      instance.get(`/match/${currentMatch.id}`)
      .then((res) => {
        if(user.role === Role.Flat) {
          receiverId = res.data.listingId
        } else if(user.role === Role.Flatee){
          receiverId = res.data.flateeId;
        }
      })
    }

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    // Add Message to DB
    instance.post(`/match/message/${currentMatch.id}`, message)
    .then((res) => {
      setMessages([...messages, res.data]);
      setNewMessage("");
    })
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Simple display of the match list buttons
  return (
    <Container component="main" maxWidth="lg">
      <Navigation />
      <CssBaseline />
      <Grid container spacing={2}>
  <Grid item xs={4}>
  <Paper className={classes.parentPaper}>
          <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
            Your Matches
          </Typography>
          <br />
          <Grid container spacing={1}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {renderButtons()}
            </List>
          </Grid>
      </Paper>
  </Grid>
  <Grid item xs={8}>
  <Paper className={classes.parentPaper}>
  <Container maxWidth="sm">
  {currentMatch ? (
        // Messages
        <>
            {/* Messages */}
            <div className="chatBoxTop">
              {renderMessages()}
            </div>
            
            {/* Bottom Message Bar */}
            {/* <AppBar
              position="fixed"
              sx={{ top: 'auto', bottom: 0, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
              <Toolbar>
                <MessageInput>
                  <StyledInputBase
                    className="chatMessageInput"
                    placeholder="Message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage} />
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
            </AppBar> */}
            </>
      ) : (
        <Typography variant="h6" className="noConversationText" component="span">
          Open a match to start a chat.
        </Typography>
      )}
      </Container>
    </Paper>
  </Grid>
</Grid>
      
    </Container>
  );
};