import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

function AccountPage(props) {
    const [user] = useState(props.user);

    const getListings = async () => {
        const URL = 'http://localhost:4000/listings/flat/'.concat(user.id);
        const USER_TOKEN = user.token;

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        console.log(user.id);

        axios.get(URL, config)
            .then(res => props.updateListings(res.data));
    }

    // useEffect(() => getListings(), [])
    useEffect(() => getListings(), [props.user])

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