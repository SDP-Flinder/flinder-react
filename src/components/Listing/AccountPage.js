import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//Placeholder account page for testing purposes

function AccountPage(props) {
    const [user, setUser] = useState(props.user);

    const renderFlatButtons = () => {
        if (user.role === 'flat') {
            return (
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
            );
        }
    }

    useEffect(() => setUser(props.user), [props.user]);

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {renderFlatButtons()}
            </Grid>
        </div>
    );
}

export default AccountPage;