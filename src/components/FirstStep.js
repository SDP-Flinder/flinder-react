import React from 'react';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
 import axios from 'axios';
 import { useEffect } from 'react';

const FirstStep = (props) => {
  //This useState is used to store data from the API
  const [repo, setRepo] = useState([]);

  //Fetch authorised data from the API with token
  const getRepo = async () => {

    const URL = 'http://localhost:4000/users/'
    const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzAzNzk4ODIsImV4cCI6MTYzMDk4NDY4Mn0.NVxePRJRI7TMIUGWvPLQUP6fERI8O5Jw-uAB3buXWvk';
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

  //Set the data in the local state
  useEffect(()=>getRepo(), []);

  const { handleSubmit } = useForm({});

  //Store user information
  const [inputUser, setUser] = useState({
    username: '',
    password: '',
    email: '',
    accountType: '',
  });

  //Update the user information
  const setForm = (field, value) => {
      setUser({
        ...inputUser, //Pass any extra details from the users
        [field]: value, //Add new values into the user
      })
  }

  //Catch any errors
  const [error, setError] = useState({});
  const findErrors = () => {

    //Deconstruct the user object
    const {username, password, email, accountType} = inputUser;
    //This is to store new errors arising
    const foundError = {};

    //Username constraints
    if(!username || username === ''){                     //Blank username
      foundError.username = 'Username cannot be blank';
    }else if(!username.match(/^[a-zA-Z0-9]+$/)){          //Username with special characters
      foundError.username = 'Username should not contain special characters.'
    }else if(username.length < 6){                        //Username too short
      foundError.username = 'Username should have at least 6 characters.'
    } 
    
    const userExist = checkUser(username,email);

    if(userExist == 'username'){
      foundError.username = 'Username already exists'
    } else if(userExist == 'email'){
      foundError.username = 'Email already exists'
    }
    
    //Password constraints
    if(!password || password === ''){                   //Blank password
      foundError.password = 'Password cannot be empty';
    } else if(password.length < 6){                    //Password too short
      foundError.password = 'Password must be more than 6 characters';
    }else if(password.includes(' ')){                 //Password has a whitespace
      foundError.password = 'Password must not contain a whitespace';
    }

    //Email constraints
    if(!email || email === ''){                       //Blank email
      foundError.email = 'Email cannot be empty';
    }else if(!email.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)){ 
      foundError.email = 'Please enter a valid email address';
    }

    if(!accountType || accountType == ''){
      foundError.accountType = 'User does not select an account type';
    }

    return foundError;
  }

  //Check if the username or email exists in the database
  const checkUser = (username, email) => {
    let userExist = '';

    for(let k = 0; k < repo.length; k++){
      if(repo[k].username == username){
        userExist = 'username';
      } else if(repo[k].email == email){
        userExist = 'email';
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
      console.log(`This is the user info: ${inputUser.username}, which is a ${inputUser.accountType}`);
      props.updateUser(inputUser);
      //Redirect to the correct route
      if(inputUser.accountType == 'Flat'){
        props.history.push('/flat');
      }else if(inputUser.accountType == 'Flatee'){ 
        props.history.push('/flatee');
      }else if(inputUser.accountType ==''){
          alert('Choose one bitch!');
      }
    }
  }

  return (
    <div>
       <Form onSubmit={handleSubmit(onSubmit)}>
       <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
          type="text" 
          onChange = {e => setForm('username', e.target.value)}
          placeholder="Enter your username" 
          isInvalid = { !!error.username}
          />

        <Form.Control.Feedback type='invalid'>
            { error.username }
        </Form.Control.Feedback>

        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
          onChange = {e => setForm('password', e.target.value)}
          placeholder="Enter your password" 
          isInvalid = { !!error.password}
          />

        <Form.Control.Feedback type='invalid'>
            { error.password }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" 
          onChange = {e => setForm('email', e.target.value)}
          placeholder="Enter your email adress" 
          isInvalid = { !!error.email}
          />

        <Form.Control.Feedback type='invalid'>
            { error.email }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
        <Form.Label>What are you looking for? </Form.Label>
              <Form.Check type="radio" 
              label = "I'm looking for a flatmate" 
              value="Flat" 
              name="accType" 
              onChange = {() => setForm('accountType', 'Flat')}
              isInvalid = { !!error.accountType}/>
              <Form.Check  type="radio" 
              label = "I'm looking for a flat" 
              value="Flatee" 
              name="accType" 
              onChange = {() => setForm('accountType','Flatee')} 
              isInvalid = { !!error.accountType}/> 
        </Form.Group>
        
        <Button variant="contained" color="secondary" type ="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default FirstStep;
