import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import TOKEN from '../token';

class CreateListing extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeRent = this.onChangeRent.bind(this);
        this.onChangeRentUnits = this.onChangeRentUnits.bind(this);
        this.onChangeUtilities = this.onChangeUtilities.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            roomAvailable: new Date(),
            rent: 0,
            rentUnits: '',
            utilities: '',
        };
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            roomAvailable: date
        });
    }

    onChangeRent(e) {
        this.setState({
            rent: e.target.value
        });
    }

    onChangeRentUnits(e) {
        this.setState({
            rentUnits: e.target.value
        });
    }

    onChangeUtilities(e) {
        this.setState({
            utilities: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const URL = 'http://localhost:4000/listings/add/'
        const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTM5MmNmZWE2NTE1Yzk3NzA3MjliOGEiLCJyb2xlIjoiZmxhdCIsImlhdCI6MTYzMTEzNzIxOSwiZXhwIjoxNjMxNzQyMDE5fQ.mSFRMfYIJpONB5FRRq-ED8RpkTI8zWvbF3CQDW7e-gk';

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };
        
        const bodyParameters = {
            flat_id: '61392cfea6515c9770729b8a',
            description: this.state.description,
            roomAvailable: this.state.roomAvailable,
            rent: this.state.rent,
            rentUnits: this.state.rentUnits,
            utilities: this.state.utilities
        };
        
        axios.post( 
            URL,
            bodyParameters,
            config
        ).then(console.log).catch(console.log);

        // window.location = '/listings';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    variant="outlined"
                                />
                            </FormControl>
                        </div>
                        <br/><br/><br/><br/>
                        <div>
                            <FormControl>
                                <TextField className="input"
                                    label="Utilities"
                                    multiline
                                    maxRows={2}
                                    minRows={2}
                                    variant="outlined"
                                    value={this.state.utilities}
                                    onChange={this.onChangeUtilities}
                                />
                            </FormControl>
                        </div>
                        <br/><br/><br/>
                        <div>
                            <FormControl>
                                <OutlinedInput
                                    className="input"
                                    placeholder="Rent Amount"
                                    type="number"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    required
                                    variant="outlined"
                                    onChange={this.onChangeRent}
                                />
                            </FormControl>
                        </div>
                        <br/>
                        <div>
                            <FormControl>
                            {/* Generates warning upon first clicking drop down - library hasn't kept up with react */}
                                <TextField className="input"
                                    label="Rent Units"
                                    variant="outlined"
                                    select
                                    required
                                    value={this.state.rentUnits}
                                    onChange={this.onChangeRentUnits}>
                                    <MenuItem value="Per Week">Per Week</MenuItem>
                                    <MenuItem value="Per Fortnight">Per Fortnight</MenuItem>
                                    <MenuItem value="Per Month">Per Month</MenuItem>
                                </TextField>
                            </FormControl>
                        </div>
                        <br/><br/>
                        <div>
                            <InputLabel>Available From:</InputLabel>
                            <DatePicker
                                label="Available From"
                                inline
                                selected={this.state.roomAvailable}
                                onChange={this.onChangeDate}
                            />
                        </div>
                        <br/>
                        <Button
                            className="button"
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Create
                        </Button>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default CreateListing;