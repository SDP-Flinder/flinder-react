import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { useAuth } from "../App/Authentication";
import Navigation from "../App/Navigation";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Home() {
  const classes = useStyles();
  const { user } = useAuth();
  const [bio, setBio] = useState('');

  const renderBio = () => {
    if (user.role === 'flatee') {
      return (
        <div>
          <Typography component="h1" variant="b1" color="inherit" className={classes.title}>
            {`Bio: ${bio}`}
          </Typography>
          <Button
            className="button"
            component={RouterLink}
            to="/addbio"
          >
            Edit Bio
          </Button>
        </div>
      )
    }
  }

  useEffect(() => setBio(user.bio),[bio, user])

  return (
    <>
      <Navigation />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {`Hello ${user.firstName} ${user.lastName}`}
        </Typography>
        {/* User should only be able to access this page when authorised, but just incase. Could remove check */}
        <br />
        {renderBio()}
      </div>
    </>
  );
};