import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderOwner from './common/HeaderOwner';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';
import { ownHeader } from '../../../modules/ownerHeader';
import {
  setOwnersearchRes,
  searchRes,
  selectRes,
  initializeForm,
  changeField,
  changeFile,
  selAddr,
  changeAuthFile,
  setOwner,
  addShop,
} from '../../../modules/enrollOwner';
import OwnerEnrollShopForm from './OwnerEnrollShopForm';
import { IoIosAlert } from 'react-icons/io';
import client from '../../../lib/api/client';
import AddSuccessModal from './Modal/AddSuccessModal';

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
  justify-content: center;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  @media (max-width: 425px) {
    height: 1340px;
  }
`;

const Title = styled.div`
  width: 80%;
  height: 50px;
  background: white;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  padding-top: 14px;
`;

const SubmitWrapper = styled.div`
  width: 80%;
  height: 40px;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
  .error {
    display: inline-block;
    color: #fa5252;
    font-weight: 900;

    svg {
      font-size: 25px;
      position: relative;
      top: 7px;
      margin-right: 12px;
    }
  }
`;

const SubmitBT = styled.div`
  float: right;
  width: 130px;
  height: 40px;
  background: #f67280;
  opacity: 0.8;
  color: white;
  font-size: 17px;
  margin-right: 20px;
  padding-top: 10px;
  border-radius: 5px;
  text-align: center;
  letter-spacing: 2px;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const AddShopContainer = ({ match }) => {
  const { resNo } = match.params;
  const path = process.env.PATH;

  const dispatch = useDispatch();
  const {
    ownerInfo,
    ownError,
    ownLoading,
    owner,
    restaurant,
    restaurants,
    authFile,
    addSuccess,
    resList,
  } = useSelector(({ ownHeader, loading, enrollOwner, ownerWaiting }) => ({
    ownerInfo: ownHeader.ownerInfo,
    ownError: ownHeader.error,
    loading: loading['owner/OWN_HEADER'],
    owner: enrollOwner.owner,
    restaurant: enrollOwner.restaurant,
    restaurants: enrollOwner.restaurants,
    addSuccess: enrollOwner.addSuccess,
    authFile: enrollOwner.authFile,
    waitings: ownerWaiting.waitings,
    resList: enrollOwner.resList,
  }));

  //매장 검색
  const [shopSearchModal, setShopSearchModal] = useState(false);
  const shopSearchOpen = () => {
    setShopSearchModal(true);
    document.body.style.overflow = 'hidden';
  };
  const shopSearchClose = () => {
    setShopSearchModal(false);
    document.body.style.overflow = 'scroll';
  };
  const [isSearch, setIsSearch] = useState(false);
  const onSearch = useCallback(
    keyword => {
      setIsSearch(true);
      dispatch(searchRes(keyword));
    },
    [dispatch],
  );
  const onSelectRes = useCallback(
    resNo => {
      shopSearchClose();
      dispatch(selectRes(resNo));
    },
    [dispatch],
  );
  const [isNewInput, setIsNewInput] = useState(false);
  const newInput = () => {
    shopSearchClose();
    setIsNewInput(true);
  };

  const onChangeFile = useCallback(
    async ({ target: { files, name } }) => {
      const file = files[0];
      let form = new FormData();
      form.append('thumbnail', file);
      let thumb;
      await client
        .post(`${path}/api/ownerThumb/`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          dispatch(changeFile(data));
        });
    },
    [dispatch],
  );

  const onChange = useCallback(
    ({ target }) => {
      const { value, name } = target;
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );

  const [fileName, setFileName] = useState('');
  const onChangeAuthFile = useCallback(
    async ({ target: { files, name } }) => {
      const file = files[0];
      console.log(file);
      setFileName(file.name);
      let form = new FormData();
      form.append('AuthFile', file);
      let thumb;
      await client
        .post(`${path}/api/ownerAuth/`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          dispatch(changeAuthFile(data));
        });
    },
    [dispatch],
  );

  useEffect(() => {
    document.body.style.overflow = 'scroll';
    dispatch(setOwner(JSON.parse(sessionStorage.getItem('owner'))));
  }, [resNo]);

  useEffect(() => {
    dispatch(initializeForm('restaurant'));

    if (owner) dispatch(ownHeader(owner.ownNo));
  }, [owner, dispatch]);

  const selectAddr = useCallback(
    (resAddress, resLat, resLong) => {
      dispatch(selAddr({ resAddress, resLat, resLong }));
    },
    [dispatch],
  );

  const [addressModal, setAddressModal] = useState(false);
  const addressModalOpen = () => {
    setAddressModal(true);
    document.body.style.overflow = 'hidden';
  };
  const addressModalClose = () => {
    setAddressModal(false);
    document.body.style.overflow = 'scroll';
  };

  const [errorMsg, setErrorMsg] = useState('');
  const onSubmit = () => {
    setErrorMsg('');
    const {
      resNo,
      resName,
      resAddress,
      resTel,
      resLat,
      resLong,
      resLocationKeyword,
      resFoodKeyword,
      resThumb,
    } = restaurant;
    const reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,16}$/;
    if (
      [
        resName,
        resAddress,
        resTel,
        resLat,
        resLong,
        resLocationKeyword,
        resFoodKeyword,
        resThumb,
        authFile,
      ].includes('')
    ) {
      setErrorMsg('빈 칸을 모두 입력하세요');
      return;
    }
    let ownNo = owner.ownNo;
    dispatch(
      addShop({
        ownNo,
        resNo,
        resName,
        resAddress,
        resTel,
        resLat,
        resLong,
        resLocationKeyword,
        resFoodKeyword,
        resThumb,
        authFile,
      }),
    );
  };

  const [addSuccessM, SetAddSuccessM] = useState(false);
  const addSuccessMOpen = () => {
    SetAddSuccessM(true);
  };
  const addSuccessMClose = () => {
    SetAddSuccessM(false);
  };
  useEffect(() => {
    if (addSuccess) {
      addSuccessMOpen();
    }
  });

  return (
    <>
      {ownerInfo && (
        <>
          <HeaderOwner ownerInfo={ownerInfo} />
          <Container>
            <ContentWrapper>
              <Title>매장 추가등록</Title>
              <OwnerEnrollShopForm
                restaurant={restaurant}
                selectAddr={selectAddr}
                addressModal={addressModal}
                addressModalOpen={addressModalOpen}
                addressModalClose={addressModalClose}
                shopSearchModal={shopSearchModal}
                shopSearchOpen={shopSearchOpen}
                shopSearchClose={shopSearchClose}
                onSearch={onSearch}
                isSearch={isSearch}
                onSelectRes={onSelectRes}
                restaurants={restaurants}
                isNewInput={isNewInput}
                newInput={newInput}
                onChangeFile={onChangeFile}
                onChange={onChange}
                onChangeAuthFile={onChangeAuthFile}
                fileName={fileName}
              />

              <SubmitWrapper>
                {errorMsg.length > 1 && (
                  <div className="error">
                    <IoIosAlert />
                    {errorMsg}
                  </div>
                )}
                <SubmitBT onClick={onSubmit}>회원가입</SubmitBT>
              </SubmitWrapper>
            </ContentWrapper>
          </Container>
        </>
      )}
      {addSuccessM && (
        <AddSuccessModal resList={resList} addSucessMClose={addSuccessMClose} />
      )}
    </>
  );
};

export default AddShopContainer;
