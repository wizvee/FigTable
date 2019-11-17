import React, { useState, useEffect, useCallback } from 'react';
import HeaderOwnerSimple from './common/HeaderOwnerSimple';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerForm from './OwnerForm';
import OwnerEnrollShopForm from './OwnerEnrollShopForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  enrollOwner,
  searchRes,
  selectRes,
  initializeForm,
  changeField,
  changeFile,
  selAddr,
  changeAuthFile,
  register,
} from '../../../modules/enrollOwner';
import client from '../../../lib/api/client';
import palette from '../../../lib/styles/Palette';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoIosAlert } from 'react-icons/io';
import SuccessModal from './Modal/SuccessModal';

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

const OwnerEnroll = () => {
  const path = process.env.PATH;
  const dispatch = useDispatch();
  const {
    owner,
    restaurant,
    restaurants,
    authFile,
    enrollSuccess,
  } = useSelector(({ enrollOwner }) => ({
    restaurant: enrollOwner.restaurant,
    owner: enrollOwner.owner,
    restaurants: enrollOwner.restaurants,
    authFile: enrollOwner.authFile,
    enrollSuccess: enrollOwner.enrollSuccess,
  }));

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
    dispatch(initializeForm('restaurant'));
    dispatch(initializeForm('owner'));
  }, [dispatch]);

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
      ownEmail,
      ownName,
      ownPassword,
      ownPasswordCk,
      ownPhone,
      ownStatics,
    } = owner;
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
    console.log(authFile);

    const reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,16}$/;
    if (
      [
        ownEmail,
        ownName,
        ownPassword,
        ownPasswordCk,
        ownPhone,
        ownStatics,
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
    if (!reg.test(ownPassword)) {
      // 비밀번호가 유효하지 않는다면
      setErrorMsg('비밀번호가 유효하지 않습니다');
      return;
    }
    if (ownPassword !== ownPasswordCk) {
      // 비밀번호가 일치하지 않는다면
      setErrorMsg('비밀번호가 일치하지 않습니다');
      return;
    }
    dispatch(
      register({
        ownEmail,
        ownName,
        ownPassword,
        ownPhone,
        ownStatics,
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

  const [successModal, SetSuccessModal] = useState(false);
  const sModalOpen = () => {
    SetSuccessModal(true);
  };
  const sModalClose = () => {
    SetSuccessModal(false);
  };

  useEffect(() => {
    if (enrollSuccess) {
      SetSuccessModal(true);
    }
  });
  return (
    <>
      <HeaderOwnerSimple />
      <Container>
        <ContentWrapper>
          <Title>회원가입</Title>
          <OwnerForm owner={owner} onChange={onChange} />
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
      {!successModal ? null : <SuccessModal sModalClose={sModalClose} />}
    </>
  );
};

export default OwnerEnroll;
