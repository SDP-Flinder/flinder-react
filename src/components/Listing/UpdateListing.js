import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { Grid, InputLabel, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { useAuth } from '../App/Authentication';

//Form for a Flat user to update a selected listing

function UpdateListing(props) {

    const { user, getJWT } = useAuth();
    const [listing, setListing] = useState([]);
    const currentDate = new Date();
    const location = useLocation();
    const id = location.state.id;

    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const [description, setDescription] = useState('');
    const [roomAvailable, setRoomAvailable] = useState(new Date());
    const [rent, setRent] = useState(0);
    const [rentUnits, setRentUnits] = useState('');
    const [utilities, setUtilities] = useState('');
    const [active, setActive] = useState(true);

    //Method to check if an error is detected on form submit - rent can't be $0
    const findError = () => {
        const errorFound = {};
        const invalid = {};

        console.log(rent);

        if (rent < 0.01) {
            errorFound.rent = "Rent can't be 0 or negative";
            invalid.rent = true;

            return { errorFound, invalid };
        }

        return { errorFound, invalid };
    }

    //Form submit method - first checks for errors with the rent field, then passes relevant user and form info into the axios method
    const onSubmit = (e) => {
        e.preventDefault();

        const newError = findError();
        console.log(newError.errorFound);
        console.log(newError.invalid);

        //Proceed to the next step if inputs are valid
        if (Object.keys(newError.errorFound).length > 0) {
            //Found errors and set the errors to the useState
            setError(newError.errorFound);
            setInvalid(newError.invalid);
            console.log(isInvalid);
        } else {
            updateCurrentListing();
            props.history.push('/listings');
        }
    }

    //Axios method for updating the listing on the DB
    const updateCurrentListing = async () => {
        // if (user.role === 'flat') {
        const URL = 'http://localhost:4000/listings/'.concat(id);
        const USER_TOKEN = getJWT();

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        const bodyParameters = {
            description: description,
            roomAvailable: roomAvailable,
            rent: rent,
            rentUnits: rentUnits,
            utilities: utilities,
            active: active
        };

        console.log(bodyParameters);

        axios.put(URL, bodyParameters, config)
            .then(console.log).catch(console.log);
        // }
    }

    //Event handler for the active switch - the owner accoount is able to toggle whether the listing is available or not directly from the listing page, without having to oopen the update listing page
    const handleChange = (event) => {
        setActive(event.target.checked);
        console.log(active);
    };

    //Only render the form if the current user is the owner of the listing
    const renderForm = () => {
        //Added flat conditional to check it's working as intended
        if (user.id === listing.flat_id && user.role === 'flat') {
            return (
                <form onSubmit={onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <h2>Update Listing</h2>
                        <div>
                            <FormControl>
                                <TextField className="input"
                                    label="Flat/Room Description"
                                    multiline
                                    maxRows={3}
                                    minRows={3}
                                    autoFocus
                                    required
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    variant="outlined"
                                />
                            </FormControl>
                        </div>
                        <br /><br /><br /><br />
                        <div>
                            <FormControl>
                                <TextField className="input"
                                    label="Utilities"
                                    multiline
                                    maxRows={2}
                                    minRows={2}
                                    required
                                    variant="outlined"
                                    value={utilities}
                                    onChange={(e) => { setUtilities(e.target.value) }}
                                />
                            </FormControl>
                        </div>
                        <br /><br /><br />
                        <div>
                            <InputLabel
                                error={isInvalid.rent}
                            > Rent Amount (in $NZ)</InputLabel>
                            <FormControl>
                                <NumberFormat
                                    className="input"
                                    allowEmptyFormatting={true}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    decimalScale={2}
                                    required
                                    value={rent}
                                    onChange={(e) => { setRent(e.target.value) }}
                                />
                                {error.rent && <div className="error-message">{error.rent}</div>}
                            </FormControl>
                        </div>
                        <br />
                        <div>
                            <FormControl>
                                {/* Generates warning upon first clicking drop down - library hasn't kept up with react */}
                                <TextField className="input"
                                    label="Rent Units"
                                    variant="outlined"
                                    select
                                    required
                                    value={rentUnits}
                                    onChange={(e) => { setRentUnits(e.target.value) }}>
                                    <MenuItem value="Per Week">Per Week</MenuItem>
                                    <MenuItem value="Per Fortnight">Per Fortnight</MenuItem>
                                    <MenuItem value="Per Month">Per Month</MenuItem>
                                </TextField>
                            </FormControl>
                        </div>
                        <br /><br />
                        <div>
                            <InputLabel>Available From:</InputLabel>
                            <DatePicker
                                label="Available From"
                                format="dd/MM/yyyy"
                                minDate={currentDate}
                                value={roomAvailable}
                                onChange={(e) => { setRoomAvailable(e) }}
                            />
                        </div>
                        <br />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={active}
                                    onChange={handleChange}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="Active"
                        />
                        <br />
                        <ButtonGroup variant="contained" color="secondary">
                            <Button
                                className="button"
                                type="submit"
                            >
                                Update
                            </Button>
                            <Button
                                className="button"
                                component={RouterLink}
                                to="/listings"
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </form>
            );
        }
        else {
            return (
                <h1>Error: Only the owner account may access this page</h1>
            );
        }
    }

    //Load the listing passed by the previous page from the DB
    useEffect(() => {
        async function getListing() {
            const URL = 'http://localhost:4000/listings/'.concat(id);
            const USER_TOKEN = getJWT();

            console.log('location state is ' + id)

            const config = {
                headers: { Authorization: `Bearer ${USER_TOKEN}` }
            };

            const listing = await axios.get(URL, config)

            setListing(listing.data);
        }
        getListing();
    }, [user, id])

    //Populate the form with the passed in listings details
    useEffect(() => {
        if (listing.id !== undefined) {
            setDescription(listing.description);
            setRoomAvailable(listing.roomAvailable);
            setRent(listing.rent);
            setRentUnits(listing.rentUnits);
            setUtilities(listing.utilities);
        }
    }, [listing])

    return (
        <div>
            {renderForm()}
        </div>
    );
}

export default UpdateListing;