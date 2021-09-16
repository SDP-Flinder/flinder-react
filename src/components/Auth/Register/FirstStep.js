import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel, Radio, RadioGroup, FormControlLabel, Grid, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


const FirstStep = (props) => {
  const {navigation} = props;
  //This useState is used to store data from the API
  const [repo, setRepo] = useState([]);

  //Get the user props from the parent component
  const {user} = props;

  //Fetch authorised data from the API with token
  const getRepo = async () => {
    //Retrive the token
    let token = await FetchToken();

    await FetchUserData(token, setRepo);
  }

  //Set the data in the local state
  useEffect(()=>getRepo(), []);

  const { handleSubmit } = useForm({});

  //Update the user information
  const setForm = (field, value) => {
      props.updateUser({[field]: value});
  }

  //Catch any errors
  const [error, setError] = useState({});
  const findErrors = () => {

    //Deconstruct the user object
    const {username, password, email, accountType} = user;
    //This is to store new errors arising
    const foundError = {};
    //Fetch user from the database
    const userExist = checkUser(username,email);

    //Username constraints
    usernameCheck(username, foundError, userExist);
    
    //Email constraints
    emailCheck(email, foundError, userExist);
    
    //Password constraints
    passwordCheck(password, foundError);

    if(!accountType || accountType == ''){
      foundError.accountType = 'Choose one';
    }

    return foundError;
  }

  //Check if the username or email exists in the database
  const checkUser = (username, email) => {
    let userExist = {};

    for(let k = 0; k < repo.length; k++){
      if(repo[k].username == username){
        userExist.username = 'username';
      }
      
      if(repo[k].email == email){
        userExist.email = 'email';
      }
    }
    return userExist;
  }

  const onSubmit = () => {
    //Find any new errors in the form
    const newError = findErrors();
    console.log(newError);
    if(Object.keys(newError).length > 0){
      //Found errors and set the errors to the useState
      setError(newError);
    } else 
    {
      //For debugging
      console.log(props.user);
      //Redirect to the correct route
      if(user.accountType == 'flat'){
        navigation.go("flat-information");
      }else if(user.accountType == 'flatee'){ 
        navigation.go("flat-information");
      }else if(user.accountType ==''){
          alert('Choose one bitch!');
      }
    }
  }

  return (
    <div>
       <Typography component="h3">
          Sign Up to find your new home
       </Typography>
       <br />
       <form onSubmit={handleSubmit(onSubmit)}>

        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing = {2}
        >
       <Grid item>
       <FormControl>
          <TextField className = "input"
          label = "Username"
          variant="outlined"
          name = "user.username"
          value ={user.username}
          autoFocus
          required
          onChange = {e => setForm('username', e.target.value)}
          placeholder="Enter your username" 
          error = { !!error.username}
          />
          <br/>
          <br/>

          {error.username && <Alert severity = "error">{error.username}</Alert>}
        </FormControl>
        </Grid>

        <Grid item>
        <FormControl>
        <TextField className = "input"
          label="Password" 
          variant="outlined"
          type="password" 
          required
          name = "user.password"
          value ={user.password}
          onChange = {e => setForm('password', e.target.value)}
          placeholder="Enter your password" 
          error = { !!error.password}
          />
          <br />
          <br />
          {error.password && <Alert severity = "error">{error.password}</Alert>}
        </FormControl>
        </Grid>
        
        <Grid item>
        <FormControl>
        <TextField className = "input"
          label = "Email"
          variant="outlined"  
          type="email" 
          required
          name = "user.email"
          value ={user.email}
          onChange = {e => setForm('email', e.target.value)}
          placeholder="Enter your email" 
          error = { !!error.email}
          />
          <br />
          <br />

          {error.email && <Alert severity = "error">{error.email}</Alert>}
        </FormControl>
        </Grid>
        <br />
        
        <FormControl className = "input"          
        error = {!!error.accountType}  
        component="fieldset">
        <FormLabel component="legend">I am looking for...</FormLabel>
        <RadioGroup
          aria-label="accountType"
          name = "user.accountType"
          value ={user.accountType}
          onChange = {e => setForm('accountType', e.target.value)}
        >
          <FormControlLabel value="flat" control={<Radio />} label="A Flatmate" />
          <FormControlLabel value="flatee" control={<Radio />} label="A Flat" />
        </RadioGroup>
        {error.accountType && <div className = "error-message">{error.accountType} <br /> </div>}
        </FormControl>
        <br/>
        <br/>
        <br/>

        <IconButton className = "button"
        variant="contained" color="primary" type ="submit"
        disabled = {(!user.username || !user.password || !user.email || !user.accountType) ? true:false}>
          <ArrowForwardIosIcon/>
        </IconButton>
        </Grid>
      </form>

      <br/>
      <br/>
      
        <Grid container justifyContent="flex-end">
           <Grid item>
           Already have an account? 
           <Link href="login/" variant="body1"> Sign in
           </Link>
         </Grid>
        </Grid>
    </div>
  );
};

export default FirstStep;

function emailCheck(email, foundError, userExist) {
  if (!email || email === '') { //Blank email
    foundError.email = 'Email cannot be empty';
  } else if (!email.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
    foundError.email = 'Please enter a valid email address';
  }

  if (userExist.email == 'email') {
    foundError.email = 'Email already exists';
  }
}

function passwordCheck(password, foundError) {
  if (!password || password === '') { //Blank password
    foundError.password = 'Password cannot be empty';
  } else if (password.length < 6) { //Password too short
    foundError.password = 'Password must be more than 6 characters';
  } else if (password.includes(' ')) { //Password has a whitespace
    foundError.password = 'Password must not contain a whitespace';
  }
}

function usernameCheck(username, foundError, userExist) {
  if (!username || username === '') { //Blank username
    foundError.username = 'Username cannot be blank';
  } else if (!username.match(/^[a-zA-Z0-9]+$/)) { //Username with special characters
    foundError.username = 'Username should not contain special characters.';
  } else if (username.length < 6) { //Username too short
    foundError.username = 'Username should have at least 6 characters.';
  }

  if (userExist.username == 'username') {
    foundError.username = 'Username already exists';
  }
}

async function FetchUserData(token, setRepo) {
  const URL = 'http://localhost:4000/users/';
  const USER_TOKEN = token;
  const AuthString = 'Bearer '.concat(USER_TOKEN);

  //Using .get to retrieve data 
  await axios.get(URL, { headers: { Authorization: AuthString } })
    .then(response => {
      //Display for debugging
      console.log(response.data);
      //Store data in a local variable
      const myRepo = response.data;
      //Updata the state
      setRepo(myRepo);
    })
    .catch((error) => {
      //Display error
      console.log('error ' + error);
    });
}

async function FetchToken() {
  let token = '';

  const account = {
    username: 'admin',
    password: 'admin'
  };

  await axios.post('http://localhost:4000/users/authenticate', account)
    .then(res => {
      token = res.data.token;
    });
  return token;
}

