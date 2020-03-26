import React from 'react';
import './App.css';
import Homepage from './components/Homepage.js';
import Signup from './components/auth/Signup.js';
import Login from './components/auth/Login.js';
import Profile from './components/Profile.js';
import Menu from './components/Menu.js';
import AvailabilityRequest from './components/AvailabilityRequest.js';
import AvailabilityDates from './components/AvailabilityDates.js'
import {Switch,Route} from 'react-router-dom';
import AuthService from './components/auth/auth-service';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loggedInUser:null,
      AvailabilityDates:[]
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
        <Route exact path="/booking/availability-request" render={()=><AvailabilityRequest updateAvDates={this.handleUpdateAvDates}/>} />
        <Route exact path="/booking/availability-display" render={()=><AvailabilityDates AvDates={this.state.AvailabilityDates}/>}/>
      </Switch>
      </div>
    );
  }
  
}

export default App;
