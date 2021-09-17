import React from 'react'
import { withRouter } from 'react-router'
import moment from 'moment';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Typography } from '@material-ui/core';

//This step is used to check their information before submission
const FlatInfo = (props) => {
    const {navigation} = props;

    return (
        <div>

            <Typography component="h3">Finally, check your information...</Typography>

            <section>
            <div className = "display-button">
            <h4>Account information</h4>
            <IconButton variant="outlined" size="medium" color="primary" name = "account"
            placeholder = "edit username"
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

            <br />

            <section>

            <div className = "display-button">
            <h4>Personal Information</h4>
            <IconButton variant="outlined" size="medium" color="primary" name = "info"
            placeholder = "edit info"
            onClick = {()  =>{
                navigation.go("flat-information");
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
                navigation.go("flat-address");
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
        </div>
    )
}

export default withRouter(FlatInfo)