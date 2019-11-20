import React,{ useState } from 'react';
import styled, { css } from 'styled-components';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { MdClose } from 'react-icons/md';
import { FaLine } from 'react-icons/fa';
import { FiLink, FiMessageCircle } from 'react-icons/fi';
import { FacebookShareButton, LineShareButton } from 'react-share';
import { FacebookIcon, LineIcon, } from 'react-share';
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
    width:40%;
    height:25rem;
    border-radius:8px;
  @media (max-width: 426px) {
    width: 15rem;
    height:20rem;
  }

`;
const ModalTitle = styled.div`
    margin:0.8rem 0;
    font-size: 1.2rem;
  @media (max-width: 426px) {
    font-size: 0.8rem;
  }
`;
const ModalX = styled.div`
    cursor:pointer;
    text-align:right;
    font-size: 1.5rem;
    padding: 0.5rem;
    color:black;
  @media (max-width: 426px) {
    font-size: 1rem;
  }
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
    outline-style:none;
    border:none;
    text-align:left;
    font-size: 1.2rem;
    padding: 0.4rem 1.2rem;
    cursor:pointer;
    svg {
        transform: translateX(0.5rem);
        transform: translateY(0.5rem);
        font-size: 1.5rem;
    }
    g{
        transform: translateY(0.1rem);
    }
  @media (max-width: 426px) {
    font-size: 0.8rem;
  }
`;
const IconBox=styled.div`
outline-style:none;
border:none;
width:1.5rem;
height:1.5rem;
    display:inline-block;
        margin-right: 1.2rem;
`;
const CopyStatus =styled.div`
      opacity:0%;
      animation-name: fadeout;
      animation-duration: 2s;
      animation-iteration-count: inherit;
      @keyframes fadeout {
      from {
          opacity:100%;
      }
      to {
          opacity:0%;
      }
    }
`;
const ShareModal =({closeModal})=>{
    //이 페이지의 url받아오기
    const thisUrl = window.location.href;
    //카피상태로 복사되었는지 알려주기
    const [copied, setCopied] =useState(false);
    //카피상태변경하는 함수
    const onSetCopy =()=>{
        setCopied(true);
    }
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
                {/* <ShareContent>
                    <IconBox><FiMessageCircle color="#F79F1F"/></IconBox> 
                    카카오톡
                </ShareContent> */}
                <ShareContent>
                    <FacebookShareButton url={thisUrl}  >
                        <IconBox><FacebookIcon size={32} round={true}/></IconBox>
                        페이스북
                        
                    </FacebookShareButton>
                </ShareContent>
                <ShareContent>
                    <LineShareButton url={thisUrl}  >
                        <IconBox><LineIcon size={32} round={true} /></IconBox>
                        라인
                    </LineShareButton>
                </ShareContent>
                <ShareContent>
                    <IconBox><FiLink color="gray"/></IconBox>
                    <CopyToClipboard text={thisUrl} 
                        onCopy={() => onSetCopy()}>
                        <span>url</span>
                    </CopyToClipboard>
                </ShareContent>
            </ShareContents>
            <Separator/> 
            {!copied?null:(
             <CopyStatus>
                 <div className="fadeOut">
                 ClipBoard에 복사되었습니다
                 </div>
            </CopyStatus>)
                }

        </Modal>
        </ModalWrap>
        </>
    )
};
export default ShareModal;