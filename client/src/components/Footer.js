import React from 'react';
import {Link} from 'react-router-dom';
class Footer extends React.Component{
    render(){
        return(
            <div className="footer">
                <div><Link to="/contact" className="menu-item">Contact us</Link></div>
                <div><Link to="/aboutus" className="menu-item">About us</Link></div>      
                <div><Link to="/privacy" className="menu-item">Privacy policy</Link></div>
                {/*<div>Locate us on a map</div>*/}
            </div>
        )
    }
}
export default Footer;