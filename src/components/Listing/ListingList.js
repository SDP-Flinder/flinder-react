import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import { useAuth } from '../App/Authentication';

//Shows the current user all listings they have created, along with the ooption to create a new listing
function ListingList(props) {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);

    console.log(listings);

    //Passes the selected listing to the listing page for displaying
    function selectListing(id) {
        props.history.push({
            pathname: '/listing/display',
            state: {id: id},
          });
    }

    //Dynamically render individual buttons for each listing under the account
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

    const renderListingsPage = () => {
        if (user.role === 'flat') {
            return(
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
                            to="/listing/create"
                        >
                            Create Listing
                        </Button>
                    </ButtonGroup>
                </Grid>
            );
        }
        else {
            return(
                <h1>Error: Only a flat account may access this page</h1>
            )
        }
    }

    //Fetch all listings owned by the current user on page load
    useEffect(() => {
        async function getListings() {
            const URL = 'http://localhost:4000/listings/flat/'.concat(user.id);
            const USER_TOKEN = user.token;

            const config = {
                headers: { Authorization: `Bearer ${USER_TOKEN}` }
            };

            const listings = await axios.get(URL, config);

            setListings(listings.data);
        }
        if (user.role === 'flat') {
            getListings();
        }
    }, [user])

    return (
        <div>
            {renderListingsPage()}
        </div>
    );
}

export default ListingList;