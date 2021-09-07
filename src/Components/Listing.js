import React from 'react';
import { useForm, useStep } from "react-hooks-helper";
import CreateListing from './CreateListing';

const listingData = {
    description: '',
    roomAvailable: new Date(),
    rent: undefined,
    rentUnits: '',
    utilities: ''
}

const Listing = (props) => {
    const {user} = props;
    const [formData, setForm] = useForm(defaultData);
    
}

export default Listing;