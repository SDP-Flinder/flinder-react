import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListingList(props) {
    const [user, setUser] = useState([]);
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        const URL = 'http://localhost:4000/listings/'
        const USER_TOKEN = user.token;

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        const bodyParameters = {
            "flat_id": user.id
        };

        axios.get(URL, bodyParameters, config)
            .then(res => setListings(res.data));

        listingList();
    }

    const getUser = async () => {
        const account = {
            username: 'billymcdowd',
            password: 'Datsyuk13'
        }

        axios.post('http://localhost:4000/users/authenticate', account)
            .then(res => {
                setUser(res.data);
            })
    }

    useEffect(() => getUser(), []);
    useEffect(() => getListings(), [user]);

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

    return (
        <div>
            <h3>Current Listings</h3>
            <div id="buttons"></div>
        </div>
    );
}

export default ListingList;