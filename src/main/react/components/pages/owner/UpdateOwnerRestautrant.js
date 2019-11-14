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
import { ownerRes, changeField } from '../../../modules/ownerRestaurant';
import client from '../../../lib/api/client';

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

  .left {
    width: auto;
    height: auto;
    display: inline-block;
  }

  @media (max-width: 1024px) {
    .left {
      display: none;
    }
  }
  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const Right = styled.div`
  padding: 1rem;
  width: 65%;
  height: 100%;
  float: right;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 0.7rem;
  }
`;

const UpdateOwnerRestautrant = ({ match }) => {
  const { resNo } = match.params;

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

  const [topMenu, setTopMenu] = useState('false');

  useEffect(() => {
    setTopMenu(window.innerWidth <= 1024 ? true : false);
    const handleResize = () => {
      setTopMenu(window.innerWidth <= 1024 ? true : false);
    };
    window.addEventListener('resize', handleResize);
    dispatch(ownerRes(resNo));
    dispatch(ownHeader('o22'));
  }, []);

  return (
    <>
      {!loading && restaurant && (
        <>
          <HeaderOwner ownerInfo={ownerInfo} />
          <Container>
            <ContainerWrapper>
              <div className="left">
                <OwnerInfo store={restaurant} />
                <OwnerLeftMenu />
              </div>
              <Right>
                <OwnerDetailTitle title="가게정보 수정" topMenu={topMenu} />
                <OwnerShopForm store={restaurant} />
              </Right>
            </ContainerWrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default withRouter(UpdateOwnerRestautrant);
