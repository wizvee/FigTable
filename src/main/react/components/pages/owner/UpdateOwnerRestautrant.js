import React, { useState, useCallback, useEffect } from 'react';
import HeaderOwner from './common/HeaderOwner';
import OwnerInfo from './common/OwnerInfo';
import OwnerLeftMenu from './common/OwnerLeftMenu';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerDetailTitle from './common/OwnerDetailTitle';
import OwnerShopForm from './OwnerShopForm';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ownHeader } from '../../../modules/ownerHeader';
import {
  ownerRes,
  changeField,
  selAddr,
  editRes,
  changeArray,
  removeArray,
} from '../../../modules/ownerRestaurant';
import client from '../../../lib/api/client';
import EditSuccessModal from './Modal/EditSuccessModal';

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

const UpdateOwnerRestautrant = ({ match }) => {
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
  } = useSelector(({ ownerRes, ownHeader, loading }) => ({
    restaurant: ownerRes.ownRestaurant,
    error: ownerRes.error,
    loading: loading['owner/OWNER_RES'],
    ownerInfo: ownHeader.ownerInfo,
    ownError: ownHeader.error,
    loading: loading['owner/OWN_HEADER'],
  }));

  const onChangeFile = useCallback(
    async ({ target: { files, name } }) => {
      const file = files[0];
      let form = new FormData();
      form.append('thumbnail', file);
      let thumb;
      await client
        .post(`${path}/api/ownerThumb/${resNo}`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          dispatch(changeField({ key: name, value: data })), (thumb = data);
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

  const onChangeArray = useCallback(
    (name, index, value) => {
      dispatch(changeArray({ name, index, value }));
    },
    [dispatch],
  );

  const onRemoveArray = useCallback(
    (type, index) => {
      dispatch(removeArray({ type, index }));
    },
    [dispatch],
  );

  const selectAddr = useCallback(
    (resAddress, resLat, resLong) => {
      dispatch(selAddr({ resAddress, resLat, resLong }));
    },
    [dispatch],
  );
  const [topMenu, setTopMenu] = useState('false');

  useEffect(() => {
    dispatch(ownerRes(resNo));
    dispatch(ownHeader('o22'));
  }, []);

  const [addressModal, setAddressModal] = useState(false);
  const addressModalOpen = () => {
    setAddressModal(true);
    document.body.style.overflow = 'hidden';
  };
  const addressModalClose = () => {
    setAddressModal(false);
    document.body.style.overflow = 'scroll';
  };

  const [successM, setSuccessM] = useState(false);
  const successModalOpen = () => {
    setSuccessM(true);
  };
  const successModalClose = () => {
    setSuccessM(false);
  };

  const onSubmit = () => {
    dispatch(editRes(restaurant));
    successModalOpen();
  };

  return (
    <>
      {!loading && restaurant && (
        <>
          <HeaderOwner ownerInfo={ownerInfo} />
          <Container>
            <ContainerWrapper>
              <Right>
                <OwnerDetailTitle title="가게정보 수정" />
                <OwnerShopForm
                  selectAddr={selectAddr}
                  addressModal={addressModal}
                  addressModalOpen={addressModalOpen}
                  addressModalClose={addressModalClose}
                  onChange={onChange}
                  onChangeFile={onChangeFile}
                  store={restaurant}
                  onSubmit={onSubmit}
                  onChangeArray={onChangeArray}
                  onRemoveArray={onRemoveArray}
                />
              </Right>
            </ContainerWrapper>
          </Container>
        </>
      )}
      {!successM ? (
        ''
      ) : (
        <EditSuccessModal successModalClose={successModalClose} />
      )}
    </>
  );
};

export default withRouter(UpdateOwnerRestautrant);
