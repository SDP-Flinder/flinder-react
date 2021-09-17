import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { useAuth } from "../App/Authentication";
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Home() {
    const classes = useStyles();
    const { user } = useAuth();

    const renderFlatButtons = () => {
        if(user.role === 'flat') {
            return (
                <div>
                    <Button
                        className="button"
                        variant="contained" 
                        color="primary"
                        component={RouterLink}
                        to="/listings"
                    >
                        Listings
                    </Button>
                </div>
            )
        }
    }

    return (
        <>
            <Navigation />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {`Hello ${user.firstName} ${user.lastName}`}
                </Typography>
                {/* User should only be able to access this page when authorised, but just incase. Could remove check */}
                {renderFlatButtons()}
            </div>
        </>
    );
};