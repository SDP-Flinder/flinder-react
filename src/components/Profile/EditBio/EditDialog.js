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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const renderComponents = (buttonID, newUser, setUser) => {
    switch (buttonID){
        case 'user-info':
            return (<UserInformation newUser = {newUser} setUser = {setUser}/>);
        case 'account-info':
            return (<AccountInformation newUser = {newUser} setUser = {setUser}/>);
        case 'flat-info':
            return (<FlatInformation newUser = {newUser} setUser = {setUser}/>);
        case 'flatee-info':
            return (<FlateeInforamtion newUser = {newUser} setUser = {setUser}/>);
        case 'pass':
            return (<ChangePass newUser = {newUser} setUser = {setUser}/>);
        default:
            return (<p>Fuck!!!</p>);
    }
}

export default function EditDialog(props) {

    const {buttonID, open, handleClose} = props;

    const {user} = useAuth();

    const [newUser, setUser] = React.useState(user);

    const checkData = () => {
        //Set the user to the old state
        setUser(user);

        handleClose();
    }

    const saveData = () => {
        console.log(newUser);
        handleClose();
    }

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
                {renderComponents(buttonID, newUser, setUser)}
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
