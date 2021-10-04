import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import UserInformation from './UserInformation';
import AccountInformation from './AccountInformation';
import FlatInformation from './FlatInformation';
import FlateeInforamtion from './FlateeInformation';
import { useAuth } from "../../App/Authentication";
import { Box } from '@mui/system';
import ChangePass from './ChangePass';

//Transition effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Render component based on the button clicked
const renderComponents = (buttonID, newUser, setUser, error) => {
    switch (buttonID){
        case 'user-info':
            return (<UserInformation newUser = {newUser} setUser = {setUser} error = {error}/>);
        case 'account-info':
            return (<AccountInformation newUser = {newUser} setUser = {setUser}/>);
        case 'flat-info':
            return (<FlatInformation newUser = {newUser} setUser = {setUser} error = {error}/>);
        case 'flatee-info':
            return (<FlateeInforamtion newUser = {newUser} setUser = {setUser}/>);
        case 'pass':
            return (<ChangePass newUser = {newUser} setUser = {setUser} error = {error}/>);
        default:
            return (<p>Fuck!!!</p>);
    }
}

export default function EditDialog(props) {
    //Retrieve props from the parent
    const {buttonID, open, handleClose} = props;
    //Retrieve user data
    const {user} = useAuth();
    //New data entered by the user
    const [newUser, setUser] = React.useState(user);

    //When the user clicks CANCEL or clicks on the backdrop
    const checkData = () => {
        //Set the user to the old state
        setUser(user);
        console.log(newUser);
        //Clear errors
        setError({});
        //Close dialog
        handleClose();
    }

    //When the user clicks on SAVE
    const saveData = (e) => {
        // console.log(newUser);
        // handleClose();

        e.preventDefault();
        //Check if all the inputs are valid
        const newError = findErrors();

        //Proceed to the next step if inputs are valid
        if(Object.keys(newError).length > 0){
          //Found errors and set the errors to the useState
          setError(newError);
        }else{
          handleClose();
          //Clear errors
          setError({});

          //Refresh the page
          window.location.reload();
          
          delete newUser.password;
          console.log(newUser);
        }
    }

    //Input validation
    const [error, setError] = React.useState({});

    const findErrors = () => {
        const errorFound = {};
        
        if(buttonID == "user-info"){
            if (!newUser.firstName.match(/^[a-zA-Z]+$/)) {
                errorFound.firstName = "First name should contain letters only.";
            }
    
            if (!newUser.lastName.match(/^[a-zA-Z]+$/)) {
                errorFound.lastName = "Last name should contain letters only.";
            }

            //Birthday constraint
        }

        if(buttonID == "account-info"){
            //Email constraint
        }

        if(buttonID == 'pass'){
            if(newUser.oldPass != ''){
                //check username and password
            }

            if (!newUser.password || newUser.password === '') { //Blank password
                errorFound.password = 'Password cannot be empty';
            } else if (newUser.password.length < 6) { //Password too short
                errorFound.password = 'Password must be more than 6 characters';
            } else if (newUser.password.includes(' ')) { //Password has a whitespace
                errorFound.password = 'Password must not contain a whitespace';
            }
        }

        if(buttonID == 'flat-info'){
            //Address constraint

            if(newUser.existingFlatmates < 0){
                errorFound.flatmates = 'Invalid value.'
            }

            if(newUser.description === '' || !newUser.description){
                errorFound.description = 'This field cannot be empty.';
            }
        }

        if(buttonID == "flatee-info"){
            //Flatee constraint
        }

        console.log('err', errorFound);
        return errorFound;
    }

    //Render component
    return (
    <div>
      <Dialog
        disableEscapeKeyDown = "true"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        onBackdropClick = {checkData}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit"}</DialogTitle>
        <DialogContent>
            <Box
            sx={{
            display: 'flex',
            '& > :not(style)': {
                m: 1,
                minWidth: 500,
            },
            }}
            >
                {renderComponents(buttonID, newUser, setUser, error)}
            </Box>

            <DialogActions>
                <Button onClick={checkData}>Cancel</Button>
                <Button onClick={saveData}
                variant = "contained"
                color = "primary"
                >
                    Save
                </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
