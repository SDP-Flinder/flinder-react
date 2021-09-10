import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

function Listing(props) {
    const [listing, setListing] = useState(props.listing);

    useEffect(() => setListing(props.listing), [props.listing]);

    return (
        <div>
            <Button component={RouterLink} to="/listings/">
                Listings
            </Button>
            <Button component={RouterLink} to="/listings/add">
                Create Listing
            </Button>
            <div>
                <h1>{listing.flat_id}</h1>
                <h1>Description: {listing.description}</h1>
                <h1>Rent: ${listing.rent} {listing.rentUnits}</h1>
                <h1>Available: {listing.roomAvailable}</h1>
                <h1>Utilities: {listing.utilities}</h1>
            </div>
            <Button component={RouterLink} to="/listings/update">
                Update Listing
            </Button>
        </div>
    );
}

export default Listing;