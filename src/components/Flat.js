//The user chooses to sign up as a Flat
//import React from 'react'
//import FlatInfo from './FlatInfo';
//import FlatAddress from './FlatAddress';
//import FlatChecklist from './FlatChecklist';
//import { useState } from 'react';
//import { withRouter } from 'react-router';
//import Flatee from './Flatee';
//import Confirmation from './Confirmation';
//import FlatAddress from './FlatAddress';
//import FlatInfo from './FlatInfo';

// export class Flat extends Component{

//     //Ininitial state of Flat
//     state = {
//         step: 1,
//         firstName: '',
//         lastName: '',
//         address: '',
//         numOfFlatmates: 0,
//         description: '',
//     }

//     //Move to the next step
//     nextStep = () => {
//         const {step} = this.state;
//         this.setState({
//             step: step +1
//         });
//     }

//     //Go back to the previous one
//     previousStep = () => {
//         const {step} = this.state;
//         this.setState({
//             step: step - 1
//         });
//     }    

//     handleChange = input => e => {
//         this.setState({ [input]: e.target.value });
//     };

//     render () {
//         const {step} = this.state;
//         const {firstName, lastName, address, photo} = this.state;
//         const values = {firstName, lastName, address, photo};


//         switch(step){
//             case 1:
//                 return(
//                     <FlatInfo 
//                     nextStep = {this.nextStep}
//                     previousStep = {this.previousStep}
//                     values = {values}/>
//                 ) 
//             case 2:
//                 return(
//                     <FlatAddress
//                     nextStep = {this.nextStep}
//                     previousStep = {this.previousStep}
//                     values = {values}/>
//                 )
//             case 3:
//                 return(
//                     <FlatChecklist 
//                     nextStep = {this.nextStep}
//                     previousStep = {this.previousStep}
//                     values = {values}/>
//                 )
//             default:
//                 console.log('the user is a flat');
//         }
//     }
// }

// export default withRouter(Flat)


//This is a function version of the previous one
// const Flat = () => {
//     const [flat, setFlat] = useState({
//         step: 1,
//         firstName: '',
//         lastName: '',
//         address: '',
//     })

//     const nextStep = (data) => {
//         const {currentStep} = flat.step;
//         setFlat({step: currentStep+1});
//         setFlat((prevData) => ({...prevData, data}))
//     }

//     const previousStep = () => {
//         const {currentStep} = flat.step;
//         setFlat({step: currentStep+1});
//     }

//     switch(flat.step){
//         case 1:
//             return(
//                 <FlatInfo flat={flat} 
//                 nextStep={nextStep}
//                 previousStep={previousStep}
//                 />
//             )
//         case 2:
//             return(
//                 <FlatAddress flat={flat} 
//                 nextStep={nextStep}
//                 previousStep={previousStep}
//                 />
//             )
//     }

// }

// export default Flat;


import React from 'react'
import { useForm, useStep } from "react-hooks-helper";
import FlatAddress from './FlatAddress';
import FlatInfo from './FlatInfo';
import FlatChecklist from './FlatChecklist'

const defaultData = {
    firstName: '',
    lastName: '',
    address: {
        street: '',
        suburb: '',
        city: '',
        country: '',
    },
}

const steps = [
    {id: "information"},
    {id: "address"},
    {id: "photo"}
]

const Flat = (props) => {
    const {user} = props;
    const [formData, setForm] = useForm(defaultData);
    const {step, navigation} = useStep({
        steps,
        initialStep: 0,
    })
    const prop = {formData, setForm, navigation};

    switch(step.id){
        case "information":
            return <FlatInfo {...prop} user = {user} updateUser = {props.updateUser}/>
        case "address":
            return <FlatAddress {...prop} user = {user} updateUser = {props.updateUser}/>
        case "photo": 
            return <FlatChecklist {...prop} user = {user} updateUser = {props.updateUser}/>
    }

    return(
        <h1>Flat Sign Up</h1>
    )
}

export default Flat

