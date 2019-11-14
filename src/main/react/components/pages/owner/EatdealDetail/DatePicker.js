import React, { Component } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';


//데이트피커
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

const ButtonArea = styled.div`
    display:inline-block;
    border-radius: 5px;
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
        //displayFormat: 'YYYY년MM월DD일',
        //isDateBlocked: false,
      };
    
      }

      onClick ({startDate,endDate}){
        this.setState({ startDate, endDate })
        this.props.onSetValue(({startDate, endDate}));
      }
   
    render(){
      return(
          <ButtonArea>
            <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { this.onClick({ startDate, endDate })}}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
            />
        </ButtonArea>
        )
 }       
}

export default EatdealEnroll;