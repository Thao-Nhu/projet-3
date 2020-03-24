import React from 'react';
import {Link} from 'react-router-dom';
import AuthService from './auth/auth-service.js';
import NavBar from './NavBar.js'
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logout:false
        }
        this.service=new AuthService()
    }
    logoutUser=()=>{
        this.service.logout()
        .then(()=>{
            this.props.getUser(null)
            this.setState({
                logout:true
            })
        })
    }
    render(){
        return(
            <div>
                <NavBar/>
                {this.props.userInSession?
                    <div>
                        <div className="message">Hello {this.props.userInSession.firstname} {this.props.userInSession.lastname}</div>   
                        <button className="button" onClick={()=>this.logoutUser()}>LOG OUT</button>
                    </div>
                    :
                    <div>
                        {this.state.logout ? <p>You have successfully logged out</p>:<p></p>}
                        Please <Link to="/login">Log In</Link> to see your account
                    </div> 
                }
           
            </div>
        )
    }
}
export default Profile;