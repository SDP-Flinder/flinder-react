import React, { useEffect, useRef, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Navigation from "../App/Navigation";
import { Box } from "@mui/system";
import SideBar from "./SideBar";
import ChatThread from "./ChatThread"; 
import { AppBar, CssBaseline } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from "../App/Authentication";
import BottomNav from "../App/Navigation/BottomNav";
import Message from "./Message";
import { io } from "socket.io-client";

import "../../style/chat.css";
import "../../style/thread.css";

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
  const [chatThreads, setChatThreads] = useState([]);
  const [currentChatThread, setCurrentChatThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user, jwt } = useAuth();
  const scrollRef = useRef();

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
    (currentChatThread?.id === arrivalMessage.chatId) &&
    setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage, currentChatThread]);


useEffect(() => {
  socket.current.emit("addUser", user.id);
}, [user]);

// Load messages for current chat thread
useEffect(() => {
  if(currentChatThread != null) {
    api.getMessages(currentChatThread.id, jwt)
    .then((res) => {
      setMessages(res.data);
    })
  }
}, [currentChatThread]);

// Send Message
const handleSubmit = async (e) => {
  e.preventDefault();
  const message = {
    chatId: currentChatThread.id,
    sender: user.id,
    text: newMessage
  };

  // Find receiver's ID
  let receiverId;
  if (currentChatThread && user !== null) {
    api.getMatchById(currentChatThread.matchId)
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
  api.addMessageToChat(currentChatThread.id, jwt, message)
  .then((res) => {
    setMessages([...messages, res.data]);
    setNewMessage("");
  })
};

// Move to bottom (newest messages)
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navigation />
      <SideBar 
        chatThreads={chatThreads}
        setChatThreads={setChatThreads}
        setCurrentChatThread={setCurrentChatThread}
        />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {currentChatThread ? (
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