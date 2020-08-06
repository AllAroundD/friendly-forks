import React from 'react'
import Background from '../public/assets/img/JumbotronImage.jpg'


const Jumbotron = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className = "jumbotron jumbotron-fluid" id="jumbotron" style={{backgroundImage: 'url('+ Background +')', border: 'solid white 1px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '30px', maxHeight: '260px'}}>
                    <div className="w3-display-container" id="home" style={{marginTop: '200px'}}>
                        <div className="w3-display-middle" style={{whiteSpace: 'nowrap'}}>
                            <span className=" w3-center w3-padding-large w3-black w3-xlarge w3-wide ">Friendly<span className="w3-hide-small">
                                <img src={require("../public/assets/img/FFLogo.PNG")} id="centerLogo" alt="logo"></img>
                            </span>Forks</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron;
