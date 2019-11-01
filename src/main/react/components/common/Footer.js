import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
  /* margin-top: auto; */
  width: 100%;
  background: #343a40;
`;

/* Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성 */
const Wrapper = styled(Responsive)`
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    color: white;
    font-size: 1.2rem;
    /* font-weight: bold; */
    font-family: 'Patua One', cursive;
    letter-spacing: 4px;
  }
  .compony {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #868e96;
    font-size: 0.85rem;
  }
`;

const Footer = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/figtable">
            <div className="logo">FIGTABLE</div>
          </Link>
          <div className="compony">
            <span>(주) 피그테이블</span>
            <span>서울특별시 강남구 테헤란로14길 6, 4층 (남도빌딩)</span>
            <span>ⓒ 2018 FigTable ㏇, Ltd. All rights reserved.</span>
          </div>
        </Wrapper>
      </Container>
    </>
  );
};

export default Footer;
