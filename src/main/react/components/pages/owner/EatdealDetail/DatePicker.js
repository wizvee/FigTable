import React, { Component } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';


//데이트피커
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

const ButtonArea = styled.div`
    display:inline-block;
    width:60%;
    border-radius: 5px;
    border: 1px solid ${palette.borderGray};
    font-size: 0.8rem;
    z-index: 9999;
`;

class EatdealEnroll extends Component{

    constructor(props) {
      super(props);
      this.state = {
        startDate: null,
        endDate: null,
        focusedInput: null,
      };
    }
    render(){
      return(
          <ButtonArea>
            <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
            />
        </ButtonArea>
        )
 }       
}

export default EatdealEnroll;