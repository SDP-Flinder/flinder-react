import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Navigation from "../App/Navigation";
import TabGroup from "./TabGroup";

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
    
    return(
        <>
            <Navigation />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Profile
                </Typography>
            </div>
        </>
    );
};

