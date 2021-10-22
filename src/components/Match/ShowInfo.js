import React from 'react'
import { useAuth } from '../App/Authentication'
import moment from 'moment';
import {Button} from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Chip, Grid, Grow, Typography } from '@material-ui/core';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@material-ui/core';
import { DialogTitle, Paper, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "left",
        minWidth: 500,
    },
    grid: {
        padding: '1em', 
    },
    rightGrid:{
        padding: '1em'
    },
    gridContent:{
        borderBottom: '0.1em solid black',
    },
    image: {
        width: 490,
        height: 490,
        borderRadius: 20,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
//Render the flatee's info dialog
const renderFlatee = (classes, Listing) => (
    <Paper className = {classes.paper} variant = "outlined">
        <Grid container>
            <Grid item xs = {12} className = {classes.grid}>
                <img src = {Listing.listing.photo ? "http://localhost:4000/".concat(Listing.listing.photo) 
                : "https://i.kym-cdn.com/entries/icons/facebook/000/016/546/hidethepainharold.jpg" }
                className = {classes.image}/>
            </Grid>

            <Grid container item xs = {12} spacing = {3} className = {classes.rightGrid}>
                <Grid item xs = {12} className = {classes.gridContent}>
                    <Typography variant = "h5">
                    {Listing.accountUser.firstName} {Listing.accountUser.lastName} 
                    </Typography>
                </Grid>

                <Grid item xs = {12} className = {classes.gridContent}>

                    <Typography variant = "overline">
                        Rent
                    </Typography>

                    <Typography>
                    ${Listing.listing.rent} {Listing.listing.rentUnits}
                    </Typography>

                    <Typography variant = "overline">
                       Flat Location
                    </Typography>

                    <Typography>
                        {Listing.accountUser.address.suburb}
                    </Typography>

                    <Typography variant = "overline">
                       Lease end
                    </Typography>

                    <Typography>
                        {moment(Listing.accountUser.leaseDate).format("DD/MMM/YYYY")}
                    </Typography>
                </Grid>
                

                <Grid item xs = {12} >
                    <Typography variant = "overline" className = {classes.gridContent}>
                        About the listing
                    </Typography>
                    <br/>
                    <Typography>
                        {Listing.listing.description}
                    </Typography>
                </Grid>

                <Grid item xs = {12} >
                    <Typography variant = "overline" className = {classes.gridContent}>
                        Utilities
                    </Typography>
                    <br/>
                    <Stack direction = "row" spacing = {2}>
                        {Listing.listing.utilities.power && <Chip label = "Power" color = "primary"/>}
                        {Listing.listing.utilities.water && <Chip label = "Water" color = "primary"/>}
                        {Listing.listing.utilities.internet && <Chip label = "Internet" color = "primary"/>}
                    </Stack>
                </Grid>

                <Grid item xs = {12} >
                    <Typography variant = "overline" className = {classes.gridContent}>
                        Flat Rules
                    </Typography>
                    <br/>
                    <Stack direction = "row" spacing = {2}>
                        <Chip label = "Pets" className = "petsLabel"
                        color = {Listing.accountUser.flatRules == undefined ? "default" : 
                            (Listing.accountUser.flatRules.pets == true ? "primary" : "default")}/>
                        <Chip label = "Smoking" className = "smokingLabel"
                        color = {Listing.accountUser.flatRules == undefined ? "default" : 
                            (Listing.accountUser.flatRules.smoking == true ? "primary" : "default")}/>
                    </Stack>
                </Grid>

                <Grid item xs = {12} >
                    <Typography variant = "overline" className = {classes.gridContent}>
                        About the flat
                    </Typography>
                    <br/>
                    <Typography>
                        {Listing.accountUser.description}
                    </Typography>
                </Grid>

                <Grid item xs = {12} >
                    <Typography variant = "overline" className = {classes.gridContent}>
                        Existing flatmates
                    </Typography>
                    <br/>
                    <Typography>
                        {Listing.accountUser.existingFlatmates}
                    </Typography>
                </Grid>         
            </Grid>
        </Grid>
    </Paper>
);

//Render the listing's info dialog
const renderListing = (classes, person) => (
    <Paper className = {classes.paper} variant = "outlined">
        <Grid container>
            <Grid item xs = {12} className = {classes.grid}>
                <img 
                src = {person.photo ? "http://localhost:4000/".concat(person.photo)
                :
                "https://i.kym-cdn.com/entries/icons/facebook/000/016/546/hidethepainharold.jpg"}
                className = {classes.image}/>
            </Grid>

            <Grid container item xs = {12} spacing = {3} className = {classes.rightGrid}>
                <Grid item xs = {12} className = {classes.gridContent}>
                    <Typography variant = "h5">
                    {person.firstName} {person.lastName} 
                    </Typography>
                    <Typography variant = "body1">
                            Age: {moment().diff(person.dob, 'years')}
                    </Typography>
                </Grid>

                <Grid item xs = {12} >
                    <Stack direction = "row" spacing = {2}>
                    {person.checklist.isSmoker && <Chip label = "Smoker" variant = "outlined"/>}
                    {person.checklist.isCouple && <Chip label = "Couple" variant = "outlined"/>}
                    {person.checklist.hasPet && <Chip label = "Has Pet" variant = "outlined"/>}
                    </Stack>
                </Grid>

                <Grid item xs = {12}>
                    <Typography variant = "overline" className = {classes.gridContent}>
                        About me
                    </Typography>
                    <br/>
                    <Typography variant = "caption">
                        {person.bio}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
)

const ShowInfo = (props) => {
    const classes = useStyles();

    //Open state for the dialog
    const [open, setOpen] = React.useState(false);

    //Animations for the buttons
    const [checked, setChecked] = React.useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //Retrive the user's information
    const {user} = useAuth();
  
    return (
      <div>
          <Grow in={checked}>
            <Button
            id = "view-info" variant="contained" color = "primary" onClick={handleClickOpen}>
                        View Info
            </Button>
          </Grow>
          <br/> 
          <br/>
          <Grow in={checked}>
            <Button variant="contained" color = "secondary" onClick={
                () =>  window.alert('We are currently working on this feature. Please come back later.')
            }
            fullWidth>
                        Report
            </Button>
          </Grow>

          <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CancelIcon/>
                    </IconButton>
                </DialogActions>

                 <DialogContent>
                    {user.role == 'flatee' ? renderFlatee(classes, props.Listing) : renderListing(classes, props.person)}
                 </DialogContent>
            </Dialog>
      </div>     
    )
}

export default ShowInfo
