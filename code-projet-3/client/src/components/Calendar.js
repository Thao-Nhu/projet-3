import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class DatePicker extends React.Component {
    state = {
        date: new Date(),
        selectedDates: []
    }

  handleDateClick = date => {
    var selectedDates=[]
    selectedDates.push(date)
    this.props.getDates(date)
    this.setState({
      selectedDates:selectedDates
    });
  };

  handleDateChange = date => {
    this.props.getDate(date)
    this.setState({
      date
    });
  };

  render(){
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker    
              disableToolbar
              variant="static"
              format="MM/dd/yyyy"
              margin="normal"
              label={this.props.label}
              value={this.props.date}
              shouldDisableDate={this.props.disableDates}
              onCick={this.handleDateClick}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      );
  }

 
}

export default DatePicker;