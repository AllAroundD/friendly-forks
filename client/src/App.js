import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { GlobalStore } from './components/GlobalStore'
import NavBar from './components/NavBar'

import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import LogoutPage from './components/LogoutPage'
import Footer from './components/Footer'
import ProfilePage from './pages/Profile'
import AboutPage from './pages/About'
import Jumbotron from './components/Jumbotron'
// import ProfilePage from './components/UserProfile'

import './App.css'

function App() {
    
    return (
        <GlobalStore> {/* provides common elements across components */}
            <Router>
                <div className="App">
                    <NavBar />
                    <div class="w3-main" style={{marginLeft: '340px', marginRight: '40px'}}>
                        <Jumbotron></Jumbotron>
                    <div class="container">
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/logout" component={LogoutPage} />
                    </div>

                    <Footer />
                </div>
                </div>
            </Router>
        </GlobalStore>
    )
}

export default App