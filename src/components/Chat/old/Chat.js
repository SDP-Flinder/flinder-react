import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from './Events'
import ChatContainer from './ChatContainer'
import { Box } from '@mui/system';
import { AppBar, CssBaseline } from '@mui/material';
import { Toolbar, Typography } from '@material-ui/core';

const socketUrl = "http://localhost:3231"
export default class Chat extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket:null,
	  	user:null
	  };
	}

	UNSAFE_componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			console.log("Connected");
		})
		
		this.setState({socket})
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	setUser = (user)=>{
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user);
		this.setState({user})
	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = ()=>{
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({user:null})

	}


	render() {
        const drawerWidth = 240;
		const { title } = this.props
		const { socket, user } = this.state
		return (
			<Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
                    </Toolbar>
                </AppBar>
				<ChatContainer socket={socket} user={user} logout={this.logout}/>
			</Box>
		);
	}
}