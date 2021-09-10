import axios from 'axios';
// import { useState } from 'react';

// const [user, setUser] = useState({});
// const [listings, setListings] = useState({});

export function GetUser(props) {
    const account = {
        username: props.username,
        password: props.password
    }

    axios.post('http://localhost:4000/users/authenticate', account)
        .then(res => {
            props.updateUser(res.data);
        })
}

export function GetListings(props) {
    const URL = 'http://localhost:4000/listings/flat/'.concat(props.user.id);
    const USER_TOKEN = props.user.token;

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    console.log(props.user.id);

    axios.get(URL, config)
        .then(res => props.updateListings(res.data));
}