import React, { useEffect, useState } from 'react';
// import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Config } from '../../config';
import { useAuth } from '../App/Authentication';
import axios from 'axios';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={`${Config.AppURL}`}>
                {`${Config.AppName}`}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function MatchList() {
    const classes = useStyles();
    const { user, getJWT } = useAuth();
    const [matches, setMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState({ name: '', age: 0, key: 0 });

    // const getMatches = async () => {
    //     matchList();

    //     const URL = 'http://localhost:4000/matches/getSuccessMatches'
    //     const USER_TOKEN = TOKEN;

    //     axios.get(URL, { headers: { Authorization: `Bearer ${USER_TOKEN}` } })
    //         .then(res => console.log(res.data));
    // }

    const renderButtons = () => {
        return matches.map((match) => (
            <Button
                className="button"
                variant="contained"
                key={match.id}
                onClick={function () { selectMatch(match.id) }}
            >
                {match.name}
            </Button>
        ))
    }

    const selectMatch = (key) => {
        matches.forEach(match => {
            if (match.id === key) {
                setCurrentMatch(match);
                return;
            }
        })
    }

    useEffect(() => {
        async function getMatches() {
            const URL = 'http://localhost:4000/potentialmatchesForListing/user?flatUsername='.concat(user.username);
            const USER_TOKEN = getJWT();

            const config = {
                headers: { Authorization: `Bearer ${USER_TOKEN}` }
            };

            const matches = await axios.get(URL, config);

            setMatches(matches.data);
        }
            getMatches();
    }, [user, getJWT])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Pending Matches
                </Typography>
                {renderButtons()}
                <br />
                <h3>{currentMatch.name}</h3>
                <h3>{currentMatch.age}</h3>
                <p>{currentMatch.key}</p>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default MatchList;