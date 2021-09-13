import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';

const FlateeReview = (props) => {
    const {navigation} = props;

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Post the user data to the /users route
        try {
            const { user } = props;

            jsonToFormData(user)

            await axios.post('http://localhost:4000/users/register', formData)
            .then(res => console.log(res));


            props.history.push('/sign-up/complete')
            props.updateUser(props.formData);
            console.log(props.user);
          } catch (error) {
            if (error.response) {
              console.log('error', error.response.data);
            }
          }

    }

    //Update the states from the user
    useEffect(() => {
      console.log(props.user);
    }, [props.user])

    return (
        <div>
          <form onSubmit = {handleSubmit} encType="multipart/form-data" >
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
            type = "submit">Complete</Button>
          </form>
        </div>
    )
}

export default withRouter(FlateeReview)

