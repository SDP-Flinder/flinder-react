import React, { useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Navigation from "../App/Navigation";
import { Box } from "@mui/system";
import SideBar from "./SideBar";
import ChatThread from "./ChatThread"; 
import { AppBar } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

const drawerWidth = 240;

const Message = styled('div')(({ theme }) => ({
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
 
  //Simple display of the match list buttons
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Billy
          </Typography>
          <Tooltip title="Unmatch">
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                >
                <CancelIcon />
            </IconButton>
        </Tooltip>
            </Toolbar>
      </AppBar>
      <SideBar />
      <ChatThread />
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Message>
            <StyledInputBase
              placeholder="Message…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Message>
          <IconButton
              size="large"
              aria-label="send message"
              color="inherit"
            >
              <SendIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};