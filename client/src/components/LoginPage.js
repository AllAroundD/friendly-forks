import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import API from "./API";
import { useGlobalStore } from "./GlobalStore";
// import OAuth from "./OAuth";

function LoginPage(){
    // DECLARATIVE FORM OF PROGRAMMING
    // TODO remove hard-coding once ready
    // const [ userData, setUserData ] = useState({ name: "", email: localStorage.email, password: "", rememberMe: true });
    const [ userData, setUserData ] = useState({ name: "JohnDoe", email: 'john.doe@gmail.com', password: "testing123", rememberMe: false });
    const [ globalData, dispatch ] = useGlobalStore();

    const inputEmail = useRef();
    const inputPassword = useRef();

    function handleInputChange( e ){
        const { id, value } = e.target; //

        setUserData( { ...userData, [id]: value } );
    }

    function handleCheckbox(){
        setUserData( { ...userData, rememberMe: !userData.rememberMe } );
    }

    function loginComplete( loginData ){        
        dispatch( { do: 'setMessage', type: 'success', message: loginData.message } );
        delete loginData.message;

        // save the active session
        localStorage.session = loginData.session;

        // remember the user session + data
        dispatch( { do: 'setUserData', data: loginData } );

        setTimeout( function(){ 
            dispatch( { do: 'clearMessage' } );
            dispatch( { do: 'loginState', loggedIn: true })
            }, 3000 );

        // console.log(`[LoginPage.js] loginComplete`)
    }

    async function loginUser( e ){
        e.preventDefault()
        if( userData.email === "" ) {
            inputEmail.focus();
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please enter your email!' } );
            return
        }
    
        if( userData.password === "" || userData.password.length < 8 ) {
            inputPassword.current.focus()
            dispatch( { do: 'setMessage', type: 'danger', message: 'Please enter your password!' } );
            return
        }

        console.log(`[loginUser] before /api/user/login (userData)`, userData )
        const apiResult = await API.post( '/api/user/login', userData );
        // console.log('user is logging in...')     
        if( apiResult.error ){
            dispatch( { do: 'setMessage', type: 'danger', message: apiResult.error } );
            // clear any session
            localStorage.session = '';
            return;
        };
        
        loginComplete( apiResult );
        // console.log('login is Complete...')  
    }

    return (
        <div>
            { globalData.loggedIn ? <Redirect to='/' /> : '' }       {/* added landing */} {/*//TODO set page to landing page */}
            <h1 className="loginTitle" style={{marginTop: '80px'}}>Login</h1>

            <div class="container">
                {/* <OAuth providers={['facebook','google']} loginComplete={loginComplete} />
                <div class="card">
                    <div class="card-body"> */}
                    {/* eslint-disable-next-line */}
                    <form role="form">
                        <div class="form-group d-flex justify-content-center">
                            <label for="userEmail"></label>
                            <input 
                                value={userData.email} 
                                onChange={handleInputChange} 
                                ref={inputEmail}
                                id="email" type="email" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="userPassword"></label>
                            <input 
                                value={userData.password} 
                                onChange={handleInputChange} 
                                ref={inputPassword}
                                id="password" type="password" class="form-control" />
                        </div>
                        <div className="container loginButton">
                        <button onClick={loginUser} type="button" className="btn btn-primary submit">Login</button>
                        &nbsp; 
                        </div>
                        <br></br>
                        <div className="container rememberMeBox">
                        <input type="checkbox"
                        checked={userData.rememberMe} onChange={handleCheckbox} />                        
                        <label class='text-secondary' for='rememberMe'>Remember Me</label> &nbsp;
                        </div>
                        <br></br>
                        <div className="container registerButton">
                        <a href="/register">Need to Register?</a>
                        </div>
                    </form>
                    </div>
                {/* </div>
            </div> */}
        </div>
    )
}

export default LoginPage;