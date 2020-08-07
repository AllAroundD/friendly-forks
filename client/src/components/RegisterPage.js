import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { useGlobalStore } from "./GlobalStore";
import API from "./API";

function RegisterPage(){
    // DECLARATIVE FORM OF PROGRAMMING
    // eslint-disable-next-line
    const [ globalData, dispatch ] = useGlobalStore();
    const [ userData, setUserData ] = useState({ firstName: "", lastName: "", userEmail: "", password: "", userAddress: "", userLocation: "", userNotes: ""});
    const [ isRegistered, setIsRegistered ] = useState( false );

    const inputFirstName = useRef()
    const inputLastName = useRef()
    const inputEmail = useRef()
    const inputAddress = useRef()
    const inputLocation = useRef()
    const inputNotes = useRef()
    const inputPassword = useRef()

    function handleInputChange( e ){
        const { id, value } = e.target //

        setUserData( { ...userData, [id]: value } )
    }

    async function registerUser( e ){
        e.preventDefault();
        
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

        if( inputPassword.current.value.trim() === "" ) {
            inputPassword.current.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a password' } )
            return
        }

        if( inputPassword.current.value.trim().length < 8 ) {
            inputPassword.current.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please provide a longer password (8 characters min)!' } )
            return
        }

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

        const apiResult = await API.post('/api/user/register', userData);
                  
        if( apiResult.error ){
            dispatch( { do: 'setMessage', type: 'danger', message: apiResult.error } );
            return;
        }

        // remember the email
        localStorage.email = apiResult.rememberMe ? apiResult.email : '';

        dispatch( { do: 'setMessage', type: 'success', message: 'You have successfully registered' } );

        // let the message sit for a bit then redirect to login
        setTimeout( function(){ setIsRegistered(true); }, 5000 );
    }

    return (
        <div>
            { isRegistered ? <Redirect to='/login' /> : '' }
            <div class="container">
                <h1 className="registrationTitle">User Registration</h1>
            </div>
            <div class="card-body">
                <form>
                    <input type='hidden' id='db_id' value='' />
                    <div class="form-group">
                        <label for="firstName"></label>
                        <input value={userData.firstName} 
                            onChange={handleInputChange} 
                            id='firstName' 
                            ref={inputFirstName}
                            type="text" class="form-control" placeholder="What is your first name?"/>
                    </div>
                    <div class="form-group">
                        <label for="LastName"></label>
                        <input value={userData.lastName} 
                            onChange={handleInputChange} 
                            id='lastName' 
                            ref={inputLastName}
                            type="text" class="form-control" placeholder="What is your last name?" />
                    </div>
                    <div class="form-group">
                        <label for="email"></label>
                        <input 
                            value={userData.email} 
                            onChange={handleInputChange} 
                            ref={inputEmail}
                            id="userEmail" type="email" class="form-control"  placeholder="What is your Email address"/>
                    </div>
                    <div class="form-group">
                        <label for="userPassword"></label>
                        <input 
                            value={userData.password} 
                            onChange={handleInputChange} 
                            ref={inputPassword}
                            id="userPassword" type="password" class="form-control" placeholder="Please make a password" />
                    </div>
                    <div class="form-group">
                        <label for="name"></label>
                        <input value={userData.address} 
                            onChange={handleInputChange} 
                            id='userAddress' 
                            ref={inputAddress}
                            type="text" class="form-control" placeholder="What is your address? Please include special instruction if relevant." />
                    </div>
                    <div class="form-group">
                        <label for="location"></label>
                        <input value={userData.location} 
                            onChange={handleInputChange} 
                            id='userLocation'
                            ref={inputLocation} 
                            type="text" class="form-control" placeholder="What is your closest major intersection" />
                    </div>
                    <div class="form-group">
                        <label for="UserNotes"></label>
                        <textarea value={userData.notes} onChange={handleInputChange} id='userNotes' type="text"  ref={inputNotes} placeholder="Please add any notes we should know about you (ie: ...dietary restrictions? ...what you like to cook? ...what you like to eat? ...are you social? etc etc.)" class="form-control" />
                    </div>
                    <input type="hidden" id="thumbnail" value="" />
                    <button onClick={registerUser} class="btn btn-primary submit registersaveButton" >Register</button>
                    &nbsp; &nbsp; <a href="/login" class='font-weight-light text-muted alreadyRegister'>Already Registered?</a>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;