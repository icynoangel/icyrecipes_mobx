import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {formatDate, parseDate} from 'react-day-picker/moment';
import YearMonthSelection from './year-month-selection';

class DatePicker extends Component {
  static propTypes = {
    selectedDay: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object // new Date()
    ]),
    startYear: PropTypes.number,
    endYear: PropTypes.number,
    disabledDays: PropTypes.array,
    /** [{
      from: new Date(2018, 0, 12), 
      to: new Date(2018, 0, 16) 
    }]*/
    showYearMonthSelection: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    selectedDay: new Date(),
    startYear: 1970,
    endYear: new Date().getFullYear() + 10,
    disabledDays: [],
    showYearMonthSelection: true
  };

  static getDerivedStateFromProps(props, state) {
    if (state.selectedDay !== props.selectedDay) {
      return {
        selectedDay: props.selectedDay,
        selectedMonth: props.selectedDay
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedDay: undefined,
      selectedMonth: undefined
    };
    this.onDayChange = this.onDayChange.bind(this);
    this.onMonthYearChange = this.onMonthYearChange.bind(this);
  }

  onDayChange(selectedDay, {disabled}) {
    if (!disabled) {
      this.setState(
        {
          selectedDay,
          selectedMonth: selectedDay
        },
        () => {
          this.props.onSelect(selectedDay);
        }
      );
    }
  }

  onMonthYearChange(selectedMonth) {
    this.setState({
      selectedMonth
    });
  }

  get fromToMonths() {
    return {
      fromMonth: new Date(this.props.startYear, 0),
      toMonth: new Date(this.props.endYear, 11)
    };
  }

  get yearMonthSelection() {
    if (this.props.showYearMonthSelection) {
      const {fromMonth, toMonth} = this.fromToMonths;

      return (
        <YearMonthSelection
          key={'year-month-selection'}
          fromMonth={fromMonth}
          toMonth={toMonth}
          selectedDay={this.state.selectedDay}
          onChange={this.onMonthYearChange}
        />
      );
    }
  }

  render() {
    const {fromMonth, toMonth} = this.fromToMonths;

    return (
      <div className="datepicker">
        <DayPickerInput
          value={this.state.selectedDay}
          onDayChange={this.onDayChange}
          formatDate={formatDate}
          parseDate={parseDate}
          format="MM-DD-YYYY"
          placeholder={`${formatDate(new Date(), 'MM-DD-YYYY')}`}
          showOverlay={false}
          dayPickerProps={{
            fromMonth: fromMonth,
            toMonth: toMonth,
            onDayClick: this.onDayChange,
            selectedDay: this.state.selectedDay,
            selectedDays: this.state.selectedDay,
            month: this.state.selectedMonth,
            initialMonth: this.state.selectedMonth,
            canChangeMonth: false,
            disabledDays: this.props.disabledDays,
            captionElement: this.yearMonthSelection
          }}
        />
      </div>
    );
  }
}

export default DatePicker;
