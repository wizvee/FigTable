import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  ownerRes,
  changeField,
  updateThumb,
  resOpen,
} from '../../../modules/ownerRestaurant';
import HeaderOwner from './common/HeaderOwner';
import OwnerInfo from './common/OwnerInfo';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerMenu from './OwnerMenu';
import palette from '../../../lib/styles/Palette';
import ListContainer from './ListContainer';
import ShopOpenModal from './Modal/ShopOpenModal';
import { ownHeader } from '../../../modules/ownerHeader';
import client from '../../../lib/api/client';
import enrollOwner from '../../../modules/enrollOwner';

const Container = styled.div`
  padding-top: 80px;
  height: 100%;
  min-height: calc(100vh - 12rem);
  background: #f1f3f5;
`;

const ContentWrapper = styled(Responsive)`
  height: auto;
  min-height: calc(100vh - 12rem);
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  @media (max-width: 425px) {
    height: 1340px;
  }
`;

const RightContent = styled.div`
  display: block;
  padding: 1rem;
  width: 65%;
  height: 100%;
  float: right;

  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 2rem;
  }
`;

const Button = styled.div`
  position: relative;
  top: 430px;
  left: 59px;
  width: 210px;
  height: 60px;
  display: inline-block;

  @media (max-width: 425px) {
    left: 64px;
  }
`;

const ButtonInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + ${ButtonLabel}::before {
    top: 0;
    left: 0;
    width: 210px;
    background: ${palette.primary};
  }

  &:checked + ${ButtonLabel}::after {
    left: 150px;
    box-shadow: inset 0 0 0 1px rgba(246, 114, 128, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:checked + ${ButtonSpan} {
    background: red;
  }
`;
const ButtonLabel = styled.label`
  display: inline-block;
  background: white;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: inset 0 0 0px 1px #d5d5d5;
  width: 210px;
  height: 60px;
  border-radius: 50px;
  top: 0;
  left: 0;

  &::before {
    content: '';
    position: absolute;
    display: block;
    height: 60px;
    width: 250px;
    top: 0;
    left: 0;
    border-radius: 50px;
    -moz-transition: 0.25s ease-in-out;
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 50px;
    width: 50px;
    top: 5px;
    left: 10px;
    border-radius: 50px;
    background: white;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
    -moz-transition: 0.25s ease-in-out;
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
`;

const ButtonSpan = styled.span`
  position: relative;
  top: 19px;
  left: 65px;
  font-weight: 500;
  letter-spacing: 5px;
  color: ${palette.textGray};
  font-size: 20px;
  height: 22px;
  width: 110px;
  &::before {
    content: '영업종료';
  }
  ${ButtonInput}:checked + ${ButtonLabel} &::after {
    display: inline-block;
    overflow-y: hidden;
    position: relative;
    left: -107px;
    width: 110px;
    padding-bottom: 36px;
    text-align: center;
    content: '영업중';
    color: white;
  }
`;

////////// 임시데이터//////////////////////////

const waiting = [
  { name: '김손님', count: '2', phone: '010-1111-1111' },
  { name: '이손님', count: '1', phone: '010-2222-2222' },
  { name: '박손님', count: '5', phone: '010-3333-3333' },
];

//////////////////////////////////////////////

const OwnerContainer = ({ match }) => {
  const { resNo } = match.params;
  const path = process.env.PATH;

  const dispatch = useDispatch();
  const {
    restaurant,
    error,
    loading,
    ownerInfo,
    ownError,
    ownLoading,
    owner,
  } = useSelector(({ ownerRes, ownHeader, loading, owner }) => ({
    restaurant: ownerRes.ownRestaurant,
    error: ownerRes.error,
    loading: loading['owner/OWNER_RES'],
    ownerInfo: ownHeader.ownerInfo,
    ownError: ownHeader.error,
    loading: loading['owner/OWN_HEADER'],
    owner: owner.owner,
  }));

  const onChangeFile = useCallback(async ({ target: { files, name } }) => {
    const file = files[0];
    let form = new FormData();
    form.append('thumbnail', file);
    let thumb;
    await client
      .post(`${path}/api/ownerThumb`, form, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        dispatch(changeField({ key: name, value: data })),
          (thumb = data),
          dispatch(updateThumb({ resNo, resThumb: thumb }));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'scroll';
    dispatch(ownerRes(resNo));
    //나중에 변경

    dispatch(ownHeader('o22'));

    // init();
  }, [resNo]);

  const [openState, setOpenState] = useState('');

  const [shopModal, setIsShopModal] = useState('');
  const [modeSelModal, setModeSelModal] = useState(false);

  const shopOpenM = () => {
    setIsShopModal(true);
    document.getElementsByTagName('label')[1].click();
  };

  const shopCloseM = o => {
    if (o) {
      document.getElementsByTagName('label')[1].click();
      dispatch(resOpen({ resNo, open: !restaurant.open }));
    }
    setIsShopModal(false);
  };
  const modeSelOpenM = () => {
    setModeSelModal(true);
  };
  const modeSelCloseM = () => {
    setModeSelModal(false);
  };

  return (
    <>
      {!loading && restaurant && (
        <>
          <HeaderOwner ownerInfo={ownerInfo} />

          <Container>
            <ContentWrapper>
              <OwnerInfo store={restaurant} onChangeFile={onChangeFile} />
              <Button>
                <ButtonInput
                  id="buttonInput"
                  defaultChecked={restaurant.resWaiting == 'T' && true}
                />
                <ButtonLabel htmlFor="buttonInput" onClick={shopOpenM}>
                  <ButtonSpan></ButtonSpan>
                </ButtonLabel>
              </Button>
              <RightContent>
                <OwnerMenu
                  modeSelModal={modeSelModal}
                  modeSelOpenM={modeSelOpenM}
                  modeSelCloseM={modeSelCloseM}
                  resNo={restaurant.resNo}
                />
                <ListContainer resOpen={restaurant.open} list={waiting} />
              </RightContent>
            </ContentWrapper>
          </Container>
        </>
      )}

      {!shopModal ? null : (
        <ShopOpenModal shopOpen={restaurant.open} shopCloseM={shopCloseM} />
      )}
    </>
  );
};

export default withRouter(OwnerContainer);
