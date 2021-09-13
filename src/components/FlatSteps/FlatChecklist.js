import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';

const formData = new FormData();

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {

  buildFormData(formData, data);
  
  return formData;
}

const FlatInfo = (props) => {
    const {navigation} = props;

    const handleSubmit = async () => {

        //Post the user data to the /users route
        try {
            const { user } = props;

            jsonToFormData(user)

            await axios.post('http://localhost:4000/users/register', formData);
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
            <Button variant="outlined" size="medium" color="primary" name = "account"
            placeholder = "edit username"
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

            <Button variant="outlined" size="medium" color="primary" name = "info"
            placeholder = "edit info"
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


            <Button variant="outlined" size="medium" color="primary" name = "flatAddress"
            placeholder = "edit address"
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

