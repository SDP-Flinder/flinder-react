// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignUp() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="firstName"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 autoComplete="lname"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="#" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }


import React from 'react'
import {useState} from 'react';
import { useStep } from "react-hooks-helper";
import FirstStep from './FirstStep';
import FlatInfo from './FlatSteps/FlatInfo';
import Address from './FlatSteps/Address';
import FlatAddress from './FlatSteps/FlatAddress';
import FlatChecklist from './FlatSteps/FlatChecklist';
import FlateePreferredAreas from './FlateeSteps/FlateePreferredAreas';
import FlateeChecklist from './FlateeSteps/FlateeChecklist';
import FlateeReview from './FlateeSteps/FlateeReview';
import '../../../style/global.css'


const steps = [
  {id: "username"},
  {id: "flat-information"},
  {id: "flat-address"},
  {id: "flat-description"},
  {id: "flat-checklist"},
  {id: "flatee-information"},
  {id: "flatee-area"},
  {id: "flatee-checklist"},
  {id: "flatee-review"},
]

export default function SignUp () {
  const [user, setUser] = useState({
    username: '', 
    password: '',
    email: '',
    accountType: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: {
      street: '',
      suburb: '',
      city: '',
      country: '',
    },
    existingFlatmates: '',
    description: '',
    preferredArea:{
        city: '',
        suburb: [],
    },
    checklist: {
        isCouple: false,
        isSmoker: false,
        hasPet: false,
        priceRange: {
            min: 0,
            max: 3000,
        },
    },
  });

  const {step, navigation} = useStep({
    steps,
    initialStep: 0,
  });

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  // const resetUser = () => {
  //   setUser({});
  // };

  const prop = {navigation};

  switch(step.id){
      case "username":
          return <FirstStep className = "layout" {...prop} user = {user} updateUser = {updateUser}/>;
      case "flat-information":
          return <FlatInfo {...prop} user = {user} updateUser = {updateUser}/>;
      case "flat-address":
          return <Address {...prop} user = {user} updateUser = {updateUser}/>;
      case "flat-description":
          return <FlatAddress {...prop} user = {user} updateUser = {updateUser}/>;
      case "flat-checklist":
          return <FlatChecklist {...prop} user = {user} updateUser = {updateUser}/>;
      case "flatee-area":
          return <FlateePreferredAreas {...prop} user = {user} updateUser = {updateUser}/>;
      case "flatee-checklist":
            return <FlateeChecklist {...prop} user = {user} updateUser = {updateUser}/>;
      case "flatee-review":
            return <FlateeReview {...prop} user = {user} updateUser = {updateUser}/>;
      
  }

  return (
    <div>
      Sign Up
    </div>
  )
}

