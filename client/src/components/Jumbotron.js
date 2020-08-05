import React from 'react'

const Jumbotron = () => {
    return (
        <div>
            <div className="container">
                <div className = "jumbotron jumbotron-fluid" id="jumbotron" style={{backgroundImage: 'url(JumbotronImage.jpg)', border: 'solid white 1px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '30px'}}>
                    <div className="w3-display-container" id="home" style={{marginTop: '200px', backgroundImage: 'url(JumbotronImage.jpg)'}}>
                        <div className="w3-display-middle" style={{whiteSpace: 'nowrap'}}>
                            <span className=" w3-center w3-padding-large w3-black w3-xlarge w3-wide ">Friendly<span className="w3-hide-small">
                                <img src="FFLogo.png" id="centerLogo"></img>
                            </span>Forks</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron;
