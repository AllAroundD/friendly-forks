import React from 'react'
import Jumbotron from '../components/Jumbotron'

const Home = () => {
    return (
        <div>
            <div class="bgimg-1 w3-display-container w3-opacity-min" id="home">
                <div class="w3-display-middle" style={{whitepace: 'nowrap'}}>
                </div>
            </div>
            <h1 className="aboutHome">Welcome!</h1>
             <h3 className="Question">What is Friendly Forks?</h3>
             <p className="Answer">Friendly Forks is a platform where you can meet new and interesting people and share a meal with. Ideal if you are a traveller in a new city or even if you are just looking to make some new friends. You can choose to be a host or a guest. Hosts will provide a meal for up to 3 people, cuisine of their choice while guests will bring along their experiences and charm. Come for the Food, Stay for the Folks. </p>
             <h3 className="Question">Why not a restaurant?</h3>
             <p className="Answer">What restaurant will give you the opportunity to flex your culinary muscles while also making brand new friends?? Friendly Forks does that and more, providing you with a chance to eat with locals and share and regale in their adventures. </p>
             <a href="/register" className='font-weight-light text-muted registerHome'>Want to sign up?</a>
             &nbsp; &nbsp;
             <a href="/login" className='font-weight-light text-muted loginHome'>Already Registered?</a>
             

        </div>
    )
}

export default Home 
