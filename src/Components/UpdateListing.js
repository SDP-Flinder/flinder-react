import React, { useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { UpdateCurrentListing } from './AxiosHelpers';
import NumberFormat from 'react-number-format';

function UpdateListing(props) {

    const [user] = useState(props.user);
    const currentDate = new Date();

    const [error, setError] = useState({});
    const [isInvalid, setInvalid] = useState({});

    const [flat_id] = useState(props.listing.flat_id || '');
    const [description, setDescription] = useState(props.listing.description || '');
    const [roomAvailable, setRoomAvailable] = useState(new Date(props.listing.roomAvailable) || new Date());
    const [rent, setRent] = useState(props.listing.rent || 0);
    const [rentUnits, setRentUnits] = useState(props.listing.rentUnits || '');
    const [utilities, setUtilities] = useState(props.listing.utilities || '');
    const [active, setActive] = useState(props.listing.active);
    const [id] = useState(props.listing.id || '');

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

            UpdateCurrentListing({
                user: user,
                id: id,
                flat_id: flat_id,
                description: description,
                roomAvailable: roomAvailable,
                rent: rent,
                rentUnits: rentUnits,
                utilities: utilities,
                active: active,
                updateListings: props.updateListings
            });

            props.history.push('/account');
        }
    }

    const handleChange = (event) => {
        setActive(event.target.checked);
        console.log(active);
    };

    return (
        <div>
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
                        > Rent Amount (in $NZ)</InputLabel>
                        <FormControl>
                            <NumberFormat
                                className="input"
                                allowEmptyFormatting={true}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                decimalScale={2}
                                required
                                value={rent || 0}
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
                            to="/listings/"
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Grid>
            </form>
        </div>
    );
}

export default UpdateListing;