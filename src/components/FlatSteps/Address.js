import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
//import { Button } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Address = (props) => {
    const {navigation} = props;
    const {address} = props.formData;
    //const {address} = props;

    const [addressName, setAddress] = React.useState('');
    const [componentAddress, setComponent] = React.useState({});

    const handleSelect = address => {
        geocodeByAddress(address)
          .then(results => {
              getLatLng(results[0])
              console.log(results);
              setAddress(results[0].formatted_address);
              let currentAddress = {
                  street: '',
                  suburb: '',
                  city: '',
                  country: '',
              }

              for(let k =0 ; k<results[0].address_components.length; k++){
                if(results[0].address_components[k].types[0] == 'street_number'){
                    currentAddress.street += results[0].address_components[k].long_name;
                  }
    
                  if(results[0].address_components[k].types[0] == 'route'){
                    currentAddress.street += ' ';
                    currentAddress.street += results[0].address_components[k].long_name;
                  }
    
                  if(results[0].address_components[k].types[1] == 'sublocality'){
                    currentAddress.suburb = results[0].address_components[k].long_name;
                  }
    
                  if(results[0].address_components[k].types[0] == 'locality'){
                    currentAddress.city = results[0].address_components[k].long_name;
                  }
    
                  if(results[0].address_components[k].types[0] == 'country'){
                    currentAddress.country = results[0].address_components[k].long_name;
                  }
              }
              console.log(currentAddress);
              setComponent(currentAddress);
            })
          .catch(error => console.error('Error', error));
    };


    const [error,setError] = useState({});
//    const [isInvalid, setInvalid] = useState({});

    const findError = () => {
        const errorFound = {};

        if(componentAddress.country != 'New Zealand'){
            errorFound.country = 'This app is only currently available for New Zealand adresses.';
        }

        if(!componentAddress.street){
            errorFound.street = 'Please enter a specific street address.';
        }

        for(let k =0; k<repo.length; k++){
            if(repo[k].role == 'flat'){
              console.log(repo[k]);
              if(repo[k].address.street == componentAddress.street 
                && repo[k].address.suburb == componentAddress.suburb
                && repo[k].address.city == componentAddress.city){
                  errorFound.street = "This address has already been used."
                }
            }
          }

        return errorFound
    }

    const onSubmit = e => {
        e.preventDefault();
        const newError = findError();
        console.log(newError);
        console.log(error);
        if(Object.keys(newError).length > 0){
            //Found errors and set the errors to the useState
            setError(newError);
        } else {
            console.log('submitting....');
            address.street = componentAddress.street;
            address.suburb = componentAddress.suburb;
            address.city = componentAddress.city;
            address.country = componentAddress.country;
            props.setForm;
            console.log(props.formData);
            console.log(props.user);
            navigation.next();
        }
    }

    const clearAddress = () =>{
        setAddress('');
        setComponent({});
        setError({});
    }

          //This useState is used to store data from the API
  const [repo, setRepo] = useState([]);

  //Fetch authorised data from the API with token
  const getRepo = async () => {

        //Retrive the token
        let token = '';

        const account = {
            username: 'admin',
            password: 'admin'
        }
        
        await axios.post('http://localhost:4000/users/authenticate', account)
        .then(res => {
            token = res.data.token;
        })

    const URL = 'http://localhost:4000/users/'
    const USER_TOKEN = token;
    const AuthString = 'Bearer '.concat(USER_TOKEN); 
  
    //Using .get to retrieve data 
    await axios.get(URL, { headers: { Authorization: AuthString } })
    .then(response => {
      //Display for debugging
       console.log(response.data);
       //Store data in a local variable
       const myRepo = response.data;
       //Updata the state
       setRepo(myRepo);
    })
    .catch((error) => {
      //Display error
       console.log('error ' + error);
    });
    }
    //Set the data in the local state
    useEffect(()=>getRepo(), []);

    return (
        <div>
            <form onSubmit = {onSubmit}>
            <h6> What's your address? </h6>
            <div className = "display-address-search">
            <PlacesAutocomplete 
            className = "autocomplete-dropdown-container "
            name = "address"
            value={addressName}
            onChange={setAddress}
            onSelect={handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                })}
                />
                <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                    <div key = {suggestion.description}
                        {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                        })}
                    >
                        <span>{suggestion.description}</span>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
            </PlacesAutocomplete>
            {addressName && 
            <IconButton onClick = {clearAddress}>
                <ClearIcon/>
            </IconButton>}
            </div>

            {addressName ?
            <div className = "address-information">
            <h6> Street number: {componentAddress.street} </h6>
            {error.street && <div className = "error-message">{error.street}</div>}
            <h6> Suburb: {componentAddress.suburb} </h6>
            <h6> City: {componentAddress.city} </h6>
            <h6> Country: {componentAddress.country} </h6>
            {error.country && <div className = "error-message">{error.country}</div>}
            </div>
            : <div> <br/> </div>}

            <div className = "display-button">
            <IconButton variant="contained" className = "button"
            onClick = {() => navigation.previous()}>
                <ArrowBackIosIcon/>
            </IconButton>
            <IconButton variant="contained" className = "button"
            disabled = {!addressName ? true : false}
            color = "secondary"
            type = "submit">
                <ArrowForwardIosIcon/>
            </IconButton>
            </div>
            </form>
        </div>
    )
}

export default Address
