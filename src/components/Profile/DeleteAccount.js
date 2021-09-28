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



async function FetchToken() {
    let token = '';
  
    const account = {
      username: 'admin',
      password: 'admin'
    };
  
    await axios.post('http://localhost:4000/users/authenticate', account)
      .then(res => {
        token = res.data.token;
      });
    return token;
}

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
    const [open, setOpen] = React.useState(false);
    const {user} = useAuth();
    const [confirm, setConfirm] = React.useState(false);

    let { from } = { from: { pathname: "/logout" } };


    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    }
  
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
