import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { Grid, InputLabel, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import axios from 'axios';

//Form for a Flat user to create a new listing under their Flat account
function CreateListing(props) {

    const [user] = useState(props.user);
    const currentDate = new Date();

    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const [description, setDescription] = useState("");
    const [roomAvailable, setRoomAvailable] = useState(currentDate);
    const [rent, setRent] = useState(0);
    const [rentUnits, setRentUnits] = useState("");
    const [utilities, setUtilities] = useState("");

    //Method to check if an error is detected on form submit - rent can't be $0
    const findError = () => {
        const errorFound = {};
        const invalid = {};

        console.log(rent);

        if (rent < 0.01) {
            errorFound.rent = "Rent can't be 0";
            invalid.rent = true;

            return { errorFound, invalid };
        }

        return { errorFound, invalid };
    }

    //Form submit method - first checks for errors with the rent field, then calls the axios method
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
            createNewListing();
            props.history.push('/listing/list');
        }
    }

    //Axios method to post the new listing to the DB
    const createNewListing = async () => {
        // if (props.user.role === 'flat') {
        const URL = 'http://localhost:4000/listings/add/'
        const USER_TOKEN = props.user.token;

        console.log(USER_TOKEN);

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        const bodyParameters = {
            flat_id: user.id,
            description: description,
            roomAvailable: roomAvailable,
            rent: rent,
            rentUnits: rentUnits,
            utilities: utilities,
            active: true
        };

        axios.post(URL, bodyParameters, config)
            .then(console.log).catch(console.log);
        // }
    }

    //Check that current user is a flat, before rendering the form
    const renderForm = () => {
        if (user.role === 'flat') {
            return (
                <form onSubmit={onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <h2>Create New Listing</h2>
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
                        <ButtonGroup variant="contained" color="secondary">
                            <Button
                                className="button"
                                type="submit"
                            >
                                Create
                            </Button>
                            <Button className="button"
                                component={RouterLink}
                                to="/listing/list"
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
                <h1>Error: Only a flat account may access this page</h1>
            );
        }
    }

    return (
        <div>
            {renderForm()}
        </div>
    );
}

export default CreateListing;