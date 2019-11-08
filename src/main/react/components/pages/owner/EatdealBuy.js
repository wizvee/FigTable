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
const buys= [
  { id: 1, title: '잇딜구매1', user: 'user1', date: '2019-11-01' },
  { id: 2, title: '잇딜구매1', user: 'user2', date: '2019-11-02' },
  { id: 3, title: '잇딜구매2', user: 'user3', date: '2019-11-03' },
  { id: 4, title: '잇딜구매2', user: 'user4', date: '2019-11-04' }
]

const EatdealBuy =()=>{
  
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
            <Purchaser buys={buys} keyword={searchKeyword}/>
        </Manage>
        
        </>
    )
}

export default EatdealBuy;