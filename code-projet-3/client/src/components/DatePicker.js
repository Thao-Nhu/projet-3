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
    }

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
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label={this.props.label}
              value={this.props.date}
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

export default DatePicker