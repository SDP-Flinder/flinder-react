import React from 'react'
import photo from '../assets/Trixie-Mattel.jpg'

const ProfileDisplay = () => {

    return (
        <div className = "profile-display">
            <img src = {photo} className = "avt-display"/>
            <h4 className = "base-line">Username Age</h4>
            <p className = "base-line">This is the description</p>
            <div className = "habits">
            <p className = "habit">Couple</p>
            <p className = "habit">Smoker</p>
            <p className = "habit">Has Pet</p>
            </div>
            <div className = "button-wrapper">
             <button className = "profile-edit"> Edit</button>
            </div>
        </div>
    )
}

export default ProfileDisplay
