import React, { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {ReactComponent as FlinderLogo} from '../../../assets/logo-white.svg';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Settings from '@mui/icons-material/Settings';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Authentication';
import { Avatar, Button, Divider, ListItemIcon, Tooltip, Typography} from '@mui/material';
import { Config } from '../../../config';


export default function Navigation() {
  const [nAnchorEl, setNAnchorEl] = React.useState(null);
  const [pAnchorEl, setPAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isNotificationMenuOpen = Boolean(nAnchorEl);
  const isProfileMenuOpen = Boolean(pAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user, jwt } = useAuth();

  // API helper
  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

  const handleProfileMenuOpen = (event) => {
    setPAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setPAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationMenuClose = () => {
    setNAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const profileMenuId = 'primary-search-account-menu';
  const renderProfileMenu = (
    <Menu
        anchorEl={pAnchorEl}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>

        <MenuItem>
          <Avatar /> My listings
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another listing
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
  );

  const notificationMenuId = 'primary-search-notification-menu';
  const renderNotificationMenu = (
    <Menu
      anchorEl={nAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
    >
      <MenuItem onClick={handleNotificationMenuClose}>Notification Test</MenuItem>
      <MenuItem onClick={handleNotificationMenuClose}>Notification Test</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    // Retrieve Notifications from API
    var tempNotification = [];
    async function getNotifications() {
      await instance.get('/notification')
        .then(res => {
          tempNotification = res.data
        });
        tempNotification.forEach(notification => {
          notifications.push(<MenuItem>{notification.message}</MenuItem>);
      })
    }

  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            component={Link}
            to="/" 
            edge="start"
          >
              <FlinderLogo className ="small-logo"/>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleNotificationMenuOpen} size="small" sx={{ ml: 2 }}>
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account settings">
              <IconButton onClick={handleProfileMenuOpen} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          {/* <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
          </MenuItem> */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              aria-controls={notificationMenuId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
      {renderNotificationMenu}
    </>
  );
}
