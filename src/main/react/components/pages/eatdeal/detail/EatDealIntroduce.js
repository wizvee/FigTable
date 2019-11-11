import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';
import moment from 'moment';

const IntroTitle = styled.div`
    font-size:1.2rem;
    text-align:left;
    font-weight: bold;
    svg{
        display:block;
        margin:0.2rem;
    }
`;
const TextContents= styled.ul`
    text-align:left;
    
    p{
        font-weight: bold;
    }
    li{
        list-style:symbols();
        font-size:0.8rem;
    }
`;
const EatDealIntroduce =({eat})=>{
    const {
      eatStartDate,
      eatEndDate,
      eatContent
    } = eat;
    

    return(
        <>
            <IntroTitle>
                <FaQuoteLeft/>
                제목입니다.
            </IntroTitle>
            <TextContents>
                <p>식당소개</p>
                <ul>
                    <li> {eatContent}</li>
                
                </ul>
                <p>※ 유의사항 (꼭! 확인해주세요)</p>
                <ul>
                    <li>사용 기간 : {moment(eatStartDate).format('YYYY-MM-DD')} ~ {moment(eatEndDate).format('YYYY-MM-DD')}</li>
                    <li>다른 쿠폰 및 딜과 중복 사용 불가합니다.</li>
                </ul>
            </TextContents>
        </>
    )
}

export default EatDealIntroduce;