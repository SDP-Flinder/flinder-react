import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';

const FlatInfo = (props) => {
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
              address: user.address,
              description: user.description,
              existingFlatmates: user.existingFlatmates,
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
            <h4>Flat Information</h4>
            <p>Address: {props.user.address.street}, {props.user.address.suburb}, {props.user.address.city}, {props.user.address.country} 
            </p>
            <p>Existing flatmate(s): {props.user.existingFlatmates}</p>
            <p>Description: {props.user.description}</p>


            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("address");
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

export default withRouter(FlatInfo)

