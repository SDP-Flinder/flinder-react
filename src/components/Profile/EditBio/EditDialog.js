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
import { useEffect } from 'react';
import axios from 'axios';
import { Config } from '../../../config';
import { Redirect } from 'react-router';

//Transition effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Render component based on the button clicked
const renderComponents = (buttonID, newUser, setUser, error, oldPass, setOldPass, pw, setPw) => {
    switch (buttonID){
        case 'user-info':
            return (<UserInformation newUser = {newUser} setUser = {setUser} error = {error}/>);
        case 'account-info':
            return (<AccountInformation newUser = {newUser} setUser = {setUser} error = {error}/>);
        case 'flat-info':
            return (<FlatInformation newUser = {newUser} setUser = {setUser} error = {error}/>);
        case 'flatee-info':
            return (<FlateeInforamtion newUser = {newUser} setUser = {setUser} error = {error}/>);
        case 'pass':
            return (<ChangePass newUser = {newUser} setUser = {setUser} error = {error} oldPass = {oldPass} setOldPass = {setOldPass} pw={pw} setPw={setPw}/>);
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
    const [pw, setPw] = React.useState('');

    //Get the data from the database
    const [data, setData] = React.useState({});
    //Get all the user data
    useEffect(() => {
        async function getData() {
          const URL = `${Config.Local_API_URL}/users/`;
          const TOKEN = await FetchToken();
    
          const config = {
            headers: { Authorization: `Bearer ${TOKEN}` }
          };
    
          const userData = await axios.get(URL, config)
    
          setData(userData.data);
        }
        getData();
    }, []);


    //When the user clicks CANCEL or clicks on the backdrop
    const checkData = () => {
        //Set the user to the old state
        setUser(user);
        console.log(newUser);
        //Clear errors
        setError({});
        if(buttonID == "pass")
        setOldPass('');
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

          //Set the display user
          props.setUser(newUser);
          if(buttonID != "pass"){
            updateUser();
            props.handleConfirmationOpen();
          } else if (buttonID == "pass"){
            updateUser();
            //Log out once the user change password
            setChangePw(true);
          }
        }
    }

    //Update the new user information
    const updateUser = async () => {
        console.log('pass is',pw);
        const URL = `${Config.Local_API_URL}/users/`.concat(user.id);
        const TOKEN = await FetchToken();

        const config = {
            headers: { Authorization: `Bearer ${TOKEN}`}
        };

        const bodyParameters = {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            dob: newUser.dob,
            role: newUser.role.toLowerCase(),
            address: newUser.address,
            description: newUser.description,
            existingFlatmates: newUser.existingFlatmates,
            preferredArea: newUser.preferredArea,
            checklist: newUser.checklist,
        };

        if(buttonID == "pass"){
            bodyParameters.password = pw;
        }

        console.log(bodyParameters);

        axios.put(URL, bodyParameters, config);
    }

    //Confirm delete
    const [changePw, setChangePw] = React.useState(false);

    let { from } = { from: { pathname: "/logout" } };

    //Old password edit
    const [oldPass, setOldPass] = React.useState('');
    //Validate old password entered
    const [isIncorrect, setIsIncorrect] = React.useState(false);
    //Check if username and password match
    useEffect(() => {
        async function checkPassword () {
            if(buttonID == "pass"){
                const incorrect = await validatePassword(user.username, oldPass);
                setIsIncorrect(incorrect);
            }
        }

        checkPassword();
    }, [oldPass])

    //Input validation
    const [error, setError] = React.useState({});

    const findErrors = () => {
        const errorFound = {};
        
        if(buttonID == "user-info"){
            if (!newUser.firstName.match(/^[a-zA-Z]+$/)) {
                errorFound.firstName = "This should contain letters only.";
            }
    
            if (!newUser.lastName.match(/^[a-zA-Z]+$/)) {
                errorFound.lastName = "This should contain letters only.";
            }
        }

        if(buttonID == "account-info"){
            //Email constraint
            if (!newUser.email || newUser.email === '') { //Blank email
                errorFound.email = 'Email cannot be empty';
              } else if (!newUser.email.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
                errorFound.email = 'Please enter a valid email address';
            }

            for(let k = 0; k < data.length; k++){
                if(data[k].email == newUser.email && data[k].username != newUser.username){
                    errorFound.email = 'Email has already been used.';
                }
            }
        }

        if(buttonID == 'pass'){

            if (!oldPass || oldPass === '') { //Blank password
                errorFound.oldPass = 'Old password cannot be empty';
            }

            if(oldPass != ''){
                if(isIncorrect == true){
                    errorFound.oldPass = 'Incorrect password';
                }
            }

            if (!pw || pw === '') { //Blank password
                errorFound.password = 'Password cannot be empty';
            } else if (pw.length < 6) { //Password too short
                errorFound.password = 'Password must be more than 6 characters';
            } else if (pw.includes(' ')) { //Password has a whitespace
                errorFound.password = 'Password must not contain a whitespace';
            }
        }

        if(buttonID == 'flat-info'){
            //Address constraint
            if (!newUser.address.street || newUser.address.street === ''){
                errorFound.street = "Street cannot be empty";
            }


            for(let k = 0; k < data.length; k++){
                if(data[k].role == 'flat'){
                    if(data[k].address.street.toLowerCase() == newUser.address.street.toLowerCase() && data[k].username != newUser.username){
                        if(data[k].address.suburb.toLowerCase() == newUser.address.suburb.toLowerCase()){
                            if(data[k].address.city.toLowerCase() == newUser.address.city.toLowerCase()){
                                errorFound.street = "This address has already been used.";
                                errorFound.suburb = "This address has already been used";
                            }
                        }
                    }
                }
            }

            if (!newUser.address.city || newUser.address.city === ''){
                errorFound.city = "City cannot be empty";
            } else if( (newUser.address.city.toLowerCase() != "auckland") && (newUser.address.city.toLowerCase() != "wellington")){
                errorFound.city = 'This app is currently available on either Auckland or Wellington.'
            }

            if(newUser.existingFlatmates < 0){
                errorFound.flatmates = 'Please enter any numbers larger than 0.'
            } else if(!newUser.existingFlatmates.match(/^[0-9]+$/)){
                errorFound.flatmates = 'Please enter numbers only'
            }

            if(newUser.description === '' || !newUser.description){
                errorFound.description = 'This field cannot be empty.';
            }
        }

        if(buttonID == "flatee-info"){
            //Flatee constraint
            if((newUser.checklist.priceRange.max - newUser.checklist.priceRange.min) <= 0){
                errorFound.price = "The maximum value must be larger than the minimum."
            }
        }

        console.log('err', errorFound);
        return errorFound;
    }


    //Render component
    return (
    <div>
        
      {changePw && <Redirect to={from} />}
      
      <Dialog
        disableEscapeKeyDown = {true}
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
                {renderComponents(buttonID, newUser, setUser, error, oldPass, setOldPass, pw, setPw)}
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

//Get the admin token
async function FetchToken() {
    let token = '';
  
    const account = {
      username: 'admin',
      password: 'admin'
    };
  
    await axios.post(`${Config.Local_API_URL}/users/authenticate`, account)
      .then(res => {
        token = res.data.token;
      });
    return token;
}

//Validate username and password entered
async function validatePassword(username, password) {
    let incorrect = false;

    await axios.post(`${Config.Local_API_URL}/users/authenticate`, {
        username: username,
        password: password,
    }).then (res => {
        incorrect = false;
    })
    .catch(err => {
        incorrect = true;
    });

    return incorrect;
}
