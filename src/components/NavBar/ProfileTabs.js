import React from 'react'
import photo from '../assets/Trixie-Mattel.jpg';
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { withRouter } from 'react-router';

const ProfileTabs = (props) => {
    const onClick = () => {
        console.log('clicked')
        props.history.push("/profile");
    }
    return (
        <div className = "profile-tab">
            <div className = "main-tab" onClick = {onClick}>
                <button className = "account-btn">
                <img src = {photo} className = "avt-icon"/>
                <h2 style = {{padding: "10px", color: "white"}}>Name</h2>
                </button>
            </div>

            <div className = "base-line">
            <h5>Listing</h5>
            <div className = "display-listing">
            <div className = "listing">
                <IconButton onClick = {() => props.history.push("/home/")}>
                    <ControlPointIcon/>
                </IconButton>
            </div>
            </div>
            </div>

            <div className = "base-line">
            <div className = "display-button">
            <h5>Account Setting</h5>
            <IconButton>
                <CreateIcon/>
            </IconButton>
            </div>
            <div className = "profile-info">
                <h6>Username</h6>
                <p style = {{color:"grey"}}>username here</p>
            </div>

            <div className = "profile-info">
                <h6>Email</h6>
                <p style = {{color:"grey"}}>email@gmail.com</p>
            </div>
            </div>

            <div className = "base-line">
            <div className = "display-button">
            <h5>Preferred Locations</h5>
            <IconButton>
                <CreateIcon/>
            </IconButton>
            </div>
            <div className = "profile-info">
                <h6>City</h6>
                <p style = {{color:"grey"}}>city</p>
            </div>
            <div className = "profile-info">
                <h6>Suburb</h6>
                <p style = {{color:"grey"}}>suburb</p>
            </div>
            
            </div>

        </div>
    )
}

export default withRouter(ProfileTabs)
