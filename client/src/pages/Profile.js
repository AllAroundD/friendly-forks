import React from 'react'
import UserProfile from '../components/UserProfile'
import AddEvent from "../components/AddEvent"

function Profile () {
    return (
        <div>
             <h1 className="profilepageTitle">Your Profile Page</h1>
            <UserProfile />
            <AddEvent />
        </div>
    )
}

export default Profile
