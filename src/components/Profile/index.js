import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Navigation from "../App/Navigation";
import '../../style/global.css';
import ProfileDisplay from "./Profile";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(7),
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Profile() {
  const classes = useStyles();

  return (
    <>
      <Navigation pageName = "Profile"/>
      <div className={classes.paper}>
              <ProfileDisplay/>
      </div>
    </>
  );
};