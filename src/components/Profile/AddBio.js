import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App/Authentication';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import "../../style/global.css";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddBio(props) {
  const classes = useStyles();
  const { user, jwt } = useAuth();
  const [bio, setBio] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addUserBio();
    props.history.push('/');
  }

  //Axios method to update the user file in the DB
  const addUserBio = async () => {
    const URL = 'http://localhost:4000/users/'.concat(user.id)

    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    };

    console.log(jwt);
    console.log(user.id);

    const bodyParameters = {
      bio: bio,
    };

    axios.put(URL, bodyParameters, config);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Bio
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <div>
              <FormControl>
                <TextField className="input"
                  label="Bio"
                  multiline
                  maxRows={3}
                  minRows={3}
                  inputProps={{ maxLength: 256 }}
                  autoFocus
                  required
                  value={bio}
                  onChange={(e) => { setBio(e.target.value) }}
                  variant="outlined"
                />
              </FormControl>
            </div>
            <br /><br /><br /><br />
            <ButtonGroup variant="contained" color="primary">
              <Button
                className="button"
                type="submit"
              >
                Accept
              </Button>
              <Button 
              className="button"
                component={RouterLink}
                to="/"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AddBio;