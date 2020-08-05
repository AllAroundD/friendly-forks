import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { GlobalStore } from './components/GlobalStore'
import NavBar from './components/NavBar'

import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import Footer from './components/Footer';

function App() {
    
    return (
        <GlobalStore> {/* provides common elements across components */}
            <Router>
                <div className="App">
                    <NavBar />
                    <div class="container">

                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/logout" component={LogoutPage} />
                    </div>

                    <Footer />
                </div>
            </Router>
        </GlobalStore>
    )
}

export default App