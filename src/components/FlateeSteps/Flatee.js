import React from 'react'
import { useForm, useStep } from "react-hooks-helper";
import FlateeInfo from './FlateeInfo';
import FlateePreferredAreas from './FlateePreferredAreas';
import FlateeChecklist from './FlateeChecklist';
import FlateeReview from './FlateeReview';

const defaultData = {
    firstName: '',
    lastName: '',
    preferredArea:{
        city: '',
        suburb: [],
    },
    checklist: {
        isCouple: false,
        isSmoker: false,
        hasPet: false,
        priceRange: {
            min: 0,
            max: 3000,
        },
    },
}

const steps = [
    {id: "information"},
    {id: "areas"},
    {id: "checklist"},
    {id: "confirmation"},
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
            return <FlateeInfo {...prop} user = {user} updateUser = {props.updateUser}/>
        case "areas":
            return <FlateePreferredAreas {...prop} user = {user} updateUser = {props.updateUser}/>
        case "checklist": 
            return <FlateeChecklist {...prop} user = {user} updateUser = {props.updateUser}/>
        case "confirmation": 
            return <FlateeReview {...prop} user = {user} updateUser = {props.updateUser}/>
    }

    return(
        <h1>Flatee Sign Up</h1>
    )
}

export default Flat

