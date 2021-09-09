import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function UpdateListing(props) {

    const [flat_id] = useState(props.flat_id || '');
    const [description, setDescription] = useState(props.description || '');
    const [roomAvailable, setRoomAvailable] = useState(props.roomAvailable || new Date());
    const [rent, setRent] = useState(props.rent || 0);
    const [rentUnits, setRentUnits] = useState(props.rentUnits || '');
    const [utilities, setUtilities] = useState(props.utilities || '');
    const [id] = useState(props.id || '');

    // const loadListing = async () => {

    //     setID('6139a2c2555e20c6604f113d');
    //     const URL = 'http://localhost:4000/listings/'.concat(id);
    //     const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTM5MmNmZWE2NTE1Yzk3NzA3MjliOGEiLCJyb2xlIjoiZmxhdCIsImlhdCI6MTYzMTEzNzIxOSwiZXhwIjoxNjMxNzQyMDE5fQ.mSFRMfYIJpONB5FRRq-ED8RpkTI8zWvbF3CQDW7e-gk';

    //     const config = {
    //         headers: { Authorization: `Bearer ${USER_TOKEN}` }
    //     };

    //     axios.get(
    //         URL,
    //         config
    //     ).then(response => {
    //         setDescription(response.data.description);
    //         setRoomAvailable(response.data.date);
    //         setRent(response.data.rent);
    //         setRentUnits(response.data.rentUnits);
    //         setUtilities(response.data.utilities);
    //     });
    // }

    // useEffect(() => {
    //     loadListing();
    // }, []);

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

    const onSubmit = (e) => {
        e.preventDefault();

        const URL = 'http://localhost:4000/listings/'.concat(id);
        const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTM5MmNmZWE2NTE1Yzk3NzA3MjliOGEiLCJyb2xlIjoiZmxhdCIsImlhdCI6MTYzMTEzNzIxOSwiZXhwIjoxNjMxNzQyMDE5fQ.mSFRMfYIJpONB5FRRq-ED8RpkTI8zWvbF3CQDW7e-gk';

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        const bodyParameters = {
            flat_id: flat_id,
            description: description,
            roomAvailable: roomAvailable,
            rent: rent,
            rentUnits: rentUnits,
            utilities: utilities
        };

        axios.put(
            URL,
            bodyParameters,
            config
        ).then(console.log).catch(console.log);

        // window.location = '/listings';
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
                                variant="outlined"
                                value={utilities}
                                onChange={onChangeUtilities}
                            />
                        </FormControl>
                    </div>
                    <br /><br /><br />
                    <div>
                        <FormControl>
                            <OutlinedInput
                                className="input"
                                placeholder="Rent Amount"
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                required
                                variant="outlined"
                                value={rent}
                                onChange={onChangeRent}
                            />
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
                            inline
                            selected={roomAvailable}
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
                        Update
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default UpdateListing;