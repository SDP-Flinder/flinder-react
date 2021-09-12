import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";
import { useAuth } from "../App/Authentication";

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



export default function Profile() {
    const classes = useStyles();
    const { signout, isAuthed } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        signout()
    };
    return(
        <div className={classes.paper}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Profile Page
            </Typography>
            {/* User should only be able to access this page when authorised, but just incase. Could remove check */}
            {isAuthed ? (
                <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handleLogout(e)}
                > Log out </Button>
            ) : ( null )}
        </div>
    );
};