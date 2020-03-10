import React from 'react';
import NavBar from './NavBar.js'

class Homepage extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div><img src="/img/maison.jpg" alt="maison"/></div> 
                <p className="description-text">Private bedroom at walking distance from Westfield Les 4 Temps (largest shopping center in Europe), at 30 min from Champs-Elysées/ Jardin du Luxembourg/Odéon/Notre Dame</p> 
            </div>
        )
    }
}
export default Homepage;