import React,{useState} from 'react';
import styled from 'styled-components';

import { FiShare2 } from 'react-icons/fi';
import palette from '../../../../lib/styles/Palette';

import ShareModal from './ShareModal';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height:40rem;
  @media (max-width: 426px) {
    height:20rem;
  }
`;
const Image = styled.div`
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  height: 100%;
  transition: all 0.2s linear;
`;

const Status = styled.div`
    position:absolute;
    left: 0.8rem;
    bottom:0;
    z-index:2;
    text-align: right;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    padding: 0.2rem;
    padding-left:0.7rem;
    padding-right:0.4rem;
    background: #212529;
    background-color:${palette.textGray};
    color: white;
    margin-bottom:0.8rem;
    border-radius:4px;
    opacity: 0.9;
`;
const IconContainer =styled.div`
    cursor: pointer;
    position:absolute;
    padding:0.3rem;
    right:0;
    top:0;
    svg{
        color:white;
        font-size:1.6rem;
    }
`;

const EatDealImageContainer=({eat, modal, openModal, closeModal})=>{
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

        <ImageContainer>
        <Image url={`${path}/resources/upload/eatdeal/${thumb}`}/>
            <IconContainer>
                <FiShare2 onClick={openModal} />
            </IconContainer>
            
    { !modal? null:<ShareModal closeModal={closeModal} /> }
        <Status>{eatFoodName} {Number(eatDiscount)*100}% 할인</Status> 
    </ImageContainer>
    )
}
export default EatDealImageContainer;