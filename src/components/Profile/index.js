import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import FlateeProfile from "./FlateeProfile";
import FlatProfile from "./FlatProfile";
import '../../style/global.css';

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

export default function Profile() {
  const classes = useStyles();
  const { user } = useAuth();

  //Check what type of user is signed in, then render the corresponding profile display
  const renderProfile = () => {
    if (user.role === 'flatee') {
      return (
        <FlateeProfile></FlateeProfile>
      )
    }
    else if (user.role === 'flat') {
      return (
        <FlatProfile></FlatProfile>
      )
    }
  }

  return (
    <>
      <Navigation />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Profile
        </Typography>
        {renderProfile()}
      </div>
    </>
  );
};

