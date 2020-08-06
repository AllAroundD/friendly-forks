import React, { useEffect, useState, useRef } from "react"
import { useGlobalStore } from "./GlobalStore"
import API from "./API"

function UserProfile() {
    // eslint-disable-next-line
    const [ globalData, dispatch ] = useGlobalStore()
    // console.log( `[UserProfile] globalData:`, globalData )
    const [ isSaved, setIsSaved ] = useState( false )
    let [ userData, setUserData ] = useState({})
    // const [ values, setValues ] = useState([])

    const inputFirstName = useRef()
    const inputLastName = useRef()
    const inputEmail = useRef()
    const inputAddress = useRef()
    const inputLocation = useRef()
    const inputNotes = useRef()
    // const inputAvatar = useRef()

    async function getUser( session ){
        const apiResult = await API.get( '/api/user/session', session )
        console.log('[getUser] ', apiResult)
        return apiResult
    }

    async function getUserData(userData){
        inputFirstName.current.value = userData[0].firstName
        inputLastName.current.value = userData[0].lastName
        inputEmail.current.value = userData[0].userEmail
        inputAddress.current.value = userData[0].userAddress
        inputLocation.current.value = userData[0].userLocation
        inputNotes.current.value = userData[0].userNotes
        // inputAvatar.current.value = userData[0].thumbnail
        // setUserData (userData)
    }
    // let userData
    // at startup we initialize a few things
    useEffect( async function(){

        //TODO move to function and then call function, then call function at the end of submit
        userData = await getUser(localStorage.session)
        // setValues(userData[0])
        console.log('[UserProfile] userData ', userData[0])

        // // inputAvatar.current.value = userData[0].thumbnail
        // setUserData (userData)
        getUserData(userData)
        setUserData (userData[0])
    }, [] )

    // function previewImg(event) {
    //     let output = inputAvatar.current.value
    //     console.log('[previewImg] output: ', output)
    //     output.src = URL.createObjectURL(event.target.files[0])
    //     output.onload = function () {
    //         URL.revokeObjectURL(output.src) // free memory
    //     }
    // }

    function handleInputChange( e ){
        const { name, value } = e.target //
        setUserData( { ...userData, [name]: value } )
    }

    // this is called when user clicks the Save button
    async function saveUser( e ){
        e.preventDefault()
        console.log('[saveUser] userData: ', userData)

        if( inputFirstName.current.value.trim() === "" ) {
            inputFirstName.current.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a first name' } )
            return
        }
        if( inputLastName.current.value.trim() === "" ) {
            inputLastName.current.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a last name' } )
            return
        }
        if( inputEmail.current.value.trim() === "" ||
            // eslint-disable-next-line
            !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail.current.value)) ) {
            inputEmail.current.focus()
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a valid email' } )
            return
        }

        // TODO: ice-ing idea to update password
        // if( inputPassword.current.value.trim() === "" ) {
        //     inputPassword.current.focus();
        //     dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a password' } )
        //     return
        // }

        // if( inputPassword.current.value.trim().length < 8 ) {
        //     inputPassword.current.focus();
        //     dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a longer password (8 characters min)!' } )
        //     return
        // }

        if( inputAddress.current.value.trim() === "" ) {
            inputAddress.current.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide an address' } )
            return
        }
        if( inputLocation.current.value.trim() === "" ) {
            inputLocation.current.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a location' } )
            return
        }


        // console.log ('[saveUser] userData', userData)
        const apiResult = await API.post('/api/user/save', userData);
        // console.log ('[saveUser] apiResult', apiResult)

        if( apiResult.error ){
            dispatch( { do: 'setMessage', type: 'danger', message: apiResult.error } );
            return;
        }

        dispatch( { do: 'setMessage', type: 'success', message: 'Your profile has been successfully saved' } );

        // let the message sit for a bit
        setTimeout( function(){ setIsSaved(true); }, 5000 );
    }

    return (
        <div style={{marginTop: '150px'}}>  
            {/* first name last name inputs and save button */}
            <p>What is your first name and last name?</p>
            <div class="input-group">
                <input type="text" aria-label="First name" id="firstName" name="firstName" ref={inputFirstName}  
                    onChange={handleInputChange} 
                    class="form-control" />
                <input type="text" aria-label="Last name" id="lastName" name="lastName" ref={inputLastName}  
                    onChange={handleInputChange} 
                    class="form-control" />
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* email inputs and save button */}
            <p>What is your email?</p>
            <div class="input-group">
                <input type="text" aria-label="Email" id="userEmail" name="userEmail" ref={inputEmail} 
                onChange={handleInputChange} 
                class="form-control" />
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* address inputs and save button */}
            <p>What is your address (please include special instructions if relevant)?</p>
            <div class="input-group">
                <input type="text" aria-label="Address" id="userAddress" name="userAddress" ref={inputAddress}  class="form-control" 
                onChange={handleInputChange} 
                />
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* location (nearest intersection) and save button */}
            <p>What is your closest major intersection?</p>
            <div class="input-group">
                <input type="text" aria-label="Location" id="userLocation" name="userLocation" ref={inputLocation}  class="form-control" 
                onChange={handleInputChange} 
                />
            </div>
            {/* <button type="button" class="btn btn-primary">Save</button> */}

            {/* TODO ice idea to upload file
            <div class="form-group">
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
                <textarea class="form-control" aria-label="With textarea" id="userNotes" name="userNotes" ref={inputNotes} 
                onChange={handleInputChange}
                />
            </div>
            <button onClick={saveUser} type="button" class="btn btn-primary">Save</button>
        </div>
    )
}

export default UserProfile;
