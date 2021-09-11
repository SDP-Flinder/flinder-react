// import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function AccountPage() {

    return (
        <div>
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
            </Grid>
        </div>
    );
}

export default AccountPage;