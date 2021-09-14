import React from 'react'
import photo from '../assets/Trixie-Mattel.jpg'

const ProfileTabs = () => {
    return (
        <div className = "profile-tab">
            <div className = "main-tab">
                <button className = "account-btn">
                <img src = {photo} className = "avt-icon"/>
                <h2 style = {{padding: "10px", color: "white"}}>Name</h2>
                </button>
            </div>
            <div className = "base-line">
            <h5>Account Setting</h5>
            </div>

            <div className = "base-line">
            <h5>Preferred Locations</h5>
            </div>

        </div>
    )
}

export default ProfileTabs
