import React from 'react';
import './App.css';
import Homepage from './components/Homepage.js';
import Signup from './components/auth/Signup.js';
import Login from './components/auth/Login.js';
import Profile from './components/Profile.js';
import Menu from './components/Menu.js';
import AvailabilityRequest from './components/AvailabilityRequest.js';
import Booking from './components/Booking.js';
import BookingConfirmation from './components/BookingConfirmation.js'
import {Switch,Route} from 'react-router-dom';
import AuthService from './components/auth/auth-service';
//import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loggedInUser:null,
      AvailabilityDates:[],
      newBooking:{},
      listOfBookings:[]
    };
    this.service=new AuthService()
  }
  
  fetchUser(){
    if(this.state.loggedInUser===null){
      this.service.loggedin()
      .then(response=>{
        this.setState({
          loggedInUser:response
        })
      })
      .catch(err=>{this.setState({loggedInUser:false})})
    }
  }
  componentDidMount(){
    this.fetchUser()
  }
  getTheUser=(userObj)=>{
    this.setState({
      loggedInUser:userObj
    })
  }
 
  handleUpdateAvDates=(avDates)=>{
    this.setState({
      AvailabilityDates:avDates
    })
  }

  handleBooking=(newBooking)=>{
    this.setState({
      newBooking:newBooking
    })
  }



  render(){
    //console.log("this.service",this.service.signup())
    //console.log("this.state.availabilydates",this.state.AvailabilityDates)
    return (
      <div className="App">
      <Switch>
        <Route exact path="/profile" render={()=><Profile bookings={this.state.listOfBookings} getUser={this.getTheUser} userInSession={this.state.loggedInUser}/>}/>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/signup" render={()=><Signup getUser={this.getTheUser}/>}/>
        <Route exact path="/login" render={()=><Login getUser={this.getTheUser}/>}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/booking/availability-request" render={()=><AvailabilityRequest updateAvDates={this.handleUpdateAvDates} userInSession={this.state.loggedInUser}/>} />
        <Route exact path="/booking" render={()=><Booking AvDates={this.state.AvailabilityDates} updateBooking={this.handleBooking} userInSession={this.state.loggedInUser}/>}/>
        <Route exact path="/booking-confirmation" render={()=><BookingConfirmation booking={this.state.newBooking} userInSession={this.state.loggedInUser}/>}/>
      </Switch>
      </div>
    );
  }
  
}

export default App;
