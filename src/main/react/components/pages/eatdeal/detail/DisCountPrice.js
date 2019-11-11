import React from 'react';
import styled from 'styled-components';


const DiscountContainer= styled.div`
text-align: right;
right:0;
bottom:0;
`;
const OriginFoodPrice=styled.div`
    color: black;
    font-size: 1.0rem;
    margin-bottom:0.5rem;
    text-decoration:line-through;
`;
const FoodPrice=styled.span`
    color: black;
    font-size: 1.5rem;
    font-weight:bold;
    margin-bottom:0.5rem;
`;

const Percentage= styled.span`
    font-size:1.5rem;
    font-weight:bold;
    color:#14CBB2;
`;
const Remaining = styled.span`
    background-color:#FF5C5C;
    color:white;
    padding:0.3rem 0.5rem;
    border-radius:1.5rem;
    font-size:0.8rem;
    margin-bottom:0.3rem;
    justify-content:center;
`;
const DiscountPrice=({eat})=>{
    const {
      eatNo,
      resNo,
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
    return(
        <>
        <DiscountContainer>
            <OriginFoodPrice >\{eatOriginPrice} </OriginFoodPrice>
            <Remaining>{eatCount}개 남음</Remaining>
            <Percentage>  {Number(eatDiscount)*100}%</Percentage>
            <FoodPrice> \{Number(eatOriginPrice)*(1-Number(eatDiscount))} </FoodPrice>
        </DiscountContainer>

        </>
)
}
export default DiscountPrice;