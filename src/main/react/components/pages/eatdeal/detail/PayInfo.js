import React from 'react';
import styled from 'styled-components';

const PayInfoContainer = styled.div`
    text-align:left;
    margin-top: 2rem;
    padding : 3rem;
`;
const PayImage = styled.div`
    float:left;
    background: url(${props => `${props.url}`});
    background-size: cover;
    width : 8rem;
    height : 8rem;
`;
const PayContent =styled.div`
    float:left;
    height : 8rem;
    padding: 1rem;
    p{
        margin-top:0;
    }
`;
const PayInfo =({eat})=>{
    const path = process.env.PATH;
    const {
      eatNo,
      resNo,
      resName,
      resRocationKeyword,
      thumb,
      eatFoodName,
      eatStatus,
      eatCount,
      eatOriginPrice,
      eatDiscount,
      eatStartDate,
      eatEndDate,
      eatContent
    } = eat;
    return (
        <>
        <PayInfoContainer>
        <h3>주문목록</h3>  
            <PayImage url={`${path}/resources/upload/eatdeal/${thumb}`}/>
            <PayContent>
            <p>{resName}</p>
            <h3>{eatFoodName}</h3>
            <p> \{Math.floor(Number(eatOriginPrice)*(1-Number(eatDiscount)))} </p>
            </PayContent>
            
        </PayInfoContainer>
        </>
    )
}
export default PayInfo;