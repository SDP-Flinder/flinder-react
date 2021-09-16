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

function MatchList(props) {
    const classes = useStyles();
    const { user, getJWT } = useAuth();
    const [matches, setMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState({ name: '', age: 0, key: 0 });

    // const listingID = '6141abba9a0320596c17bc57'; // RETRIEVE LISTING ID
    // let matchparam = {
    //     listingID: listingID,
    // };

    // const getMatches = async () => {
    //     matchList();

    //     const URL = 'http://localhost:4000/matches/getSuccessMatches'
    //     const USER_TOKEN = TOKEN;

    //     axios.get(URL, { headers: { Authorization: `Bearer ${USER_TOKEN}` } })
    //         .then(res => console.log(res.data));
    // }

    const renderButtons = () => {
        let count = 0;
        return matches.map((match) => (
            <Button
                className="button"
                variant="contained"
                key={++count}
                onClick={function () { selectMatch(match.id) }}
            >
                {match.username}
            </Button>
        ))
    }

    const selectMatch = (id) => {
        matches.forEach(match => {
            if (match.id === id) {
                props.history.push({
                    pathname: '/match',
                    state: { match: match },
                });
                return;
            }
        })
        console.log(id);
    }

    useEffect(() => {
        async function getListings() {
            const URL = 'http://localhost:4000/listings/flat/'.concat(user.id);
            const USER_TOKEN = getJWT();

            const config = {
                headers: { Authorization: `Bearer ${USER_TOKEN}` }
            };

            const listings = await axios.get(URL, config);

            const listingList = listings.data;
            console.log(listingList);

            listingList.forEach(listing => {
                getMatches(listing);
            })
            console.log(matches);
        }

        async function getMatches(listing) {
            const URL = 'http://localhost:4000/matches/potentialMatchesForListing';
            const USER_TOKEN = getJWT();

            console.log(listing.id)

            const config = {
                params: { listingID: listing.id },
                headers: { Authorization: `Bearer ${USER_TOKEN}` }
            };

            const tempMatches = await axios.get(URL, config);

            console.log(tempMatches.data);

            tempMatches.data.forEach(match => {
                setMatches(matches => [...matches, match])
            })
        }
        if (user !== null) {
            getListings()
        }
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
                <br />
                {renderButtons()}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default MatchList;