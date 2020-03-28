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

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loggedInUser:null,
      AvailabilityDates:[],
      bookingStartDate:new Date(),
      bookingEndDate:new Date(),
      bookingID:""
    };
    this.service=new AuthService()
  }
  
  fetchUser(){
    if(this.state.loggedInUser===null){
      this.service.loggedin()
      .then(response=>{
        this.setState({loggedInUser:response})
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
  handleBooking=(bookingStartDate,bookingEndDate,bookingID)=>{
    this.setState({
      bookingStartDate:bookingStartDate,
      bookingEndDate:bookingEndDate,
      bookingID:bookingID
    })
  }
  render(){
    //console.log("this.service",this.service.signup())
    //console.log("this.state.availabilydates",this.state.AvailabilityDates)
    return (
      <div className="App">
      <Switch>
        <Route exact path="/profile" render={()=><Profile getUser={this.getTheUser} userInSession={this.state.loggedInUser}/>}/>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/signup" render={()=><Signup getUser={this.getTheUser}/>}/>
        <Route exact path="/login" render={()=><Login getUser={this.getTheUser}/>}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/booking/availability-request" render={()=><AvailabilityRequest updateAvDates={this.handleUpdateAvDates} userInSession={this.state.loggedInUser}/>} />
        <Route exact path="/booking" render={()=><Booking AvDates={this.state.AvailabilityDates} updateBooking={this.handleBooking} userInSession={this.state.loggedInUser}/>}/>
        <Route exact path="/booking-confirmation" render={()=><BookingConfirmation bookingStartDate={this.state.bookingStartDate} bookingEndDate={this.state.bookingEndDate} bookingID={this.state.bookingID} userInSession={this.state.loggedInUser}/>}/>
      </Switch>
      </div>
    );
  }
  
}

export default App;
