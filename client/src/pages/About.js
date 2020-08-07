import React from 'react'
import AboutCards from '../components/AboutCards'
import NodeJS from '../public/assets/img/nodejs.png'
import NPMlogo from '../public/assets/img/npmlogo.png'
import ReactLogo from '../public/assets/img/ReactLogo.png'
import jslogo from '../public/assets/img/jslogo.png'
import htmllogo from '../public/assets/img/htmllogo.png'
import w3Logo from '../public/assets/img/w3Logo.png'
import bootstrap from '../public/assets/img/bootstraplogo.png'
import css from '../public/assets/img/csslogo.png'
import sqlLogo from '../public/assets/img/sqllogo.png'




function Profile () {
    return (
        <>
           
      
            <h1 className="aboutTitle">About the Developers</h1>
            <div>
                <p className="aboutBlurb">
                    Hi there. We hope you are enjoying Friendly Forks! We are four humble developers who hoped to bring the world just a little bit closer in these trying times.  We designed Friendly Forks as a place for you to meet new people and learn about the world. If you also want to learn about us click on our faces and follow us on LinkedIn!<br></br> Okay Bye!
                </p>
            </div>
            <AboutCards />
            {/* <div className="container">
                <div className="card Techlogo1">
                <img src={NodeJS} className="TechLogo" alt="logo"/>
                <img src={NPMlogo} className="TechLogo" alt="logo"/>
                <img src={sqlLogo} className="TechLogo" alt="logo"/>
                <img src={ReactLogo} className="TechLogo" alt="logo"/>
                <img src={jslogo} className="TechLogo" alt="logo"/>
                <img src={htmllogo} className="TechLogo" alt="logo"/>
                <img src={css} className="TechLogo"alt="logo"/>
                <img src={w3Logo} className="TechLogo" alt="logo"/>
                <img src={bootstrap} className="TechLogo" alt="logo"/> 
                </div>
            </div> */}
        </>
    )
}

export default Profile
