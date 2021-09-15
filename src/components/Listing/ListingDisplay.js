import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { useAuth } from '../App/Authentication';

//Component to display the details of the selected listing for the owner flat account
function ListingDisplay(props) {
    const { user, getJWT } = useAuth();
    const location = useLocation();
    const id = location.state.id;
    const [listing, setListing] = useState([]);
    const [date, setDate] = useState('');
    const [active, setActive] = useState(true);
    const [button, setButton] = useState(0);
    const [owner, setOwner] = useState(false);

    //Submit button for deleting the selected listing
    const onSubmit = (e) => {
        e.preventDefault();

        if (button === 1) {
            props.history.push({
                pathname: '/updatelisting',
                state: { id: listing.id },
            });
        }
        if (button === 2) {
            deleteListing();
            props.history.push('/listings');
        }
    }

    const deleteListing = async () => {
        const URL = 'http://localhost:4000/listings/'.concat(listing.id);
        const USER_TOKEN = getJWT();

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        await axios.delete(URL, config)
            .then(res => console.log(res))
    }

    //Event handler for the active switch - the owner accoount is able to toggle whether the listing is available or not directly from the listing page, without having to oopen the update listing page
    const handleChange = (event) => {
        setActive(event.target.checked);
        const activeStatus = event.target.checked;
        updateActive(activeStatus);
    };

    const updateActive = async (activeStatus) => {
        const URL = 'http://localhost:4000/listings/'.concat(listing.id);
        const USER_TOKEN = getJWT();

        const config = {
            headers: { Authorization: `Bearer ${USER_TOKEN}` }
        };

        console.log(activeStatus);

        await axios.put(URL, { active: activeStatus }, config)
            .then(console.log).catch(console.log);
    }

    //Check if the user viewing is the owner of the listing before rendering the update/delete buttons
    const renderButtons = () => {
        if (owner) {
            return (
                <ButtonGroup variant="contained" color="secondary">
                    <Button
                        onClick={() => (setButton(1))}
                        className="button"
                        type="submit"
                    >
                        Update Listing
                    </Button>
                    <Button
                        onClick={() => (setButton(2))}
                        className="button"
                        type="submit"
                    >
                        Delete Listing
                    </Button>
                </ButtonGroup>

            )
        }
    }

    //Check if the user viewing is the owner of the listing before rendering the active switch
    const renderSwitch = () => {
        if (owner) {
            return (
                <FormControlLabel
                    control={
                        <Switch
                            checked={active}
                            onChange={handleChange}
                            name="checked"
                            color="primary"
                        />}
                    label="Active"
                />
            );
        }
    }

    //Methods to ensure current displayed information is accurate
    useEffect(() => {
        async function getListing() {
            const URL = 'http://localhost:4000/listings/'.concat(id);
            const USER_TOKEN = getJWT();

            const config = {
                headers: { Authorization: `Bearer ${USER_TOKEN}` }
            };

            const listing = await axios.get(URL, config)

            setListing(listing.data);
        }
        getListing();
    }, [user, id])

    useEffect(() => {
        if (listing.active !== undefined) {
            setActive(listing.active)
        }
    }, [listing]);

    useEffect(() => {
        if (listing.roomAvailable !== undefined) {
            let d = listing.roomAvailable;
            setDate(moment(d).format("DD/MM/YYYY"));
        }
    }, [listing])

    useEffect(() => {
        if (listing.flat_id === user.id) {
            setOwner(true)
        }
    }, [user, listing])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ButtonGroup variant="contained" color="secondary">
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listing/list"
                        >
                            Listings
                        </Button>
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listing/create"
                        >
                            Create Listing
                        </Button>
                    </ButtonGroup>

                    {/* Placeholder listing information - will replace with a more elegant display, such as cards, once developed */}

                    <div>
                        <h1>Description: {listing.description}</h1>
                        <h1>Utilities: {listing.utilities}</h1>
                        <h1>Rent: ${listing.rent} {listing.rentUnits}</h1>
                        <h1>Available: {date}</h1>
                    </div>
                    {renderSwitch()}
                    {renderButtons()}
                </Grid>
            </form>
        </div>
    );
}

export default ListingDisplay;