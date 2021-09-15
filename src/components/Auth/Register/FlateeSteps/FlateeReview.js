import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const FlateeReview = (props) => {
    const {navigation} = props;

    const handleSubmit = async () => {

        //Post the user data to the /users route
        try {
            await postUser(props);
            props.history.push('/signin');
            props.updateUser(props.formData);
            console.log(props.user);
          } catch (error) {
            if (error.response) {
              console.log('error', error.response.data);
            }
          }
    }

    return (
        <div>

            <Typography component="p" variant="p">Finally, check your information...</Typography>

            <section>
            <div className ="display-button">
            <h4>Account information</h4>
            <IconButton variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("username");
            }
            }>
              <CreateIcon/>
            </IconButton>
            </div>
            <p>Username: {props.user.username} </p>
            <p>Email: {props.user.email} </p>
            </section>


            <section>
            <div className ="display-button">
            <h4>Personal Information</h4>
            <IconButton variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("flat-information");
            }
            }>
              <CreateIcon/>
            </IconButton>
            </div>
            <p>Full name: {props.user.firstName} {props.user.lastName} </p>
            <p>D.O.B: {moment(props.user.dob).format('DD/MM/YYYY')}</p>

            
            </section>

            <section>
            <div className ="display-button">
            <h4>Extra information</h4>
            <IconButton variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("flatee-checklist");
            }
            }>
              <CreateIcon/>
            </IconButton>
            </div>
            {props.user.checklist.isSmoker && <p>- Smoker</p>}
            {props.user.checklist.hasPet && <p>- Has Pet</p>}
            {props.user.checklist.isCouple && <p>- Lookng for a couple's room</p>}

            <p>- Looking for price range from ${props.user.checklist.priceRange.min} to ${props.user.checklist.priceRange.max}
            </p>
            </section>
            <br/>
            <Button className = "single-button"
            variant="contained" color="primary"
            onClick = {handleSubmit}>Complete</Button>
        </div>
    )
}

export default withRouter(FlateeReview)
async function postUser(props) {
  const { user } = props;
  const userParam = {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dob: user.dob,
    role: user.accountType.toLowerCase(),
    preferredArea: user.preferredArea,
    checklist: user.checklist,
  };
  console.log(userParam);
  await axios.post('http://localhost:4000/users/register', {
    ...userParam
  });

  props.updateUser({ ['loggedIn']: true });
}

