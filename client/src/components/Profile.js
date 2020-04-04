import React from 'react';
import {Link} from 'react-router-dom';
import AuthService from './auth/auth-service.js';
import NavBar from './NavBar.js';
import axios from 'axios';
import Moment from 'moment';
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logout:false,
            listOfBookings:[]
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

    componentDidMount(){
        this.getBookings()
      }
    
    componentDidUpdate(prevProps){

        if (prevProps.userInSession !== this.props.userInSession) {
            console.log('userInSession has just changed', this.props.userInSession)
            this.getBookings()
        }

        //this.getBookings()
      }

    getBookings = () => {
        if (this.props.userInSession){
          console.log("loggedInUser",this.props.userInSession)
          axios.get(`${process.env.REACT_APP_APIURL || ""}/yourprofile/${this.props.userInSession._id}`)
          .then( responseFromApi =>{
              const listOfBookings = responseFromApi.data.bookings;
              console.log("listOfBookings in getBookings method", listOfBookings)
              this.setState({listOfBookings});
          })
          .catch((err)=>{
              console.log(err)
          })
          }
      }

    render(){
        //console.log("this.props.userInSession in render",this.props.userInSession)
        return(
            <div>
                <NavBar/>
                {this.props.userInSession?
                    <div>
                        <div className="message">Hello <span style={{textTransform:"capitalize"}}>{this.props.userInSession.firstname}</span> <span style={{textTransform:"capitalize"}}>{this.props.userInSession.lastname}</span>! You currently have {this.state.listOfBookings.length} booking(s) with us</div>
                        <ul>
                            {this.state.listOfBookings.map(booking=>(
                                <li key={booking._id}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="td1"></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{fontWeight:"bold"}}><td>Booking ID {booking._id}</td></tr>
                                            <tr>
                                                <td className="td1">from:</td>
                                                <td>{Moment(booking.start_date).format("DD/MM/YYYY")}</td>
                                            </tr>
                                            <tr>
                                                <td className="td1">to:</td>
                                                <td>{Moment(booking.end_date).format("DD/MM/YYYY")}</td>
                                            </tr>
                                            <tr>
                                                <td className="td1">current status:</td>
                                                <td>{booking.booking_status}</td>
                                            </tr>
                                            <tr>
                                                <td className="td1">price:</td>
                                                <td>{booking.price} €</td>
                                            </tr>
                                            <tr>
                                                <td className="td1">payment status:</td>
                                                <td>{booking.payment_status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            ))}
                        </ul>
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