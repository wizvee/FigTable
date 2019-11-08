import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';

const Manage = styled.div`
  width:100%;
`;

const buy= [
  { id: 1, title: '잇딜구매1', mem: 'user1', date: '2019-11-01' },
  { id: 2, title: '잇딜구매1', mem: 'user2', date: '2019-11-02' },
  { id: 3, title: '잇딜구매2', mem: 'user3', date: '2019-11-03' },
  { id: 4, title: '잇딜구매2', mem: 'user4', date: '2019-11-04' }
]
const EatdealBuy =()=>{

    return(
        <>
        <Manage>
          구매내용 확인

        </Manage>
        
        </>
    )
}

export default EatdealBuy;