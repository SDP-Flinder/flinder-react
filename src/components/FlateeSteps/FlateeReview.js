import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';

const FlateeReview = (props) => {
    const {navigation} = props;

    const handleSubmit = async () => {

        //Post the user data to the /users route
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
              preferredArea: user.preferredArea,
              checklist: user.checklist,
            };
            console.log(userParam)
            await axios.post('http://localhost:4000/users/register', {
              ...userParam
            });
          } catch (error) {
            if (error.response) {
              console.log('error', error.response.data);
            }
          }

        props.history.push('/sign-up/complete')
        props.updateUser(props.formData);
        console.log(props.user);
    }

    return (
        <div>
            <h6>Finally, check your information...</h6>

            <section>
            <h4>Account information</h4>
            <p>Username: {props.user.username} </p>
            <p>Email: {props.user.email} </p>
            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                props.history.push("/");
            }
            }>Edit</Button>
            </section>

            <p>_________________________________________________________</p>

            <section>

            <h4>Personal Information</h4>
            <p>Full name: {props.user.firstName} {props.user.lastName} </p>
            <p>D.O.B: {moment(props.user.dob).format('DD/MM/YYYY')}</p>

            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("information");
            }
            }>Edit</Button>
            
            </section>
            <p>_________________________________________________________</p>
            <section>
            <h4>Extra information</h4>
            {props.user.checklist.isSmoker && <p>- Smoker</p>}
            {props.user.checklist.hasPet && <p>- Has Pet</p>}
            {props.user.checklist.isCouple && <p>- Lookng for a couple's room</p>}

            <p>- Looking for price range from ${props.user.checklist.priceRange.min} to ${props.user.checklist.priceRange.max}
            </p>

            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("checklist");
            }
            }>Edit</Button>
            </section>
            <br/>
            <Button className = "button"
            variant="contained" color="secondary"
            onClick = {handleSubmit}>Complete</Button>
        </div>
    )
}

export default withRouter(FlateeReview)

