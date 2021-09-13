import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DeleteListing, UpdateActive, GetListing } from './AxiosHelpers';
import * as moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//Component to display the details of the selected listing for the owner flat account

function Listing(props) {
    const [listing, setListing] = useState(props.listing);
    const [date, setDate] = useState('');
    const [active, setActive] = useState(props.listing.active || true);

    //Convert the date from default format including exact time, to just show the date

    const convertDate = () => {
        if (listing.roomAvailable !== undefined) {
            let d = listing.roomAvailable;
            setDate(moment(d).format("DD/MM/YYYY"));
            console.log(listing);
        }
    }

    //Submit button for deleting the selected listing

    const onSubmit = (e) => {
        e.preventDefault();

        DeleteListing({ user: props.user, id: listing.id, updateListings: props.updateListings });
        props.history.push('/account');
    }

    //Event handler for the active switch - the owner accoount is able to toggle whether the listing is available or not directly from the listing page, without having to oopen the update listing page

    const handleChange = (event) => {
        setActive(event.target.checked);
        UpdateActive({listing: listing, user: props.user, active: event.target.checked, updateListings: props.updateListings});
        GetListing({id: listing.id, user: props.user, updateListing: props.updateListing});
        console.log(active);
    };

    //Methods to ensure current displayed information is accurate

    useEffect(() => setListing(props.listing), []);
    useEffect(() => setListing(props.listing), [props.listing]);
    useEffect(() => convertDate(), [listing]);
    useEffect(() => setActive(props.listing.active), [listing]);

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

                    {/* Placeholder listing information - will replace with a more elegant display, such as cards, once developed */}

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