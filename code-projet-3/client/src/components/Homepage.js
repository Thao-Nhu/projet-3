import React from 'react';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import {Link} from 'react-router-dom'

class Homepage extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div className="container-for-tag">
                    <img src="/img/maison.jpg" alt="maison"/>
                    <Link to="/booking/availability-request" className="tag">Booking</Link>
                </div> 
                <p className="description-text">Private bedroom at walking distance from Westfield Les 4 Temps (largest shopping center in Europe), at 30 min from Champs-Elysées/ Jardin du Luxembourg/Odéon/Notre Dame</p> 
                <Footer/>
            </div>
        )
    }
}
export default Homepage;