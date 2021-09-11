import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function ListingList(props) {
    const [listings] = useState(props.listings);
    const [user] = useState(props.user);

    console.log(listings);

    function selectListing(id) {
        getListing(id);
        props.history.push("/listings/listing");
    }

    const getListing = async (id) => {
        const URL = 'http://localhost:4000/listings/'.concat(id);
        const USER_TOKEN = user.token;

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        console.log(user.id);

        await axios.get(URL, config)
            .then(res => props.updateListing(res.data));
    }

    const renderButtons = () => {
        return listings.map((listing) => (
            <Button
                className="button"
                variant="contained" 
                key={listing.id}
                onClick={function () { selectListing(listing.id) }}
            >
                {listing.rent}
            </Button>
        ))
    }

    useEffect(() => renderButtons(), [props.listing]);

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
                {/* <div id="buttons"></div> */}
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