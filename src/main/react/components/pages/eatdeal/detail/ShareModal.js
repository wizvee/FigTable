import React from 'react';
import styled, { css } from 'styled-components';

import { MdClose } from 'react-icons/md';
import { FaLine } from 'react-icons/fa';
import { FiLink, FiMessageCircle } from 'react-icons/fi';

const ModalWrap= styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 50;
`;
const Modal = styled.div`
    position:relative;
    display: flex;
    text-align:center; 
    margin:0px auto;
    flex-direction: column;
    background-color: white;
    top:10rem;
    width:24rem;
    height:30rem;
    border-radius:8px;

`;
const ModalTitle = styled.div`
    margin:0.8rem 0;
    font-size: 1.2rem;
`;
const ModalX = styled.div`
    cursor:pointer;
    text-align:right;
    font-size: 2rem;
    padding: 0.5rem;
    color:black;
`;

const Separator = styled.div`
    position:relative;
    display: block;
    height:1px;
    margin:0.5rem;
    background-color:#E9E9E9;
`;
const ShareContents= styled.div`
    padding: 0.3rem;
`;
const ShareContent= styled.div`
    text-align:left;
    font-size: 1.2rem;
    padding: 0.4rem 1.2rem;
    cursor:pointer;
    
    svg {
        transform: translateY(0.5rem);
        margin-right: 1.2rem;
        font-size: 1.5rem;
    }
`;
const ShareModal =({closeModal})=>{
    return (
        <>
        <ModalWrap>
        <Modal>
            <ModalX>
                <MdClose onClick={closeModal}/>
            </ModalX>
            <ModalTitle>친구에게 공유해보세요</ModalTitle>
            
            <Separator/> 
            <ShareContents>
                <ShareContent><FiMessageCircle color="#F79F1F"/> 카카오톡</ShareContent>
                <ShareContent><FaLine color="green"/>  라인</ShareContent>
                <ShareContent><FiLink color="gray"/> url</ShareContent>
            </ShareContents>
            
            <Separator/> 
        </Modal>
        </ModalWrap>
        </>
    )
};
export default ShareModal;