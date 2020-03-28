import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AuthService from './auth/auth-service.js';
import NavBar from './NavBar.js';
import Booking from './Booking.js';
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logout:false,
            listOfBookings: [] 
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

    /*componentDidMount() {
        this.getAllBookings();
    }

    getAllBookings = () =>{
        axios.get(`http://localhost:5000/yourprofile/${this.props.userInSession._id}`)
        .then(responseFromApi => {
          this.setState({
            listOfBookings: responseFromApi.data
          })
        })
      }*/
    
    render(){
        return(
            <div>
                <NavBar/>
                {this.props.userInSession?
                    <div>
                        <div className="message">Hello <span style={{textTransform:"capitalize"}}>{this.props.userInSession.firstname}</span> <span style={{textTransform:"capitalize"}}>{this.props.userInSession.lastname}</span></div>
                        {/*<Booking getData={() => this.getAllBookings()}/>*/}
                        <div className="message">Return to <Link className="button" to="/booking/availability-request">booking</Link> page or<button className="button" onClick={()=>this.logoutUser()}>LOG OUT</button></div>  
                    </div>
                    :
                    <div className="message">
                        {this.state.logout ? <p>You have successfully logged out</p>:<p></p>}
                        Please <Link className="button" to="/login">Log In</Link> to see your account
                    </div> 
                }
           
            </div>
        )
    }
}
export default Profile;