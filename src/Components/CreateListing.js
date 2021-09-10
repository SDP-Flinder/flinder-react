import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';

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

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeDate = (date) => {
        setRoomAvailable(date);
    }

    const onChangeRent = (e) => {
        setRent(e.target.value);
    }

    const onChangeRentUnits = (e) => {
        setRentUnits(e.target.value);
    }

    const onChangeUtilities = (e) => {
        setUtilities(e.target.value);
    }

    // const getUser = async () => {
    //     const account = {
    //         username: 'billymcdowd',
    //         password: 'Datsyuk13'
    //     }

    //     axios.post('http://localhost:4000/users/authenticate', account)
    //         .then(res => {
    //             setUser(res.data);
    //         })
    // }

    // useEffect(() => getUser(), []);

    const findError = () => {
        const errorFound = {};
        const invalid = {};

        if (rent <= 0) {
            errorFound.rent = "Rent can't be 0 or negative";
            invalid.rent = true;

            return { errorFound, invalid };
        }

        return {errorFound, invalid};
    }

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
            const URL = 'http://localhost:4000/listings/add/'
            const USER_TOKEN = user.token;

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
                utilities: utilities
            };

            axios.post(
                URL,
                bodyParameters,
                config
            ).then(res => {
                props.updateListing(res.data)
            }).then(console.log).catch(console.log);

            props.history.push('/listings/listing');
        }
    }

    return (
        <div>
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
                                onChange={onChangeDescription}
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
                                onChange={onChangeUtilities}
                            />
                        </FormControl>
                    </div>
                    <br /><br /><br />
                    <div>
                        <InputLabel
                            error={isInvalid.rent}
                        > Rent Amount</InputLabel>
                        <FormControl>
                            <OutlinedInput
                                className="input"
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                required
                                variant="outlined"
                                onChange={onChangeRent}
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
                                onChange={onChangeRentUnits}>
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
                            onChange={onChangeDate}
                        />
                    </div>
                    <br />
                    <Button
                        className="button"
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Create
                    </Button>
                    <Button className="button"
                        variant="contained"
                        color="secondary"
                        component={RouterLink}
                        to="/account/"
                    >
                        Back
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default CreateListing;