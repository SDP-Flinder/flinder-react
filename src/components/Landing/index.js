import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useAuth } from "../App/Authentication";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={Config.AppURL}>
        {Config.AppName}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));


/*
 * Future Feature: Should check whether a user is authenticatied 
 */
export default function Landing({ location }) {
  const classes = useStyles();
  const { signin, isAuthed } = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <>
    {isAuthed && <Redirect to={from} />}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to {Config.AppName}
        </Typography>
          <Button
            type="button"
            component={RouterLink} 
            to="/login" 
            variant="contained" 
            color="primary"
            fullWidth
            className={classes.button}
          >
            Sign In
          </Button>
          <Button
            type="button"
            component={RouterLink} 
            to="/register" 
            variant="contained" 
            color="primary"
            fullWidth
            className={classes.button}
          >
            Sign Up
          </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}