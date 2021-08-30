// import React, {Component} from 'react'
// import { withRouter } from 'react-router';

// export class FlatChecklist extends Component{

//     continue = e => {
//         e.preventDefault();
//         this.props.history.push('/complete');
//     }

//     back = e => {
//         e.preventDefault();
//         this.props.previousStep();
//     }

//     render() {
//         //const {value, handleChange} = this.props;

//         return (
//             <div>
//                 <h2> This is a flat checklist </h2>
//                 <button onClick = {this.back}> Back </button>
//                 <button onClick = {this.continue}> Complete </button>
//             </div>
            
//         )
//     }
// }

// export default withRouter(FlatChecklist)

import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';

const FlatInfo = (props) => {
    const {navigation} = props; 

    const handleSubmit = () => {
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

