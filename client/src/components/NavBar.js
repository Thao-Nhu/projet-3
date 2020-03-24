import React from 'react';
import {Link} from 'react-router-dom';
class NavBar extends React.Component{
    render(){
        return(
            <div className="nav-bar">
                <Link to="/"  className="bb-name"><div>LN Bed & Breakfast</div></Link>
                <div className="menu-logo"><Link to="/menu"><img className="menu-logo-img" src="/img/festivalclaca.cat-hamburger-icon-png-43869.png" alt="menu"/></Link></div> 
                      
            </div>
        )
    }
}
export default NavBar;