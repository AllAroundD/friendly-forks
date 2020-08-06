import React from 'react'

const AboutCards = (props) => {
    return (
        <div>
            <section className="hero-section" target="_blank" rel="noopener noreferrer">
                <div className="card-grid">
                    <a className="aboutCard" href="https://www.linkedin.com/in/shayanne-samarasinghe-48569111a/">
                    <div className="card__background" style={{backgroundImage: 'url(https://avatars3.githubusercontent.com/u/64742100?s=400&u=38ef82a896aa1b3e518a544f1a6e658f0b0f0163&v=4)'}}></div>
                    <div className="card__content">
                        <h5 className="card__heading">Shayanne Samarasinghe</h5>
                        <p className="card__category">Full-stack Developer</p>
                    </div>
                    </a>
                    <a className="aboutCard" href="https://www.linkedin.com/in/doug-moore-dev/" target="_blank" rel="noopener noreferrer">
                    <div className="card__background" style={{backgroundImage: 'url(https://avatars3.githubusercontent.com/u/64918107?s=400&u=4277fa2bf868713adec524f08700cee517941e82&v=4)'}}></div>
                    <div className="card__content">
                        <h5 className="card__heading">Doug Moore</h5>
                        <p className="card__category">Full-stack Developer</p>
                    </div>
                    </a>
                    <a className="aboutCard" href="https://www.linkedin.com/in/christinemclemens/" target="_blank" rel="noopener noreferrer">
                    <div className="card__background" style={{backgroundImage: 'url(https://avatars0.githubusercontent.com/u/64107231?s=460&u=6e6a4ed7a86a7651deae06c450442e76a1bca446&v=4)'}}></div>
                    <div className="card__content">
                        <h5 className="card__heading">Christine Clemens</h5>
                        <p className="card__category">Full-stack Developer</p>
                    </div>
                    </a>
                    <a className="aboutCard" href="https://www.linkedin.com/in/saquib-ahmed-985933125/"  target="_blank" rel="noopener noreferrer">
                    <div className="card__background" style={{backgroundImage: 'url(https://avatars1.githubusercontent.com/u/64999092?s=400&u=4b2277cde7a925bbbe22f1e29b213cbe4d05a954&v=4)'}}></div>
                    <div className="card__content">
                        <h5 className="card__heading">Saquib Ahmed</h5>
                        <p className="card__category">Frontend Developer</p>
                    </div>
                    </a>
                </div>
            </section>
        </div>
    )
}

export default AboutCards;
