import React from 'react';
import NavBar from './NavBar.js';
import {Link} from 'react-router-dom';
class Menu extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div className="menu-item-div"><Link className="menu-item" to="/">HOME</Link></div>
                <div className="menu-item-div"><Link className="menu-item" to="/signup">SIGN UP</Link></div>
                <div className="menu-item-div"><Link className="menu-item" to="/login">LOG IN</Link></div>
                <div className="menu-item-div"><Link className="menu-item" to="/profile">YOUR PROFILE</Link></div>      
            </div>
        )
    }
}
export default Menu;