import React, { useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

import { GlobalStore } from './components/GlobalStore'
import NavBar from './components/NavBar'

import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import Footer from './components/Footer';

function App() {

    let [ isAuthenticated, setAuthenticated ] = useState( false )

    function loginComplete () {
        setAuthenticated (true)
    }
    return (
        <GlobalStore> {/* provides common elements across components */}

            <Router>
            { !( window.location.href==='/register'  || isAuthenticated ) ? <Redirect to='/login' /> : '' }       {/* added landing */} {/*//TODO set page to landing page */}
                <div className="App">
                    <NavBar />
                    <div class="container">

                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path='/login'>
                            <LoginPage loginComplete={loginComplete} />
                        </Route>
                        <Route exact path="/logout" component={LogoutPage} />
                    </div>

                    <Footer />
                </div>
            </Router>
        </GlobalStore>
    )
}

export default App