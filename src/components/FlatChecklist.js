import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';

const FlatInfo = (props) => {
    const {navigation} = props; 

    const handleSubmit = async () => {
        props.history.push('/complete')
        props.updateUser(props.formData);
        console.log(props.user);
    }
    

    return (
        <div>
            <h1>Review your information: </h1>

            <div>
            <h4>Username: {props.user.username} </h4>
            <h4>Username: {props.user.email} </h4>
            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                props.history.push("/");
            }
            }>Edit</Button>

            <br /> <br />

            </div>
            <div>
            <h4>Full name: {props.user.firstName} {props.user.lastName} </h4>
            <h4>D.O.B: {moment(props.user.dob).format('DD/MM/YYYY')}</h4>

            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("information");
            }
            }>Edit</Button>
            </div>
            <br/> <br/>

            <div>
            <h4>Address: {props.user.address.street}, {props.user.address.suburb}, {props.user.address.city}, {props.user.address.country} 
            </h4>
            <h4>Existing flatmate(s): {props.user.existingFlatmates}</h4>
            <h4>Description: {props.user.description}</h4>


            <Button variant="outlined" size="medium" color="primary"
            onClick = {()  =>{
                navigation.go("address");
            }
            }>Edit</Button>
            </div>


            <br/> <br />

            <Button
            variant="contained" color="secondary"
            onClick = {handleSubmit}>Complete</Button>
        </div>
    )
}

export default withRouter(FlatInfo)

