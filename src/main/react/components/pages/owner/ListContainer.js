import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WaitingItem from './waiting/WaitingItem';
import { FiAlertCircle } from 'react-icons/fi';

const Container = styled.div`
  margin-top: 40px;
  margin-left: 2px;
  width: 100%;

  &.waiting {
    margin-top: 12px;
    margin-bottom: 20px;
  }
`;
const Title = styled.div`
  margin: 0 auto;
  font-size: 20px;
  width: 95%;
  height: 50px;
  padding-top: 0.7rem;
  padding-left: 20px;
  background: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  border-bottom: 1px solid ${palette.borderGray};
  z-index: 2;
  @media (max-width: 1024px) {
    margin-left: 8px;
    width: 100%;
  }
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }

  &.waiting {
    width: 90%;
    @media (max-width: 1024px) {
      margin: 0 auto;
      width: 100%;
    }
  }

  .detail {
    display: block;
    float: right;
    color: ${palette.textGray};
    font-size: 13px;
    margin-top: 7px;
    margin-right: 15px;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid ${palette.primary};
      color: ${palette.primary};
    }
  }
`;

const Content = styled.div`
  background: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${palette.textGray};
      border-radius: 10px;
    }
  }

  &.main {
    margin: 0 auto;
    width: 95%;
    height: 135px;
    @media (max-width: 1024px) {
      margin-left: 8px;
      width: 100%;
    }
    @media (max-width: 768px) {
      margin: 0;
      width: 100%;
    }
  }

  &.waiting {
    width: 90%;
    height: 550px;
    margin: 0 auto;
    @media (max-width: 1024px) {
      width: 100%;
    }
  }

  .closeMsg {
    color: ${palette.textGray};
    font-size: 18px;
    text-align: center;
    width: 100%;
    padding-top: 44px;

    svg {
      position: relative;
      top: 7px;
      font-size: 25px;
    }
  }

  .text {
    padding-top: 50px;
    text-align: center;
    color: ${palette.textGray};
  }
`;

const ListContainer = ({
  resOpen,
  list,
  location: { pathname },
  match,
  seatModal,
  seatModalOpen,
  seatModalClose,
  deleteModal,
  deleteModalOpen,
  deleteModalClose,
}) => {
  const { resNo } = match.params;
  const path = process.env.PATH;
  useEffect(() => {
    resOpen == false &&
      (document.getElementById('listContent').style.overflowY = 'hidden');
  }, []);

  return (
    <Container
      className={pathname == `${path}/owner/${resNo}/waiting` && 'waiting'}
    >
      <Title
        className={pathname == `${path}/owner/${resNo}/waiting` && 'waiting'}
      >
        Waiting List
        {pathname == `${path}/owner/${resNo}` && (
          <Link to={`${path}/owner/${resNo}/waiting`}>
            <div className="detail">자세히보기</div>
          </Link>
        )}
      </Title>
      <Content
        id="listContent"
        className={pathname == `${path}/owner/${resNo}` ? 'main' : 'waiting'}
      >
        {resOpen == false ? (
          <div className="closeMsg">
            <FiAlertCircle /> 영업 준비 중
          </div>
        ) : list.length == 0 ? (
          <div className="text">현재 대기팀이 없습니다</div>
        ) : (
          list.map((l, index) => (
            <WaitingItem
              waiting={l}
              key={l.wtNo}
              seatModal={seatModal}
              seatModalOpen={seatModalOpen}
              seatModalClose={seatModalClose}
              deleteModal={deleteModal}
              deleteModalOpen={deleteModalOpen}
              deleteModalClose={deleteModalClose}
            />
          ))
        )}
      </Content>
    </Container>
  );
};

export default withRouter(ListContainer);
