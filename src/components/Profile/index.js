import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";
import { useAuth } from "../App/Authentication";
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

export default function Profile() {
    const classes = useStyles();
    const { user, isAuthed } = useAuth();

    return(
        <div className={classes.paper}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Profile Page
            </Typography>
            {isAuthed ? (
                <Button
                type="button"
                component={RouterLink} 
                to="/register" 
                variant="contained" 
                color="primary"
                fullWidth
                className={classes.button}
              > Log out </Button>
            ) : ( null )}
        </div>
    );
};