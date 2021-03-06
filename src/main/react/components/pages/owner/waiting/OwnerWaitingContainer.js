import React, { useState, useEffect } from 'react';
import HeaderOwner from '../common/HeaderOwner';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';
import OwnerDetailTitle from '../common/OwnerDetailTitle';
import ListContainer from '../ListContainer';
import { useDispatch, useSelector } from 'react-redux';
import { ownHeader } from '../../../../modules/ownerHeader';
import { setOwner } from '../../../../modules/enrollOwner';
import { getWaitings, complete, deleteWt } from '../../../../modules/waiting';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  padding-top: 80px;
  height: auto;
  overflow-y: hidden;
  background: #f1f3f5;
  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const ContainerWrapper = styled(Responsive)`
  height: auto;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const Right = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  float: right;

  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 0.7rem;
  }
`;
const CountContainer = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  height: 60px;
  width: 45%;
  font-weight: 500;
  font-size: 30px;
  text-align: center;
  padding-top: 7px;
  letter-spacing: 7px;
  border-radius: 5px;
  z-index: 10;
  background: rgba(246, 114, 128, 0.7);
  color: white;
  .count {
    color: ${palette.textGray};
    font-weight: 900;
  }
  @media (max-width: 1024px) {
    letter-spacing: 2px;
  }
`;

const OwnerWaitingContainer = ({ match }) => {
  const { resNo } = match.params;
  const dispatch = useDispatch();
  const { ownerInfo, ownError, ownLoading, owner, waitings } = useSelector(
    ({ ownHeader, loading, enrollOwner, ownerWaiting }) => ({
      ownerInfo: ownHeader.ownerInfo,
      ownError: ownHeader.error,
      ownLoading: loading['owner/OWN_HEADER'],
      owner: enrollOwner.owner,
      waitings: ownerWaiting.waitings,
    }),
  );

  useEffect(() => {
    dispatch(setOwner(JSON.parse(sessionStorage.getItem('owner'))));
    dispatch(getWaitings(resNo));
  }, [resNo]);

  useEffect(() => {
    if (owner) dispatch(ownHeader(owner.ownNo));
  }, [owner]);

  const [seatModal, setSeatModal] = useState(false);

  const seatModalOpen = wtNo => {
    setSeatModal(true);
    dispatch(complete(wtNo));
  };
  const seatModalClose = () => {
    setSeatModal(false);
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const deleteModalOpen = wtNo => {
    setDeleteModal(true);
    dispatch(deleteWt(wtNo));
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
  };

  return (
    <>
      {!ownLoading && ownerInfo && (
        <>
          <HeaderOwner ownerInfo={ownerInfo} />
          <Container>
            <ContainerWrapper>
              <OwnerDetailTitle title="Waiting" />
              <CountContainer>
                현재 <span className="count">{waitings.length}</span> 팀 대기 중
              </CountContainer>
              <Right>
                <ListContainer
                  seatModal={seatModal}
                  seatModalOpen={seatModalOpen}
                  seatModalClose={seatModalClose}
                  deleteModal={deleteModal}
                  deleteModalOpen={deleteModalOpen}
                  deleteModalClose={deleteModalClose}
                  list={waitings}
                />
              </Right>
            </ContainerWrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default withRouter(OwnerWaitingContainer);
