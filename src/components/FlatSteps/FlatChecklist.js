import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';


const FlatInfo = (props) => {
    const {navigation} = props;

    const handleSubmit = async () => {

        //Post the user data to the /users route
        await postUserToDatabase(props);
        props.updateUser({['loggedIn']:true});
        props.history.push('/profile');
        props.updateUser(props.formData);
        console.log(props.user);
    }

    return (
        <div>
            <h6>Finally, check your information...</h6>

            <section>
            <div className = "display-button">
            <h4>Account information</h4>
            <IconButton variant="outlined" size="medium" color="primary" name = "account"
            placeholder = "edit username"
            onClick = {()  =>{
                props.history.push("/sign-up/");
            }
            }>
              <CreateIcon/>
            </IconButton>
            </div>
            <p>Username: {props.user.username} </p>
            <p>Email: {props.user.email} </p>
            </section>

            <br />

            <section>

            <div className = "display-button">
            <h4>Personal Information</h4>
            <IconButton variant="outlined" size="medium" color="primary" name = "info"
            placeholder = "edit info"
            onClick = {()  =>{
                navigation.go("information");
            }
            }>
              <CreateIcon/>
            </IconButton>
            </div>
            <p>Full name: {props.user.firstName} {props.user.lastName} </p>
            <p>D.O.B: {moment(props.user.dob).format('DD/MM/YYYY')}</p>
            
            
            <br />

            </section>
            <section>
            
            <div className = "display-button">
            <h4>Flat Information</h4> 
            <IconButton variant="outlined" size="medium" color="primary" name = "flatAddress"
            placeholder = "edit address"
            onClick = {()  =>{
                navigation.go("address");
            }
            }>
              <CreateIcon/>
            </IconButton>
            </div>

            <p>Address: {props.user.address.street}, {props.user.address.suburb}, {props.user.address.city}, {props.user.address.country} 
            </p>
            <p>Existing flatmate(s): {props.user.existingFlatmates}</p>
            <p>Description: {props.user.description}</p>

            </section>
            <br/>
            <Button style = {{width: "330px"}}
            variant="contained" color="secondary"
            onClick = {handleSubmit}>Complete</Button>
        </div>
    )
}

export default withRouter(FlatInfo)

async function postUserToDatabase(props) {
  try {
    const { user } = props;
    const userParam = {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      role: user.accountType.toLowerCase(),
      address: user.address,
      description: user.description,
      existingFlatmates: user.existingFlatmates,
    };
    console.log(userParam);
    await axios.post('http://localhost:4000/users/register', {
      ...userParam
    });
  } catch (error) {
    if (error.response) {
      console.log('error', error.response.data);
    }
  }
}

