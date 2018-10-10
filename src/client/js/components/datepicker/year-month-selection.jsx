import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../dropdown/dropdown';
import {LocaleUtils} from 'react-day-picker';

class YearMonthSelection extends Component {
  static propTypes = {
    fromMonth: PropTypes.object.isRequired,
    toMonth: PropTypes.object.isRequired,
    selectedDay: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    // selectedDay has changed - initialize
    if (props.selectedDay && state.selectedDay !== props.selectedDay) {
      return {
        year: props.selectedDay.getFullYear(),
        month: props.selectedDay.getMonth(),
        selectedDay: props.selectedDay
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      year: null,
      month: null,
      selectedDay: null
    };

    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
  }

  changeMonth(month) {
    if (this.state.year !== null) {
      this.setState(
        {
          month
        },
        this.props.onChange(new Date(this.state.year, month))
      );
    }
  }

  changeYear(year) {
    if (this.state.month !== null) {
      this.setState(
        {
          year
        },
        this.props.onChange(new Date(year, this.state.month))
      );
    }
  }

  render() {
    const months = LocaleUtils.getMonths();

    const years = [];
    const startYear = this.props.fromMonth.getFullYear();
    const endYear = this.props.toMonth.getFullYear();
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }

    const yearsDropdownItems = years.map(y => {
      return {
        label: y,
        value: y,
        selected: this.state.year === y
      };
    });

    const monthsDropdownItems = months.map((m, i) => {
      return {
        label: m,
        value: i,
        selected: this.state.month === i
      };
    });

    return (
      <div className="DayPicker-Caption">
        <div className="datepicker__month">
          <Dropdown
            type="tiny"
            width="auto"
            placeholder="Month"
            items={monthsDropdownItems}
            onChange={this.changeMonth}
          />
        </div>
        <div className="datepicker__year">
          <Dropdown
            type="tiny"
            width="auto"
            placeholder="Year"
            items={yearsDropdownItems}
            onChange={this.changeYear}
          />
        </div>
      </div>
    );
  }
}

export default YearMonthSelection;
