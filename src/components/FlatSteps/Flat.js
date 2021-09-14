import React from 'react'
import { useForm, useStep } from "react-hooks-helper";
import FlatAddress from './FlatAddress';
import FlatInfo from './FlatInfo'
import FlatChecklist from './FlatChecklist'
import Address from './Address';

const defaultData = {
    firstName: '',
    lastName: '',
    address: {
        street: '',
        suburb: '',
        city: '',
        country: '',
    },
    existingFlatmates: '',
    description: '',
}

const steps = [
    {id: "information"},
    {id: "address"},
    {id: "description"},
    {id: "checklist"}
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
        case "description":
            return <FlatAddress {...prop} user = {user} updateUser = {props.updateUser}/>
        case "checklist": 
            return <FlatChecklist {...prop} user = {user} updateUser = {props.updateUser}/>
        case "address":
            return <Address {...prop} user = {user} updateUser = {props.updateUser}/>
    }

    return(
        <h1>Flat Sign Up</h1>
    )
}

export default Flat

