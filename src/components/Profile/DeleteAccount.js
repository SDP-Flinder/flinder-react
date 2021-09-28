import { Button } from '@material-ui/core'
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../App/Authentication';
import {ReactComponent as FlinderLogo} from '../assets/logo.svg';
import axios from 'axios';
import {Config} from '../../config';
import { Redirect } from "react-router-dom";

//Get the token to retrive data
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

//Delete the user from the database
async function deleteUser(user) {
    let token = await FetchToken();

    let URL = Config.Local_API_URL;
    const USER_TOKEN = token;
    const AuthString = 'Bearer '.concat(USER_TOKEN);

    URL += '/users/';
    URL += user.id;

    axios.delete(URL, {
        headers: {
          Authorization: AuthString
        }});
    console.log(URL);
}
  
//Render the Dialog component
const renderDialog = (open, handleCancel, handleClose) => (
    <Dialog open={open} onClose={handleClose}>
        <FlinderLogo className = "logo-display"/>
        <DialogTitle>DELETE YOUR ACCOUNT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By deleting your account, you will no longer be able to use Flinder or receiving any notifications from us. <br/>
            If you want to take a break from Flinder, you can just log out instead.<br/>
            If you want to permanently delete your account, click CONFIRM.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose} variant = "contained" color = "primary">Confirm</Button>
        </DialogActions>
      </Dialog>
)

const DeleteAccount = () => {
    //Manage the open state of the Dialog
    const [open, setOpen] = React.useState(false);

    //Retrive user information
    const {user} = useAuth();

    //Confirm delete
    const [confirm, setConfirm] = React.useState(false);

    let { from } = { from: { pathname: "/logout" } };

    //Open the dialog
    const handleClickOpen = () => {
      setOpen(true);
    };

    //Cancel delete
    const handleCancel = () => {
        setOpen(false);
    }
  
    //Confirm delete
    const handleClose = () => {
      deleteUser(user);
      setConfirm(true);
      setOpen(false);
    };

    return (
        <div>
            {confirm && <Redirect to={from} />}

            <Button variant="outlined" onClick={handleClickOpen} >
                DELETE ACCOUNT
            </Button>

            {renderDialog(open, handleCancel, handleClose)}
        </div>
    )
}

export default DeleteAccount
