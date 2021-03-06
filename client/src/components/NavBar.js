import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGlobalStore } from './GlobalStore';
import { Redirect } from 'react-router-dom';
import API from './API'

// eslint-disable-next-line
let showTimeout,serverInterval;
let prevLocation;

/* activePage  | changePage-call-back */
function NavBar() {
    const [ showMenu, setShowMenu ] = useState( false );
    const [ invalidSession, setInvalidSession ] = useState( false );
    const [ globalData, dispatch ] = useGlobalStore();

    const location = useLocation();
    // eslint-disable-next-line
    const style = {
        logo: { width: '64px', height: '64px' }
    }

    function checkSession(){
    // force redirection if no session & yet not login/reg pages
        const isSessionExisting = localStorage.session && localStorage.session.length===36;
        const isUrlNotRequiringLogin = location.pathname==='/login' || location.pathname==='/register';
        console.log( `[Navbar] isSessionExisting(${isSessionExisting}) isUrlNotRequiringLogin(${isUrlNotRequiringLogin}): ${!isSessionExisting && !isUrlNotRequiringLogin}` );
        setInvalidSession( !isSessionExisting && !isUrlNotRequiringLogin );
    }

    async function checkServer(){
        try {
            const apiServerStatus = await API.get('/server-status')
            if( apiServerStatus.status==='running' ){
                // if server status was not good before, then we probably have a message of this
                // so clear it.
                if( globalData.serverStatus !== 'running') {
                    dispatch( { do: 'clearMessage' } );
                }

            } else {
                dispatch( { do: 'setMessage', type: 'danger', message: apiServerStatus.error } );
                console.log( '[App] Server is not running, show an error...' );
            }
        } catch( e ){
            dispatch( { do: 'setMessage', type: 'danger', message: 'Server down...' } );
        }
    }


    useEffect( function(){
        checkSession();

        // and do a periodic check on the server, indicating a problem if server is down
        setInterval( checkServer, 15000 );
        checkServer();
    }, [] );

    if( showMenu ){
    // hide the nav after 10s
        clearTimeout( showTimeout );
        showTimeout = setTimeout( function(){
            setShowMenu( false );
        }, 2000 );
    }

    // if we change locations, hide menu immediately
    if( prevLocation!==location.pathname ){
        console.log( '**** > location changed, hiding menu')
        clearTimeout( showTimeout );
        showTimeout = setTimeout( function(){
            setShowMenu( false );
        }, 100 );
        // setShowMenu( false );
        prevLocation = location.pathname;
    }

    //Open sidebar menu
    function openSidebar() {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
      }
    
    //Close sidebar menu
    function closeSidebar() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
    }

    function toggleMenu(){
        setShowMenu(!showMenu)
    }


    return (
    <div>
    { invalidSession ? <Redirect to='/login' /> : '' }
        <nav className="w3-sidebar w3-light-green w3-collapse w3-top w3-large w3-padding" style={{zIndex:'3', width: '300px', fontWeight: 'bold', display: showMenu ? "block" : "none"}}><br />
            <a href="javascript:void(0)" onClick="closeSidebar()" className="w3-button w3-hide-large w3-display-topleft" style={{width: '100%', fontSize: '22px'}} />
            <div className="w3-container">
                {/* <h2 className="w3-padding-12"><br />Friendly<br />Forks<br /></h2> */}
            </div>
            <div className="w3-bar-block navBlock">
                <a href="/" onClick="closeSidebar()" className="w3-bar-item w3-button w3-hover-white d-flex justify-content-center navTAB">Home</a> 
                <a href="/events" onClick= {closeSidebar} className="w3-bar-item w3-button w3-hover-white d-flex justify-content-center navTAB">Events</a> 
                { localStorage.session ? 
                <a href="/profile" onClick={closeSidebar} className="w3-bar-item w3-button w3-hover-white d-flex justify-content-center navTAB">Profile</a>
                :
                ''
                } 
                <a href="/about" onClick= {closeSidebar}  className="w3-bar-item w3-button w3-hover-white d-flex justify-content-center navTAB">About</a>
                { localStorage.session ? 
                <a href="/logout" onClick= {closeSidebar} className="w3-bar-item w3-button w3-hover-white d-flex justify-content-center navTAB ">Logout</a>
                :
                <a href="/login" onClick= {closeSidebar} className="w3-bar-item w3-button w3-hover-white d-flex justify-content-center navTAB">Login</a>
                } 
                <p className="Footer">&copy; 2020 The Virtual Reactors</p>
            </div>
        </nav>

        {/* Adjustment for smaller screens */}
        <header className="w3-container w3-top w3-hide-large w3-light-green w3-xlarge w3-padding">
        <a href="javascript:void(0)" className="w3-button w3-light-green w3-margin-right myHamburger" onClick= {toggleMenu}  id= "myHamburger" >☰</a>
        {/* <span>Friendly Forks</span> */}
        </header>

        {/* Overlay effect when opening sidebar on small screens */}
        <div className="w3-overlay w3-hide-large" onClick= {openSidebar} style={{cursor: 'pointer', display: showMenu ? "block" : "none" }} id="myOverlay"></div>
                <div className='container'>

            {/* show user session info */}
            { globalData.name ? <div className='d-block'>{ globalData && globalData.thumbnail ? <img src={globalData.thumbnail} id='navThumbnail' alt=''/> : '' } Welcome {globalData.name}</div> : '' }
            {/* show a global message bar below the nav */}
            <div className={ globalData.messageType ? `alert alert-${globalData.messageType}` : 'd-hide' } role="alert">
                {globalData.message}
            </div>
        </div>
    </div>
    );
}

export default NavBar;