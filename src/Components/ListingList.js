import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
// import axios from 'axios';

function ListingList(props) {
    const [listings] = useState(props.listings);

    const listingList = () => {
        listings.forEach(listing => {
            var button = document.createElement("button");
            button.type = 'button';
            button.appendChild(document.createTextNode(listing.rent));
            button.onclick = function () { selectListing(listing.id) };
            document.getElementById("buttons").appendChild(button);
        });

        function selectListing(id) {
            listings.forEach(listing => {
                if (listing.id === id) {
                    props.updateListing(listing);
                    props.history.push('/listings/listing');
                    return;
                }
            })
        }
    }

    useEffect(() => listingList(), []);

    return (
        <div>
            <Button component={RouterLink} to="/listings/">
                Listings
            </Button>
            <Button component={RouterLink} to="/listings/add">
                Create Listing
            </Button>
            <h3>Current Listings</h3>
            <div id="buttons"></div>
            <Button className="button"
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/account/"
            >
                Back
            </Button>
        </div>
    );
}

export default ListingList;