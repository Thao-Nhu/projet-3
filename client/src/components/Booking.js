import React from 'react';
import NavBar from './NavBar.js';
import {Link,withRouter} from 'react-router-dom';
import { DateRange } from 'react-date-range';
import axios from 'axios';
import Moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


class Booking extends React.Component{
    state={
        calendar:{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'},
        stayComment:"",
        specificRequest:""
    }

    /*componentDidMount(){
        console.log("this.props.AvDates",new Date(this.props.AvDates[0]))
        console.log("this.props.AvDates",new Date(this.props.AvDates[this.props.AvDates.length-1]))
        /*this.setState({
            startDate:Moment(this.props.AvDates[0]).format("DD/MM/YYYY"),
            endDate:Moment(this.props.AvDates[this.props.AvDates.length-1]).format("DD/MM/YYYY")
        })
    }*/

    handleFormSubmit = (event) => {
        event.preventDefault();
        const startDate = new Date(Moment(this.state.calendar.startDate).format("YYYY-MM-DD"));
        const endDate = new Date(Moment(this.state.calendar.endDate).format("YYYY-MM-DD"));
        const stayComment = this.state.stayComment;
        const specificRequest = this.state.specificRequest;
        const userID = this.props.userInSession._id;
        axios.post("http://localhost:5000/booking", { startDate,endDate,stayComment,specificRequest,userID })
        .then( (booking) => {
            //this.props.getData();
            this.setState({
                calendar:{
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'},
                stayComment:"",
                specificRequest:""
            });
            console.log("booking.data.start_date",booking.data.start_date)
            this.props.updateBooking(booking.data.start_date,booking.data.end_date,booking.data._id)
            this.props.history.push("/booking-confirmation");
        })
        .catch( error => console.log(error) )
      }

    handleSelect=(item)=> {
        this.setState({
            calendar:{
                startDate:item.selection.startDate,
                endDate:item.selection.endDate,
                key:item.selection.key
            } 
        })
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    
    render(){
        //console.log("1st Av Dates",Moment(this.props.AvDates[0]).add(1,"Y")._d)
        //console.log("Moment()._d",Moment()._d)
        
        var enumerateDaysBetweenDates = function(startDate, endDate) {
            var dates = [];
            var currDate = Moment(startDate).startOf('day');
            var lastDate = Moment(endDate).startOf('day');
            while(currDate.add(1, 'days').diff(lastDate) < 0) {
                //console.log(currDate.toDate());
                dates.push(currDate.clone().toDate());
            }
            return dates;
        };
        const s=Moment().toDate();
        const e=Moment().add(1,"Y").toDate();
        const AvDates = this.props.AvDates.map(date=>Moment(date).format("DD/MM/YYYY"))
        const disabledDates = enumerateDaysBetweenDates(s,e).filter(date=>{
            //console.log("AvDates",AvDates)
            //console.log("date",Moment(date).format("DD/MM/YYYY"))
            //console.log("inclus ?",AvDates.includes(Moment(date).format("DD/MM/YYYY")))
            return !AvDates.includes(Moment(date).format("DD/MM/YYYY"))
            }
            ).map(date=>new Date(date))
        //console.log("this.props.AvDates[0]).toDate()",Moment(this.props.AvDates[0]).toDate())
        console.log("_selected start date of trip",this.state.calendar.startDate)
        console.log("selected end date of trip",this.state.calendar.endDate)
        const stayLengthInNights=Moment(this.state.calendar.endDate).diff(Moment(this.state.calendar.startDate),"days")+1
        const totalPrice=60*stayLengthInNights
        return(
            <div> 
                <NavBar/>
                {this.props.userInSession?
                <div>
                    <div className="booking-guide">On the date range you are searching, we are available on below dates. You can start booking by selecting the start and end date of your trip on the calendar, leaving us a few words about your trip purpose and your specific requests that you might have</div>
                    <form onSubmit={this.handleFormSubmit}>
                        <DateRange
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={[this.state.calendar]}
                        onChange={this.handleSelect}
                        disabledDates={disabledDates}
                        minDate={Moment(this.props.AvDates[0]).toDate()}
                        maxDate={Moment(this.props.AvDates[0]).add(1,"Y").toDate()}
                        shownDate={Moment(this.props.AvDates[0]).toDate()}
                        //startDatePlaceholder={Moment(this.props.AvDates[0]).toDate()}
                        //minDate={Moment()._d}
                        //maxDate={Moment().add(1,"Y")._d}
                        />
                        <div className="booking-guide">Your stay is: {stayLengthInNights} nights for a price of {stayLengthInNights}*60={totalPrice} euros</div>
                        <div className="form-field-item">
                            <div className="form-field-item-label">
                                <label>A few words about your travel purpose (holidays,work etc.):</label>
                            </div>
                            <div className="form-field-item-input">
                                <textarea name="stayComment" value={this.state.stayComment} onChange={ e => this.handleChange(e)} />
                            </div> 
                        </div>
                        
                        <div className="form-field-item">
                            <div className="form-field-item-label">
                                <label>Any specific request to us (allergy, late arrival etc.):</label>
                            </div>
                            <div className="form-field-item-input">
                            <textarea name="specificRequest" value={this.state.specificRequest} onChange={ e => this.handleChange(e)} />
                            </div> 
                        </div>
                        <div className="div"><Link to="/booking/availability-request">Change dates for availability research</Link></div>
                        <button className="div button">Submit booking</button>
                    </form>
                    
                </div>
                :
                <div className="message">
                        Please <Link className="button" to="/login">Log In</Link> to start booking
                </div> 
                }
            </div>
        )
    }
}
export default withRouter(Booking);