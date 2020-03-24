import React from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from './NavBar.js';
import DatePicker from './DatePicker.js';
import axios from 'axios';

class AvailabilityRequest extends React.Component{
    state={
        startDate:new Date(),
        endDate: new Date(),
        availableDates:[]
    }
    
    getStartDate = date => {
        this.setState({
            startDate:date
        })
    };

    getEndDate = date => {
        this.setState({
            endDate:date
        })
    }

    handleClick = (event) => {
        const startDate=this.state.startDate;
        const endDate=this.state.endDate;
        axios.post("http://localhost:5000/booking/availability-request", { startDate, endDate })
        .then( (availableDates) => {
            this.setState(availableDates.data.available_Dates);
            this.props.updateAvDates(availableDates.data.available_Dates);
            this.props.history.push("/booking/availability-display");
            //console.log("availability dates",availableDates)
        })
        .catch( error => console.log(error) )
    }

  
    render(){               
        
        return(
            <div>
                <NavBar/>
                    <DatePicker date={this.state.startDate} getDate={this.getStartDate} label="Start date"/>
                    <DatePicker date={this.state.endDate} getDate={this.getEndDate}  label="End date"/>
                    <div className="sign-up-div sign-up-button" onClick={this.handleClick}>Submit</div>   
            </div>
        )
    }
}
export default withRouter(AvailabilityRequest);

