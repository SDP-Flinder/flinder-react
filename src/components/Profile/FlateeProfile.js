import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core";
import Container from '@material-ui/core/Container';

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h2" variant="h4" color="inherit" className={classes.title}>
            {`Username: ${user.username}`}
          </Typography>
          <br />
          <Typography component="h3" variant="h5" color="inherit" className={classes.title}>
            {`Full Name: ${user.firstName} ${user.lastName}`}
          </Typography>
          <br />
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {`Couple: ${user.checklist.isCouple}`}
          </Typography>
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {`Smoker: ${user.checklist.isSmoker}`}
          </Typography>
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {`Pets: ${user.checklist.hasPet}`}
          </Typography>
          <br />
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {`Price Range: $${user.checklist.priceRange.min} - $${user.checklist.priceRange.max}`}
          </Typography>
          <br />
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            Bio:
          </Typography>
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {user.bio}
          </Typography>
          <br />
          <Button
            className="button"
            component={RouterLink}
            to="/addbio"
          >
            Edit Bio
          </Button>
        </div>
      </Container>
    </>
  );
};