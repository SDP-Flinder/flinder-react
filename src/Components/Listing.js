import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DeleteListing, GetListings } from './AxiosHelpers';
import * as moment from 'moment'

import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function Listing(props) {
    const [listing, setListing] = useState(props.listing);
    const [date, setDate] = useState('');
    const [active, setActive] = useState(props.listing.active);

    const convertDate = () => {
        if (listing.roomAvailable !== undefined) {
            let d = listing.roomAvailable;
            setDate(moment(d).format("DD/MM/YYYY"));
            console.log(listing);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        DeleteListing({ user: props.user, id: listing.id, updateListings: props.updateListings });
        props.history.push('/account');
    }

    const handleChange = (event) => {
        setActive(event.target.checked);
        console.log(active);
    };

    const updateActive = () => {
        const URL = 'http://localhost:4000/listings/'.concat(listing.id);
        const USER_TOKEN = props.user.token;

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        const bodyParameters = {
            active: active
        };

        axios.put(
            URL,
            bodyParameters,
            config
        ).then(console.log).catch(console.log);

        GetListings({ user: props.user, updateListings: props.updateListings });
    }

    useEffect(() => setListing(props.listing), [props.listing]);
    useEffect(() => convertDate(), [listing]);
    useEffect(() => setActive(props.listing.active), [listing]);
    useEffect(() => updateActive(), [active]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ButtonGroup variant="contained" color="secondary">
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listings/"
                        >
                            Listings
                        </Button>
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listings/add"
                        >
                            Create Listing
                        </Button>
                    </ButtonGroup>
                    <div>
                        <h1>Description: {listing.description}</h1>
                        <h1>Utilities: {listing.utilities}</h1>
                        <h1>Rent: ${listing.rent} {listing.rentUnits}</h1>
                        <h1>Available: {date}</h1>
                    </div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={active}
                                onChange={handleChange}
                                name="checked"
                                color="primary"
                            />}
                        label="Active"
                    />
                    <ButtonGroup variant="contained" color="secondary">
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listings/update"
                        >
                            Update Listing
                        </Button>
                        <Button
                            className="button"
                            type="submit"
                        >
                            Delete Listing
                        </Button>
                    </ButtonGroup>
                </Grid>
            </form>
        </div>
    );
}

export default Listing;