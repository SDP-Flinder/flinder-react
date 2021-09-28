import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
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

//Renders profile info for a flat account
export default function FlatProfile() {
  const classes = useStyles();
  const { user } = useAuth();

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
          {`Address: ${user.address.street}, ${user.address.suburb}, ${user.address.city}`}
        </Typography>
        <Typography component="b1" variant="b1" color="inherit" className={classes.title}>
          {`Flat Description: ${user.description}`}
        </Typography>
      </div>
    </>
  );
};