import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../App/Authentication";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Avatar, Container, CssBaseline, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  }));

const Forgot = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <SentimentVeryDissatisfiedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Bad luck, You&apos;re an alpha user. 
                </Typography>
            </div>
        </Container>
    );
};

export default Forgot;