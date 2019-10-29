import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';

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
const EatDealIntroduce =()=>{
    

    return(
        <>
            <IntroTitle>
                <FaQuoteLeft/>
                제목입니다.
            </IntroTitle>
            <TextContents>
                <p>식당소개</p>
                <ul>
                    <li>1985년 현대백화점 본점 오픈과 역사를 함께 해온 국내 최고의 빙수 전문점입니다. 정성을 다하고, 진심을 담아 고객님께 한 그릇을 대접하는 밀탑만의 소박한 마음입니다. </li>
                
                </ul>
                <p>※ 유의사항 (꼭! 확인해주세요)</p>
                <ul>
                    <li>사용 기간: 2019.10.09 ~ 2019.10.31</li>
                    <li>다른 쿠폰 및 딜과 중복 사용 불가합니다.</li>
                </ul>
            </TextContents>
        </>
    )
}

export default EatDealIntroduce;