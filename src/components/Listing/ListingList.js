import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { GetListing } from './AxiosHelpers';

function ListingList(props) {
    const [listings] = useState(props.listings);
    const [user] = useState(props.user);

    console.log(listings);

    function selectListing(id) {
        GetListing({ id: id, user: user, updateListing: props.updateListing });
        props.history.push("/listings/listing");
    }

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