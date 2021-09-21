import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"
import { useAuth } from "../App/Authentication";;
import Navigation from "../App/Navigation";
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import BottomNav from '../App/Navigation/BottomNav';

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
    const { user } = useAuth();
    const [bio, setBio] = useState('');

    const renderBio = () => {
      if (user.role === 'flatee') {
        return (
          <div>
            <Typography component="h1" variant="b1" color="inherit" className={classes.title}>
              {`Bio: ${bio}`}
            </Typography>
            <Button
              className="button"
              component={RouterLink}
              to="/addbio"
            >
              Edit Bio
            </Button>
          </div>
        )
      }
    }

    useEffect(() => setBio(user.bio))
    
    return(
        <>
            <Navigation />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Profile
                </Typography>
                {renderBio()}
            </div>
            <BottomNav activeStep = {2}/>
        </>
    );
};

