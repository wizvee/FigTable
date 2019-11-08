import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';

const PayWay = styled.div`
    text-align:left;
    padding : 1rem 3rem;
  p{
    padding-left:1.5rem;
  }
    .container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.0rem;
  width: 1.0rem;
  background-color: #ccc;
  border-radius: 50%;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  
  background-color:${palette.primary};
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  top: 0.27rem;
  left: 0.3rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: white;
}
`;
const EatPayWay =()=>{
    return (
        <PayWay>
          <h3>결제방법</h3>
          <label class="container">카드결제
            <input type="radio" name="pay"/>
            <span class="checkmark"></span>
          </label>
          
          <label class="container">카카오페이
            <input type="radio" name="pay"/>
            <span class="checkmark"></span>
          </label>
        </PayWay>


    )

}

export default EatPayWay; 