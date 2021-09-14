import React from 'react'
import ProfileDisplay from './ProfileDisplay';
import ProfileTabs from './ProfileTabs';

const Profile = (props) => {
    return (
        <div className = "profile-layout">
            <ProfileTabs />
            <ProfileDisplay user = {props.user} />
        </div>
    )
}

export default Profile
