import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';
import Purchaser from './EatdealDetail/Purchaser';
import EatdealSearch from './EatdealDetail/EatdealSearch';

const Manage = styled.div`
  width:100%;
  height:30rem;
`;

const EatdealBuy =({buyers})=>{
  
const [searchKeyword, setSearchKeyword] = useState('');

const input = useRef(null);

const onSubmit = e => {
  e.preventDefault();
  setSearchKeyword(input.current.value);
};

    return(
        <>
        <Manage>
          <EatdealSearch
          onSubmit={onSubmit}
          input={input}/>
            <Purchaser buyers={buyers} keyword={searchKeyword}/>
        </Manage>
        
        </>
    )
}

export default EatdealBuy;