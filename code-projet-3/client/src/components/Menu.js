import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar.js';
class Menu extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div><Link to="/"><button>Home</button></Link></div>
                <div><Link to="/signup"><button>Sign up</button></Link></div>
                <div><Link to="/login"><button>Log in</button></Link></div>
                <div><Link to="/profile"><button>Your Profile</button></Link></div>      
            </div>
        )
    }
}
export default Menu;