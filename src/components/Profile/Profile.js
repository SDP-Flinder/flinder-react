import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import DeleteAccount from "./DeleteAccount";
import { useAuth } from "../App/Authentication";
import { Slide } from "@material-ui/core";
import moment from "moment";


//use for animation
const checked = true;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bold: {
    fontWeight: 600,
    textAlign: "left"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  first: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  second: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none"
  },
  parentPaper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1600
  },
  standalone: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 70,
    boxShadow: "none",
  },
  infoDisplay: {
    padding: theme.spacing(2),
    fontWeight: 600,
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  },
  warning: {
    padding: theme.spacing(2),
    fontWeight: 600,
    textAlign: "left",
    color: "red",
    boxShadow: "none",
  },
  userInfo: {
    padding: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  }
}));

const renderUserInfo = (classes, user) => (
  <Grid item xs={12}>
    <Paper className={classes.paper}>
      <Grid item xs container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.bold}>
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Name</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>{user.firstName} {user.lastName}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>D.O.B</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {moment.utc(user.dob).format('DD/MM/YYYY')}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">Edit</Button>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
)

const renderAccountInfo = (classes, user) => (
  <Grid item xs={12}>
    <Paper className={classes.paper}>
      <Grid item xs container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.bold}>
            Account Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Username</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>{user.username}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Email</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>{user.email}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Password</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            <Button> Change password </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">Edit</Button>
        </Grid>

      </Grid>
    </Paper>
  </Grid>
)

const renderFlatInfo = (classes, user, leaseExpired) => (
  <Grid item xs={12}>
    <Paper className={classes.paper}>
      <Grid item xs container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.bold}>
            Flat Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Address</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {user.address.street}, {user.address.suburb}, {user.address.city}, New Zealand
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Flat description</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>{user.description}</Paper>
        </Grid>
        {leaseWarning(leaseExpired, classes)}
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {moment.utc(user.leaseDate).format('DD/MM/YYYY')}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.bold}>
            Flat Rules
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Smoking</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {user.flatRules == undefined ? 'N/A' : [user.flatRules.smoking == true ? 'Allowed' : 'Not allowed']}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Pets</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {user.flatRules == undefined ? 'N/A' : [user.flatRules.pets == true ? 'Allowed' : 'Not allowed']}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">Edit</Button>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
)

const renderFlateeInfo = (classes, user) => (
  <Grid item xs={12}>
    <Paper className={classes.paper}>
      <Grid item xs container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.bold}>
            Extra Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Smoker</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {user.checklist.isSmoker ? "Yes" : "No"}
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Couple</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {user.checklist.isCouple ? "Yes" : "No"}
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Has Pets</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            {user.checklist.hasPet ? "Yes" : "No"}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.bold}>
            Flatee Preferences
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.infoDisplay}>Price Range</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.userInfo}>
            NZD${user.checklist.priceRange.min} - NZD${user.checklist.priceRange.max}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">Edit</Button>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
)

const leaseWarning = (expired, classes) => {
  if (expired) {
    return (
      <Grid item xs={6}>
        <Paper className={classes.warning}>Lease has expired, please update</Paper>
      </Grid>
    )
  }
  else {
    return (
      <Grid item xs={6}>
        <Paper className={classes.infoDisplay}>Lease expiration date</Paper>
      </Grid>
    )
  }
}

// const flatRules = (user, param) => {
//   if (user.flatRules === undefined)
//     return 'N/A'
//   else {
//     if (param === 'smoking') 
//       return 
//   }
// }

export default function CenteredGrid() {
  const classes = useStyles();
  const { user } = useAuth();
  const leaseExpired = (new Date(user.leaseDate) < new Date());

  return (
    <div className={classes.root}>
      <Paper className={classes.parentPaper}>
        <Grid container spacing={3}>
          <Grid item xs={12} container>
            <Grid item xs container direction="column" spacing={3}>
              <Slide
                direction="up" in={checked} mountOnEnter unmountOnExit
              >
                <Grid item xs={5}>
                  <Paper className={classes.first}>
                    Photo goes here <br />
                    <Button variant="contained" color="primary">Add photo button</Button>
                  </Paper>
                </Grid>
              </Slide>
              <Grid item xs={7}>
                <Paper className={classes.second}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Slide
                      direction="up" in={checked} mountOnEnter unmountOnExit
                    >
                      {renderUserInfo(classes, user)}
                    </Slide>

                    <Slide
                      direction="up" in={checked} mountOnEnter unmountOnExit
                    >
                      {renderAccountInfo(classes, user)}
                    </Slide>

                    <Slide
                      direction="up" in={checked} mountOnEnter unmountOnExit
                    >
                      {user.role == 'flat' ? renderFlatInfo(classes, user, leaseExpired) : renderFlateeInfo(classes, user)}
                    </Slide>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Slide
          direction="up" in={checked} mountOnEnter unmountOnExit
        >
          <Grid item xs={12}>
            <Paper className={classes.standalone}>
              <DeleteAccount />
            </Paper>
          </Grid>
        </Slide>
      </Paper>
    </div>
  );
}
