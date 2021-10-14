import React from 'react'
import { useAuth } from '../App/Authentication'
import moment from 'moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Chip, Divider, Grid, Grow, Typography } from '@material-ui/core';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@material-ui/core';
import { Paper, Stack } from '@mui/material';
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
        padding: '1em' 
    },
    rightGrid:{
        padding: '1em'
    },
    gridContent:{
        borderBottom: '0.1em solid black',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
const renderFlatee = (classes, Listing) => (
    <h2 style={{
        padding: 15,
      }}
    >
        {`${Listing.accountUser.username}`}
        <br />
        {`Flat Description: ${Listing.listing.description}`}
        <br />
        {`Listing Description: ${Listing.accountUser.description}`}
        <br />
        {`Location: ${Listing.accountUser.address.suburb}`}
        <br />
        {`${Listing.accountUser.existingFlatmates} Flatmate(s)`}
        <br />
        {`$${Listing.listing.rent} ${Listing.listing.rentUnits}`}
        <br />
        {`Lease ends: ${moment(Listing.accountUser.leaseDate).format("DD/MM/YYYY")}`}
    </h2>
);

const renderListing = (classes, person) => (
    <Paper className = {classes.paper} variant = "outlined">
        <Grid container>
            <Grid item xs = {5} className = {classes.grid}>
                <Typography>
                    Photo here
                </Typography>
            </Grid>

            <Grid container item xs = {7} spacing = {3} className = {classes.rightGrid}>
                <Grid item xs = {12} className = {classes.gridContent}>
                    <Typography variant = "h3">
                    {person.firstName} {person.lastName} 
                    </Typography>
                    <Typography variant = "body1">
                            Age: {moment().diff(person.dob, 'years')}
                    </Typography>
                </Grid>

                <Grid item xs = {12} >
                    <Stack direction = "row" spacing = {3}>
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

    const [open, setOpen] = React.useState(false);

    const [checked, setChecked] = React.useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const {user} = useAuth();
  
    return (
      <div>
          <Grow in={checked}>
            <Button
            variant="contained" onClick={handleClickOpen}>
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
