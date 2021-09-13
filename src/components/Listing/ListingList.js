import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { GetListing, GetListings } from './AxiosHelpers';

//Shows the current user all listings they have created, along with the ooption to create a new listing

function ListingList(props) {
    const {user} = props;
    const [listings, setListings] = useState([]);

    console.log(listings);

    //When a listing is selected via the buttons, fetch it's most up to date details for display on the listing page

    function selectListing(id) {
        GetListing({ id: id, user: user, updateListing: props.updateListing });
        props.history.push("/listings/listing");
    }

    //Dynamically render individual buttons for each listing under the account

    const renderButtons = () => {
        let count = 0;
        return listings.map((listing) => (
            <Button
                className="button"
                variant="contained"
                key={listing.id}
                onClick={function () { selectListing(listing.id) }}
            >
                {++count}
            </Button>
        ))
    }

    useEffect(() => GetListings({user: user}).then(res => setListings(res)), []);

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <h3>Current Listings</h3>
                {renderButtons()}
                <br />
                <ButtonGroup variant="contained" color="secondary">
                    <Button
                        className="button"
                        component={RouterLink}
                        to="/account/"
                    >
                        Account
                    </Button>
                    <Button
                        className="button"
                        component={RouterLink}
                        to="/listings/add"
                    >
                        Create Listing
                    </Button>
                </ButtonGroup>
            </Grid>
        </div>
    );
}

export default ListingList;