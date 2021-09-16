import React, { useState } from 'react';
import {Avatar, Button, Container, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Config } from '../../../config'
import { useAuth } from "../../App/Authentication";
import { MemoryRouter as Router } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={`${Config.AppURL}`}>
        {`${Config.AppName}`}
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


const Login = ({ location }) => {
  const classes = useStyles();
  const { signin, isAuthed } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  // Reditect to previous page or home page
  let { from } = location.state || { from: { pathname: "/" } };

  const handleLogin = (e) => {
    e.preventDefault();
    signin(username, password, remember)
      .then((res) => {
        console.log(res?.message)
        // if (res.status === 400){ //incorrect username or password
        if (res?.error || res?.message) { //TODO: Display correct error message
          // setError(res?.error || res?.message);
          setError('Username or password incorrect')
        }
      })
      .catch((error) => {
        console.log(error)
        //   setError(error?.error);
      });
  };

  const handleCheckBoxChange = (event) => {
    setRemember(event.target.checked);
  };

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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            type="username"
            name="username"
            value={username}
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error">{error}</Alert>
          )}

          <FormControlLabel
            control={<Checkbox 
              name="rememberme"
              value="remember" 
              color="primary" 
              checked={remember}
              onChange={handleCheckBoxChange}
            />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => handleLogin(e)}
          >
            Sign In
          </Button>

          <Grid container>
            <Router>
              <Grid item xs>
                <Link component={RouterLink} to="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/register" variant="body2">
                  Don't have an account? Sign Up
                </RouterLink>
                {/* <RouterLink to="/register">
                      I don't have an account
                    </RouterLink> */}

              </Grid>
            </Router>
          </Grid>
            
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}

export default Login;