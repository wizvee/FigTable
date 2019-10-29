import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';

const Container = styled.div`
  justify-content: space-between;
  display: inline;
  position: absolute;
  top: 100px;
  .profile {
    justify-items: center;
    display: inline-block;
    margin-top: 70px;
    background: white;
    position: relative;
    width: 280px;
    height: 300px;
    border-radius: 5px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);

    .background1 {
      background: ${palette.primary};
      position: relative;
      top: -50px;
      width: 130px;
      height: 130px;
      border-radius: 70px;
      margin: 0 auto;

      .background2 {
        margin: 0 auto;
        position: relative;
        top: 0.48rem;
        background: white;
        width: 115px;
        height: 115px;
        border-radius: 70px;
      }
    }
  }
`;

const Image = styled.div`
  background: url(${props => `${props.imgUrl}`});
  background-size: 100px 100px;
  margin: 0 auto;
  position: relative;
  top: 0.48rem;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Name = styled.div`
  width: 280px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  top: -10px;
`;

const Button = styled.button`
  width: 230px;
  margin: 0 auto;
  background: white;
  outline: none;
  border: 3px solid ${palette.primary};
  border-radius: 2px;
`;

const OwnerInfo = ({ store }) => {
  const { shopName, imgUrl } = store;
  return (
    <Container>
      <div className="profile">
        <div className="background1">
          <div className="background2">
            <Image imgUrl={imgUrl} />
          </div>
        </div>
        <Name>{shopName}</Name>
        <Button>메인 사진 수정</Button>
      </div>
    </Container>
  );
};

export default OwnerInfo;
