import React from 'react';
import NavBar from './NavBar.js';
class Contact extends React.Component{
    render(){
        return(
            <div>
            <NavBar/>
            <div className="message">
                If you have any question, you can write to us at thaonhu2710@yahoo.com
            </div>
            </div>
        )
    }
}
export default Contact;