import React, { Component } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox'; 
import MailIcon from '@mui/icons-material/Mail';
import { Drawer, Toolbar, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

const drawerWidth = 240;

export default class SideBar extends Component{
	constructor(props){
		super(props)
		this.state = {
			reciever:""
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { reciever } = this.state
		const { onSendPrivateMessage } = this.props

		onSendPrivateMessage(reciever)
	}

	render(){
		const { chats, activeChat, user, setActiveChat, logout } = this.props
		const { reciever } = this.state
		return (
            <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
		);
	
	}
}
