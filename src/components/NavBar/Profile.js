import React from 'react'

const Profile = (props) => {
    const {user} = props;
    return (
        <div>
            <h6>username: {user.username}</h6>
        </div>
    )
}

export default Profile
