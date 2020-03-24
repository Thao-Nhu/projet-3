import React from 'react';
import NavBar from './NavBar.js';
import {Link} from 'react-router-dom';
import { DateRange } from 'react-date-range';
import Moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


class AvailabilityDates extends React.Component{
    state={
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    /*componentDidMount(){
        console.log("this.props.AvDates",new Date(this.props.AvDates[0]))
        console.log("this.props.AvDates",new Date(this.props.AvDates[this.props.AvDates.length-1]))
        /*this.setState({
            startDate:Moment(this.props.AvDates[0]).format("DD/MM/YYYY"),
            endDate:Moment(this.props.AvDates[this.props.AvDates.length-1]).format("DD/MM/YYYY")
        })
    }*/

    handleSelect=(item)=> {
        this.setState({
            startDate:item.selection.startDate,
            endDate:item.selection.endDate,
            key:item.selection.key
        })
    }
    
    render(){
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
        const s=Moment()._d;
        const e=Moment().add(1,"Y")._d;
        const AvDates = this.props.AvDates.map(date=>Moment(date).format("DD/MM/YYYY"))
        const disabledDates = enumerateDaysBetweenDates(s,e).filter(date=>!AvDates.includes(Moment(date).format("DD/MM/YYYY"))).map(date=>new Date(date))
        return(
            <div> 
                <NavBar/>
                <div className="sign-up-div button">You can book now</div>
                <DateRange
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={[this.state]}
                    onChange={this.handleSelect}
                    disabledDates={disabledDates}
                    minDate={Moment()._d}
                    maxDate={Moment().add(1,"Y")._d}
                />
                <div className="sign-up-div"><Link to="/booking/availability-request" className="button">Change dates for availability research</Link></div>
            </div>
        )
    }
}
export default AvailabilityDates;