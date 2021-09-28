import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core";

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

//Renders profile info for a flatee account
export default function FlateeProfile() {
  const classes = useStyles();
  const { user } = useAuth();
  const [bio, setBio] = useState('');

  useEffect(() => setBio(user.bio), [user.bio])

  return (
    <>
      <CssBaseline />
      <Navigation />
      <div className={classes.paper}>
        <Typography component="h4" variant="h5" color="inherit" noWrap className={classes.title}>
          {`Username: ${user.username}`}
        </Typography>
        <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.title}>
          {`Full Name: ${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.title}>
          {`Couple: ${user.checklist.isCouple}`}
        </Typography>
        <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.title}>
          {`Smoker: ${user.checklist.isSmoker}`}
        </Typography>
        <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.title}>
          {`Pets: ${user.checklist.hasPet}`}
        </Typography>
        <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.title}>
          {`Price Range: ${user.checklist.priceRange.min} - ${user.checklist.priceRange.max}`}
        </Typography>
        <Typography component="b1" variant="b1" color="inherit" className={classes.title}>
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
    </>
  );
};