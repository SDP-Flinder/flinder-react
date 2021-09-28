import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";

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

export default function Match() {
    const classes = useStyles();
    const { user } = useAuth();
    
    return(
        <>
            <Navigation pageName = "Match"/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    This is the match page for {user.firstName}
                </Typography>
            </div>
        </>
    );
};

