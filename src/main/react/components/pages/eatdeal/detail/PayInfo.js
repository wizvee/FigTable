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
    
    const{
        eatNo,
        thumb,
        title,
        status,
        discount,
        originPrice,
        discountPrice,
        remainFood,
        FoodName,
    } = eat;
    return (
        <>
        <PayInfoContainer>
        <h3>주문목록</h3>  
            <PayImage url={thumb}/>
            <PayContent>
            <p>{title}</p>
            <h3>{FoodName}</h3>
            <p>\{discountPrice}</p>
            </PayContent>
            
        </PayInfoContainer>
        </>
    )
}
export default PayInfo;