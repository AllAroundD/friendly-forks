import React, { useEffect, useRef } from "react"
import { useGlobalStore } from "./GlobalStore"
import API from "./API"


function UserProfile() {
    // eslint-disable-next-line
    // const [ globalData, dispatch ] = useGlobalStore()
    // console.log( `[UserProfile] globalData:`, globalData )

    const inputFirstName = useRef()
    const inputLastName = useRef()
    const inputEmail = useRef()
    // const inputPassword = useRef()

    async function getUser( session ){
        const apiResult = await API.get( '/api/user/session', session )
        console.log('[getUser] ', apiResult)
        return apiResult.userData
    }
    // at startup we initialize a few things
    useEffect( function(){
        let userData = getUser(localStorage.session)
        console.log('[UserProfile] userData ', userData)
        inputEmail.current.value = localStorage.email || 'this is empty'
    }, [] )

    return (
        <div>  
            {/* first name last name inputs and save button */}
            <p>What is your first name and last name?</p>
            <div class="input-group">
                <input type="text" aria-label="First name" ref={inputFirstName}  class="form-control"></input>
                <input type="text" aria-label="Last name" ref={inputLastName}  class="form-control"></input>
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* email inputs and save button */}
            <p>What is your email?</p>
            <div class="input-group">
                <input type="text" aria-label="Email" ref={inputEmail}  class="form-control"></input>
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* address inputs and save button */}
            <p>What is your address (please include special instructions if relevant)?</p>
            <div class="input-group">
                <input type="text" aria-label="Address" placeholder="Address..." class="form-control"></input>
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* location (nearest intersection) and save button */}
            <p>What is your closest major intersection?</p>
            <div class="input-group">
                <input type="text" aria-label="Location" placeholder="Nearest intersection..." class="form-control"></input>
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* notes and save button */}
            <p>Please add any notes we should know about you (ie: ...dietary restrictions? ...what you like to cook? ...what you like to eat? ...are you social? etc etc.)</p>
            <div class="input-group input-group-lg">
                <textarea class="form-control" aria-label="With textarea" placeholder="Notes..."></textarea>
            </div>
            <button type="button" class="btn btn-primary">Save</button>
        </div>
    )
}

export default UserProfile;
