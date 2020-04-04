import React from 'react';
import NavBar from './NavBar.js';
import {Link,withRouter} from 'react-router-dom';
import Moment from 'moment';
class BookingConfirmation extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                {this.props.userInSession?
                <div className="booking-guide">
                    <div className="message">Thank you <span style={{textTransform:"capitalize"}}>{this.props.userInSession.firstname}</span> <span style={{textTransform:"capitalize"}}>{this.props.userInSession.lastname}</span> for your request.</div>
                    <div>Your booking from {Moment(this.props.booking.start_date).format("DD/MM/YYYY")} to {Moment(this.props.booking.end_date).format("DD/MM/YYYY")}, under booking id {this.props.booking._id} has been taken into account.</div>
                    <div>We will send you an email to confirm your booking under 2 working days.</div>
                    <div>Payment will be done on arrival.</div>
                </div>
                :
                <div className="message">
                        Please <Link className="button" to="/login">Log In</Link> to see your account
                </div> 
                }
            </div>
        )
    }
}
export default withRouter(BookingConfirmation);