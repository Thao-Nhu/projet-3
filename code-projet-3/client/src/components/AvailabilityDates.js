import React from 'react';
import NavBar from './NavBar.js';
import {Link} from 'react-router-dom';
import StaticDatePicker from './Calendar.js';
import moment from 'moment';

class AvailabilityDates extends React.Component{
    state={
       date:new Date(),
       selectedDates: []
    }
    
    getDates = date => {
        var selectedDates=[]
        selectedDates.push(date)
        this.setState({
           selectedDates:selectedDates
        })
    };

    getDate = date => {
        this.setState({
            date:date
        })
    };

    handleDisableDates=(date)=>{
        //console.log(moment(this.props.AvDates[0],"DD/MM/YYYY",true))
        //console.log(new Date(date).toISOString())
        return !this.props.AvDates.map(date=>moment(date).format('DD/MM/YYYY')).includes(moment(date).format('DD/MM/YYYY'))
    }
    render(){
        console.log("selected dates", this.state.selectedDates)
        return(
            <div>
                <NavBar/>
                <StaticDatePicker disableDates={this.handleDisableDates} getDates={this.getDates} getDate={this.getDate} date={this.state.date}/>
                {/*{this.props.AvDates.map((AvDate,index)=>{
                    return(
                        <div key={index}>
                            {AvDate}
                        </div>
                    )
                })}*/}
                <div className="sign-up-div"><Link to="/booking/availability-request" className="button">Change dates for availability research</Link></div>
            </div>
        )
    }
}
export default AvailabilityDates;