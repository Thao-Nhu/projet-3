import React from 'react';
import NavBar from './NavBar.js';
class Aboutus extends React.Component{
    render(){
        return(
            <div>
            <NavBar/>
            <div className="message">
                We are an Italian-Vietnamese couple. We love meeting new people and making new friends. We speak English, French, Italian, Vietnamese and Spanish. We will make you feel at home during your stay at LN Bed&Breakfast. 
            </div>
            <img src="/img/ln.jpg" alt="uspicture"/>
            </div>
        )
    }
}
export default Aboutus;