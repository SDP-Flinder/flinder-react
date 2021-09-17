import React from 'react'
import { withRouter } from 'react-router'
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const FlateeReview = (props) => {
    const {navigation} = props;
    return (
        <div>

            <Typography component="h4">Finally, check your information...</Typography>

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
            {props.user.checklist.isCouple && <p>- Lookng for a couple&apos;s room</p>}

            <p>- Looking for price range from ${props.user.checklist.priceRange.min} to ${props.user.checklist.priceRange.max}
            </p>
            </section>
            <br/>
        </div>
    )
}

export default withRouter(FlateeReview)

