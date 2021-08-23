import React from 'react';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const FirstStep = (props) => {

  const { handleSubmit } = useForm({});

  //Store user information
  const [user, setUser] = useState({});

  //Update the user information
  const setForm = (field, value) => {
      setUser({
        ...user, //Pass any extra details from the users
        [field]: value, //Add new values into the user
      })
  }

  //Catch any errors
  const [error, setError] = useState({});
  const findErrors = () => {

    //Deconstruct the user object
    const {username, password, email} = user;
    //This is to store new errors arising
    const foundError = {};

    //Username constraints
    if(!username || username === ''){                     //Blank username
      foundError.username = 'Username cannot be blanked';
    }else if(!username.match(/^[a-zA-Z0-9]+$/)){          //Username with special characters
      foundError.username = 'Username should not contain special characters.'
    }else if(username.length < 6){                        //Username too short
      foundError.username = 'Username should have at least 6 characters.'
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

    return foundError;
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
      console.log(`This is the user info: ${user.username}, which is a ${user.accountType}`);
      
      //Redirect to the correct route
      if(user.accountType == 'Flat'){
        props.history.push('/flat');
      }else if(user.accountType == 'Flatee'){ 
        props.history.push('/flatee');
      }else{
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

        <>
        <p>What are you looking for? </p>
        <div>
            <input type="radio" value="Flat" name="accType" 
             onChange = {() => setForm('accountType', 'Flat')}/> I'm looking for a flatmate
            <input type="radio" value="Flatee" name="accType" 
             onChange = {() => setForm('accountType','Flatee')}/> I'm looking for a flat
        </div>
        </>
        
        <Button variant="contained" color="secondary" type ="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default FirstStep;
