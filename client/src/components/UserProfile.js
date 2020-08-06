import React, { useEffect, useRef } from "react"
// import { useGlobalStore } from "./GlobalStore"
import API from "./API"

function UserProfile() {
    // eslint-disable-next-line
    // const [ globalData, dispatch ] = useGlobalStore()
    // console.log( `[UserProfile] globalData:`, globalData )

    const inputFirstName = useRef()
    const inputLastName = useRef()
    const inputEmail = useRef()
    const inputAddress = useRef()
    const inputLocation = useRef()
    const inputNotes = useRef()
    // const inputAvatar = useRef()

    async function getUser( session ){
        const apiResult = await API.get( '/api/user/session', session )
        // console.log('[getUser] ', apiResult)
        return apiResult
    }

    // at startup we initialize a few things
    useEffect( async function(){
        let userData = await getUser(localStorage.session)
        console.log('[UserProfile] userData ', userData)

        inputEmail.current.value = localStorage.email || 'this is empty'
        inputFirstName.current.value = userData[0].firstName
        inputLastName.current.value = userData[0].lastName
        inputEmail.current.value = userData[0].userEmail
        inputAddress.current.value = userData[0].userAddress
        inputLocation.current.value = userData[0].userLocation
        inputNotes.current.value = userData[0].userNotes
        // inputAvatar.current.value = userData[0].thumbnail
    }, [] )

    // function previewImg(event) {
    //     let output = inputAvatar.current.value
    //     console.log('[previewImg] output: ', output)
    //     output.src = URL.createObjectURL(event.target.files[0])
    //     output.onload = function () {
    //         URL.revokeObjectURL(output.src) // free memory
    //     }
    // }

    return (
        <div style={{marginTop: '150px'}}>  
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
                <input type="text" aria-label="Address" ref={inputAddress}  class="form-control"></input>
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* location (nearest intersection) and save button */}
            <p>What is your closest major intersection?</p>
            <div class="input-group">
                <input type="text" aria-label="Location" ref={inputLocation}  class="form-control"></input>
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* <div class="form-group">
                        <label for='imageFile'>
                            <h5>Avatar</h5>
                        </label>
                        <input type="file" id="imageFile" name='imageFile' 
                            accept="image/*" class='form-control' onChange='previewImg(event)'/>
                        <img src={inputAvatar} class="card-img-top img-fluid" ref={inputAvatar}
                        alt="example" />
            </div> */}
            {/* notes and save button */}
            <p>Please add any notes we should know about you (ie: ...dietary restrictions? ...what you like to cook? ...what you like to eat? ...are you social? etc etc.)</p>
            <div class="input-group input-group-lg">
                <textarea class="form-control" aria-label="With textarea" ref={inputNotes}></textarea>
            </div>
            <button type="button" class="btn btn-primary">Save</button>
        </div>
    )
}

export default UserProfile;
