import React from 'react';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import {Link} from 'react-router-dom';

class Homepage extends React.Component{
    state={
        indexImgs: 0
    }
    handleClick(delta) {
        let imgs=["/img/chambreln.jpg","/img/maison.jpg","/img/garden.jpg"]
        let length = imgs.length
            this.setState(prevState => ({
            indexImgs: (prevState.indexImgs + delta + length) % length
        }))
      }
    render(){
        let imgs=["/img/chambreln.jpg","/img/maison.jpg","/img/garden.jpg"]
        let src = imgs[this.state.indexImgs]
        return(
            <div>
                <NavBar/>
                <div className="container-for-tag">
                    <img className="arrow-left" onClick={()=>this.handleClick(-1)} src="/img/icons8-chevron-left-30.png" alt="left-arrow"/>
                    <img className="homepage-pictures"
                        src={src}
                        alt="carousel" />
                    {/*<img src="/img/maison.jpg" alt="maison"/>*/}
                    <img className="arrow-right" onClick={()=>this.handleClick(1)} src="/img/icons8-chevron-right-30.png" alt="right-arrow"/>
                    <p className="tag price-tag">Price at 60€/night</p>
                    <Link to="/booking/availability-request" className="tag booking-tag">Booking</Link>
                </div> 
                <p className="description-text">Private bedroom at walking distance from Westfield Les 4 Temps (largest shopping center in Europe), at 30 min from Champs-Elysées/ Jardin du Luxembourg/Odéon/Notre Dame</p> 
                <Footer/>
            </div>
        )
    }
}
export default Homepage;