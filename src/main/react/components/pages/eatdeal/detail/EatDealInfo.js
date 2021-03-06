import React from 'react';
import styled from 'styled-components';
import { FaInfoCircle,FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import palette from '../../../../lib/styles/Palette';
import moment from 'moment';

const Infowrap=styled.div`
    margin:0.1rem;
`;
const TextTitle=styled.div`
    text-align:left;
    font-size:1.2rem;
    font-weight:bold;
`;
const RestauInfo=styled.div`
    width: 6.1rem;
    margin-top:0.3rem;
    align-items: center;
    justify-content: top;
    padding:0.2rem;
    text-align:left;
    font-size:0.6rem;
    background-color:#dfe6e9;
    color:${palette.textGray};
    border-radius:0.4rem;
    svg {
        transform: translateY(1px);
    }
`;

const DiscountFoodName=styled.p`
    text-align:left;
    font-size:1rem;
    color:${palette.textGray};
    margin:0.5rem 0;
`;

    const Usedate = styled.div`
    text-align:left;
    font-size:0.8rem;
    font-weight:bold;

`;
const EatDealInfo =({eat})=>{
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

return(
    
    <Infowrap>
<TextTitle>[{resRocationKeyword}] {resName}</TextTitle>
    <RestauInfo>
        <Link to={`${path}/restaurant/${resNo}` /*식당정보로 바꾸기*/}>
            <FaInfoCircle/> 식당정보보기 <FaChevronRight/> 
        </Link>
    </RestauInfo>
    <DiscountFoodName>{eatFoodName}</DiscountFoodName>
<Usedate>사용 기간 : {moment(eatStartDate).format('YYYY-MM-DD')} ~ {moment(eatEndDate).format('YYYY-MM-DD')}</Usedate>
    </Infowrap>
)
    
}

export default EatDealInfo;