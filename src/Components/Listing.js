import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DeleteListing } from './AxiosHelpers';
import * as moment from 'moment'

function Listing(props) {
    const [listing, setListing] = useState(props.listing);
    const [date, setDate] = useState('');

    useEffect(() => setListing(props.listing), [props.listing]);
    useEffect(() => convertDate(), [listing]);

    const convertDate = () => {
        if(listing.roomAvailable !== undefined) {
            let d = listing.roomAvailable;
            setDate(moment(d).format("DD/MM/YYYY"));
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        DeleteListing({ user: props.user, id: listing.id, updateListings: props.updateListings });
        props.history.push('/account');
    }

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
                            to="/listings/"
                        >
                            Listings
                        </Button>
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listings/add"
                        >
                            Create Listing
                        </Button>
                    </ButtonGroup>
                    <div>
                        <h1>Description: {listing.description}</h1>
                        <h1>Utilities: {listing.utilities}</h1>
                        <h1>Rent: ${listing.rent} {listing.rentUnits}</h1>
                        <h1>Available: {date}</h1>
                    </div>
                    <ButtonGroup variant="contained" color="secondary">
                        <Button
                            className="button"
                            component={RouterLink}
                            to="/listings/update"
                        >
                            Update Listing
                        </Button>
                        <Button
                            className="button"
                            type="submit"
                        >
                            Delete Listing
                        </Button>
                    </ButtonGroup>
                </Grid>
            </form>
        </div>
    );
}

export default Listing;