import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

function ListingList(props) {
    const [listings] = useState(props.listings);
    const [user] = useState(props.user);

    useEffect(() => listingList(), []);

    const listingList = () => {
        listings.forEach(listing => {
            var button = document.createElement("button");
            button.type = 'button';
            button.appendChild(document.createTextNode(listing.rent));
            button.onclick = function () { selectListing(listing.id) };
            document.getElementById("buttons").appendChild(button);
        });

        function selectListing(id) {
            getListing(id);
            props.history.push("/listings/listing");
        }
    }

    const getListing = async (id) => {
        const URL = 'http://localhost:4000/listings/'.concat(id);
        const USER_TOKEN = user.token;

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        console.log(user.id);

        axios.get(URL, config)
            .then(res => props.updateListing(res.data));
    }

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