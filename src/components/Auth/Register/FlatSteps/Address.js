import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';



const Address = (props) => {
    const {navigation} = props;
    //const {address} = props;

    const [addressName, setAddress] = React.useState('');
    const [componentAddress, setComponent] = React.useState({
        street: '',
        suburb: '',
        city: '',
        country: '',
    });


    //The user wants to enter the address manually
    const [manual, setManual] = React.useState(false);

    const manualEdit = () => {
        setManual(true);
        clearAddress();
    }

    const handleSelect = address => {

        //Get the user address from Google API
        geocodeByAddress(address)
          .then(results => {
              getLatLng(results[0])

              setAddress(results[0].formatted_address);
              let currentAddress = {
                  street: '',
                  suburb: '',
                  city: '',
                  country: '',
              }

              assignComponentAddress(results, currentAddress);

              setComponent(currentAddress);
            })
          .catch(error => console.error('Error', error));
    };

    //Find any errors from the user iputs
    const [error,setError] = useState({});
    const findError = checkError()

    const onSubmit = e => {
        e.preventDefault();
        const newError = findError();

        if(Object.keys(newError).length > 0){
            //Found errors and set the errors to the useState
            setError(newError);
        } else {

            props.user.address.street = componentAddress.street;
            props.user.address.suburb = componentAddress.suburb;
            props.user.address.city = componentAddress.city;
            props.user.address.country = componentAddress.country;
 
            navigation.go("flat-description");
        }
    }

    //Clear the input when the user presses X
    const clearAddress = () =>{
        setAddress('');
        setComponent({});
        setError({});
    }

  //This useState is used to store data from the API
  const [repo, setRepo] = useState([]);
  //Fetch authorised data from the API with token
  const getRepo = getUserData(setRepo)
  //Set the data in the local state
  useEffect(()=>getRepo(), []);

    return (
        <div>
            <form onSubmit = {onSubmit}>
            <Typography component="h3">
                 What&apos;s your address?
            </Typography>
            {!manual && <div>
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
            <Typography component="h5" > Street number: {componentAddress.street} </Typography>
            <Typography component="h5" > Suburb: {componentAddress.suburb} </Typography>
            <Typography component="h5" > City: {componentAddress.city} </Typography>
            <Typography component="h5" > Country: {componentAddress.country} </Typography>
            </div>
            : <div>  </div>}
            {error.street && <Alert severity = "error">{error.street}</Alert>}
            {error.country && <Alert severity = "error">{error.country}</Alert>}
        

            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
            
            <Typography  > Can&apos;t find your address? </Typography>
            <Button variant="contained" color="primary" onClick = {manualEdit}>
               Enter manually
            </Button>


            
            </Grid>
            </div>}

            {manual &&
            <div>
            <Alert severity = "warning">
                We highly reccommend using address finder to increase the accuracy of the address
            </Alert>

            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
            <Button variant = "contained" color="primary" onClick = {() => setManual(false)}>
               Use address finder
            </Button>
            
            </Grid>

            <br />

            <Grid
                container
                spacing = {2}
            >

            <Grid item >
                <TextField
                id="outlined-basic"
                variant="outlined"
                label="Street"
                name = "componentAddress.street"
                value = {componentAddress.street}
                onChange = {e => setComponent((prevUser) => ({ ...prevUser, ...{street: e.target.value} }))}
                placeholder = "Street no."
                autoComplete="off"
                required
                /> 
            </Grid>

            <Grid item xs={6} md={8}>
            <TextField 
            id="outlined-basic"
            variant="outlined"
            name = "componentAddress.suburb"
            value = {componentAddress.suburb}
            onChange = {e => setComponent((prevUser) => ({ ...prevUser, ...{suburb: e.target.value} }))}
            disabled = {!componentAddress.street ? true : false}
            label="Suburb"
            placeholder = "Suburb"
            autoComplete="off"
            /> 
            </Grid>
            <Grid item xs={6} md={4} >
            <TextField
            id="outlined-basic"
            variant="outlined"
            name = "componentAddress.city"
            value = {componentAddress.city}
            onChange = {e => {
                setComponent((prevUser) => ({ ...prevUser, ...{city: e.target.value} }))
                setComponent((prevUser) => ({ ...prevUser, ...{country: 'New Zealand'} }))
                setAddress(`${componentAddress.street}, ${componentAddress.suburb}, ${componentAddress.city}, New Zealand`)
                }
            }
            label="City"
            placeholder = "City"
            autoComplete="off"
            required
            /> 
            </Grid>

            <Grid>
            <Typography variant = "body1"> &nbsp;&nbsp; Country: New Zealand
            </Typography> 
            </Grid>

            {error.street && <Alert severity = "error">{error.street}</Alert>}

            </Grid>
            </div>}

            <br />
            <br />

            <div className = "display-button">
            <IconButton variant="contained"
            onClick = {() => navigation.go("flat-information")}>
                <ArrowBackIosIcon/>
            </IconButton>
            <IconButton variant="contained"
            disabled = {(!addressName)? true : false}
            color = "primary"
            type = "submit">
                <ArrowForwardIosIcon/>
            </IconButton>
            </div>
            </form>
        </div>
    )

    function checkError() {
        return () => {
            const errorFound = {};

            if (componentAddress.country != 'New Zealand') {
                errorFound.country = 'This app is only currently available for New Zealand adresses.';
            }

            if (!componentAddress.street) {
                errorFound.street = 'Please enter a specific street address.';
            }

            for (let k = 0; k < repo.length; k++) {
                if (repo[k].role == 'flat') {
                    if (repo[k].address.street == componentAddress.street
                        && repo[k].address.suburb == componentAddress.suburb
                        && repo[k].address.city == componentAddress.city) {
                        errorFound.street = "This address has already been used.";
                    }
                }
            }

            return errorFound;
        };
    }
}

export default Address

function getUserData(setRepo) {
    return async () => {

        //Retrive the token
        let token = await getToken();

        const URL = 'http://localhost:4000/users/';
        const USER_TOKEN = token;
        const AuthString = 'Bearer '.concat(USER_TOKEN);

        //Using .get to retrieve data 
        await axios.get(URL, { headers: { Authorization: AuthString } })
            .then(response => {
                //Store data in a local variable
                const myRepo = response.data;
                //Updata the state
                setRepo(myRepo);
            })
            .catch((error) => {
                //Display error
                console.log('error ' + error);
            });
    };
}

async function getToken() {
    let token = '';

    const account = {
        username: 'admin',
        password: 'admin'
    };

    await axios.post('http://localhost:4000/users/authenticate', account)
        .then(res => {
            token = res.data.token;
        });
    return token;
}

function assignComponentAddress(results, currentAddress) {
    for (let k = 0; k < results[0].address_components.length; k++) {
        if (results[0].address_components[k].types[0] == 'street_number') {
            currentAddress.street += results[0].address_components[k].long_name;
        }

        if (results[0].address_components[k].types[0] == 'route') {
            currentAddress.street += ' ';
            currentAddress.street += results[0].address_components[k].long_name;
        }

        if (results[0].address_components[k].types[1] == 'sublocality') {
            currentAddress.suburb = results[0].address_components[k].long_name;
        }

        if (results[0].address_components[k].types[0] == 'administrative_area_level_1') {
            currentAddress.city = results[0].address_components[k].long_name;
        }

        if (results[0].address_components[k].types[0] == 'country') {
            currentAddress.country = results[0].address_components[k].long_name;
        }
    }
}

