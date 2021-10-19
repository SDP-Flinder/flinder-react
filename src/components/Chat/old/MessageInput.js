import React, { Component } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, InputBase, TextField, IconButton } from '@mui/material';

const MessageInputField = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default class MessageInput extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            message:"",
            isTyping:false
        };
	}
	
	handleSubmit = (e)=>{
		e.preventDefault()
		this.sendMessage()
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.state.message)

	}

	componentWillUnmount() {
	  this.stopCheckingTyping()
	}

	sendTyping = ()=>{
		this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
	}

	/*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
	startCheckingTyping = ()=>{
		console.log("Typing");
		this.typingInterval = setInterval(()=>{
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState({isTyping:false})
				this.stopCheckingTyping()
			}
		}, 300)
	}
	
	/*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
	stopCheckingTyping = ()=>{
		console.log("Stop Typing");
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}


	render() {
		const { message } = this.state
		return (
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                {/* <TextField 
                        variant="standard" 
                        id = "message"
                        type = "text"
                        className = "form-control"
                        value = { message }
                        autoComplete = {'off'}
                        placeholder = "Type something interesting"
                        onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
                        onChange = {
                            ({target})=>{
                                this.setState({message:target.value})
                            }
                        }
                        /> */}
                    <MessageInputField>
                        <StyledInputBase
                        placeholder="Message..."
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </MessageInputField>
                    <IconButton 
                        color="inherit"
                        disabled = { message.length < 1 }
                        type = "submit"
                        className = "send"
                    >
                        <SendIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
		);
	}
}