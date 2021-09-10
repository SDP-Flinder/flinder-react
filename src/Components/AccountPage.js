import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

function AccountPage(props) {
    const [user] = useState(props.user);

    const getListings = async () => {
        const URL = 'http://localhost:4000/listings/'
        const USER_TOKEN = user.token;

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        console.log(user.id);

        const bodyParameters = {
            flat_id: user.id
        };

        axios.get(URL, bodyParameters, config)
            .then(res => props.updateListings(res.data));
    }

    useEffect(() => getListings(), [])

    return (
        <div>
            <Button component={RouterLink} to="/listings/">
                Listings
            </Button>
            <Button component={RouterLink} to="/listings/add">
                Create Listing
            </Button>
        </div>
    );
}

export default AccountPage;