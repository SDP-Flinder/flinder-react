import React from 'react'
import Navigation from './Navigation'
import { useAuth } from './Authentication'
import {makeStyles, Typography } from "@material-ui/core";
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grow } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow style={{ transformOrigin: '0 0 0' }} 
    {...( { timeout: 1000 } )}
    ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(12),
      marginLeft: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
        width: "300px",
    },
    questions: {
        margin: theme.spacing(12),
    }
}));

const renderDialog = (info, open, handleClose) => (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <Typography variant = "h5" color = "primary">
                {info.title}
            </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant = "body2">
            {info.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color = "primary" onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
)

const updateInfo = (e) => {
    const label = e.currentTarget.name;

    switch(label){
        case "info":
            return {
                title: "What is Flinder?",
                content: "Flinder is a social media application that allows people to find their perfect flatmate "+
                "by swiping RIGHT on the profiles that you like, or just simply swipe LEFT on the ones you don't think is a great match."+ 
                " Unlike any other apps out there where they just post a listing and you show up in front of their house, Flinder allows you to get to know" + 
                " your future flatmate better before deciding to go for a viewing."
            };
        case "flat":
            return {
                title: "What is a Flat",
                content: "A flat is someone who is looking for a FLATMATE.",
            };
        case "flatee":
            return {
                title: "What is a Flatee",
                content: "A flat is someone who is looking for a FLAT.",
            };
        case "flatee-match":
            return {
                title: "Match for Flatees",
                content: "The flatee will be shown a list of matches that suit their preferences, " + 
                " and they can decide to swipe right on the ones they like and left on the ones" + 
                " they don't feel like it.",
            };
        case "flat-match":
            return {
                title: "Match for Flats",
                content: "The Flat will be shown a list of the flatees who liked their listing, " + 
                " and they can decide to swipe right on the ones they like and left on the ones" + 
                " they don't feel like it.",
            };
        case "flat-listing":
            return {
                title: "Flat Listings",
                content: "Yes, the flat can have as many listings as they want to, " + 
                "as long as it's just in 1 house because this app is not designed for \"Real Estate Agents\"" +
                ", but more for the ones who are genuinely looking for a flatmate!"
            };
        case "region":
            return {
                title: "Using Flinder outside New Zealand",
                content: "Unfortunately Flinder is only available within New Zealand," + 
                "specifically in Auckland and Wellington, but we will expand the flatting areas soon, so stay tuned!"
            };
    }
}


const FAQ = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [info, setInfo] = React.useState({});

    const showInfo = (e) => {
        console.log(e.currentTarget);
        setInfo(updateInfo(e));
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Navigation />
            <div className = {classes.paper}>
                <Typography variant = "h4">
                    FAQ
                </Typography>
                <br/>
                <Grid container spacing = {2} className = {"questions"}>
                    <Grid item xs = {12}>
                        <Button name = "info" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            What is Flinder?
                        </Typography>
                        </Button>
                    </Grid>

                    <Grid item >
                        <Button name = "flatee" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            What is a FLATEE?
                        </Typography>
                        </Button>
                    </Grid>

                    <Grid item xs = {8}>
                        <Button name = "flatee-match" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            How does the match work for a flatee?
                        </Typography>
                        </Button>
                    </Grid>

                    <Grid item >
                        <Button name = "flat" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            What is a FLAT?
                        </Typography>
                        </Button>
                    </Grid>

                    <Grid item >
                        <Button name = "flat-match" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            How does the match work for a flat?
                        </Typography>
                        </Button>
                    </Grid>

                    <Grid item >
                        <Button name = "flat-listing" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            Can a flat have multiple listings?
                        </Typography>
                        </Button>
                    </Grid>

                    <Grid item >
                        <Button name = "region" 
                        variant = "outlined" 
                        color = "primary" 
                        className = {classes.button}
                        onClick = {e => showInfo(e)}>
                        <Typography variant = "caption">
                            Can I use Flinder outside New Zealand?
                        </Typography>
                        </Button>
                    </Grid>
                    
                </Grid>

                {renderDialog(info, open,handleClose)}
            </div>
        </div>
    )
}

export default FAQ
