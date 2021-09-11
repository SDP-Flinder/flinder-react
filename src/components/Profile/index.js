import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}))

export default function Profile() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Step 2 Flatee
            </Typography>
        </div>
    );
};