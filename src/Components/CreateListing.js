import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Grid, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
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

    componentDidMount() {

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

        const listing = {
            description: this.state.description,
            roomAvailable: this.state.roomAvailable,
            rent: this.state.rent,
            rentUnits: this.state.rentUnits,
            utilities: this.state.utilities
        };

        console.log(listing);

        const URL = 'http://localhost:4000/listings/add/'
        // const USER_TOKEN = TOKEN;
        // const AuthString = 'Bearer '.concat(USER_TOKEN); 

        // axios.get(URL, { headers: { Authorization: AuthString } })
        //     .then(res => console.log(res.data));

        axios.post(URL, listing)
            .then(res => console.log(res.data));

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
                spacing={0}
                >
                    <h3>Create New Listing</h3>
                    <div>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            className="input"
                            type="text"
                            label="Flat/Room Description"
                            multiline
                            maxRows={5}
                            fullWidth
                            margin="normal"
                            autoFocus
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            variant="outlined"
                        />
                    </FormControl>
                    </div>
                    <br></br>
                    <div>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            className="input"
                            type="text"
                            label="Utilities"
                            multiline
                            maxRows={5}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={this.state.utilities}
                            onChange={this.onChangeUtilities}
                        />
                    </FormControl>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Rent Amount</InputLabel>
                        <OutlinedInput 
                            className="input"
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            required
                            inputlabelprops={{
                                shrink: true
                            }}
                            variant="outlined"
                            // value={this.state.rent}
                            onChange={this.onChangeRent}
                        />
                    </FormControl>
                    </div>
                    <br></br>
                    <div>
                    <FormControl fullWidth variant="outlined">
                        <TextField 
                            label="Rent Units"
                            type="input"
                            variant="outlined"
                            select
                            style={{width: `${(8*this.state.rentUnits.length) + 100}px`}}
                            required
                            value={this.state.rentUnits}
                            onChange={this.onChangeRentUnits}>
                                <option value="perWeek">Weekly</option>
                                <option value="perFortnight">Fortnightly</option>
                                <option value="perMonth">Monthly</option>
                        </TextField>
                    </FormControl>
                    </div>
                    <br></br>
                    <div>
                    {/* <FormControl fullWidth variant="outlined"> */}
                    <InputLabel>Available From:</InputLabel>
                    <DatePicker
                        label="Available From"
                        selected={this.state.roomAvailable}
                        onChange={this.onChangeDate}
                    />
                    {/* <TextField
                        className="input"
                        label="Available From"
                        type="date"
                        required
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true
                        }}
                        defaultValue={this.state.roomAvailable}
                        onChange={this.onChangeDate}
                    /> */}
                    {/* </FormControl> */}
                    </div>
                    <br></br>
                    <Button 
                        className="button" 
                        variant="contained" 
                        color="secondary" 
                        type ="submit"
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