import axios from 'axios';

export async function GetUser(props) {
    const account = {
        username: props.username,
        password: props.password
    }

    await axios.post('http://localhost:4000/users/authenticate', account)
        .then(res => {
            props.updateUser(res.data);
        })
}

export async function GetListing(props) {
    const URL = 'http://localhost:4000/listings/'.concat(props.id);
    const USER_TOKEN = props.user.token;

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    console.log(props.user.id);

    await axios.get(URL, config)
        .then(res => props.updateListing(res.data));
}

export async function GetListings(props) {
    const URL = 'http://localhost:4000/listings/flat/'.concat(props.user.id);
    const USER_TOKEN = props.user.token;

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    console.log(props.user.id);

    await axios.get(URL, config)
        .then(res => props.updateListings(res.data));
}

export async function DeleteListing(props) {
    const URL = 'http://localhost:4000/listings/'.concat(props.id);
    const USER_TOKEN = props.user.token;

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    await axios.delete(URL, config)
        .then(res => {
            console.log(res);
        }).then(GetListings({ user: props.user, updateListings: props.updateListings }))
}

export async function UpdateActive(props) {
    const URL = 'http://localhost:4000/listings/'.concat(props.listing.id);
    const USER_TOKEN = props.user.token;

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    axios.put(
        URL,
        { active: props.active },
        config
    ).then(console.log).catch(console.log);

    GetListings({ user: props.user, updateListings: props.updateListings });
}

export async function UpdateListing(props) {
    const URL = 'http://localhost:4000/listings/'.concat(props.listing.id);
    const USER_TOKEN = props.user.token;

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    const bodyParameters = {
        description: props.listing.description,
        roomAvailable: props.listing.roomAvailable,
        rent: props.listing.rent,
        rentUnits: props.listing.rentUnits,
        utilities: props.listing.utilities,
        active: props.listing.active
    };

    console.log(bodyParameters);

    axios.put(
        URL,
        bodyParameters,
        config
    ).then(console.log).catch(console.log);

    GetListings({ user: props.user, updateListings: props.updateListings });
}

export async function CreateListing(props) {
    const URL = 'http://localhost:4000/listings/add/'
    const USER_TOKEN = props.user.token;

    console.log(USER_TOKEN);

    const config = {
        headers: { Authorization: `Bearer ${USER_TOKEN}` }
    };

    const bodyParameters = {
        flat_id: props.user.id,
        description: props.description,
        roomAvailable: props.roomAvailable,
        rent: props.rent,
        rentUnits: props.rentUnits,
        utilities: props.utilities,
        active: true
    };

    axios.post(
        URL,
        bodyParameters,
        config
    ).then(res => {
        props.updateListing(res.data)
    }).then(console.log).catch(console.log);

    GetListings({ user: props.user, updateListings: props.updateListings });
}