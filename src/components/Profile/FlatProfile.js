import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
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

//Renders profile info for a flat account
export default function FlatProfile() {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h2" variant="h4" color="inherit" noWrap className={classes.title}>
            {`Username: ${user.username}`}
          </Typography>
          <br />
          <Typography component="h3" variant="h5" color="inherit" noWrap className={classes.title}>
            {`Full Name: ${user.firstName} ${user.lastName}`}
          </Typography>
          <br />
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {`Address: ${user.address.street}, ${user.address.suburb}, ${user.address.city}`}
          </Typography>
          <br />
          <Typography component="h4" variant="body1" color="inherit" className={classes.title}>
            {`Flat Description: ${user.description}`}
          </Typography>
        </div>
      </Container>
    </>
  );
};