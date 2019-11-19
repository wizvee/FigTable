import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../modules/member';
import HeaderPresenter from './HeaderPresenter';
import ModalTemplate from './ModalTemplate';
import ModalSearch from '../pages/user/ModalSearch';
import ModalUser from '../pages/user/ModalUser';
import QuestionContainer from '../pages/user/floatIcon/QuestionContainer';
import { setPosition } from '../../modules/guest';
import client from '../../lib/api/client';
import WaitingContainer from '../pages/user/floatIcon/WaitingContainer';

const HeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({ member: member.member }));

  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  // 가고싶다, 로그인 모달 열고 닫는 이벤트
  const openUserModal = useCallback(() => {
    setIsUserModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeUserModal = useCallback(() => {
    setIsUserModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  // 검색 모달 열고 닫는 이벤트
  const openSearchModal = useCallback(() => {
    setIsSearchModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeSearchModal = useCallback(() => {
    setIsSearchModal(false);
    document.body.style.overflow = 'unset';
  });

  const [keyword, setKeyword] = useState('');
  // search input event handler
  const onChange = useCallback(({ target: { value } }) => {
    setKeyword(value);
  }, []);
  // 검색 submit event handler
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      setIsSearchModal(false);
      document.body.style.overflow = 'unset';
      history.push(`${process.env.PATH}/search/${keyword}`);
    },
    [keyword],
  );

  // 로그아웃
  const onLogout = useCallback(() => {
    closeUserModal();
    dispatch(logout());
  }, []);

  // 위치 정보 얻기
  const API = 'https://maps.googleapis.com/maps/api/geocode/json';
  const KEY = process.env.GOOGLE_APIKEY;
  const getPosition = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          await client
            .get(`${API}?latlng=${latitude},${longitude}&key=${KEY}`)
            .then(
              ({
                data: {
                  results: [
                    {
                      address_components: [
                        ,
                        ,
                        { long_name: name },
                        { long_name: searchKey },
                      ],
                    },
                  ],
                },
              }) => {
                dispatch(
                  setPosition({
                    lat: latitude,
                    lon: longitude,
                    name,
                    searchKey,
                  }),
                );
              },
            );
        },
      );
    }
  }, []);

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <>
      <ModalTemplate
        isModal={isSearchModal}
        closeModal={closeSearchModal}
        fullwidth
      >
        <ModalSearch />
      </ModalTemplate>
      <HeaderPresenter
        isModal={isSearchModal}
        openSearchModal={openSearchModal}
        openUserModal={openUserModal}
        keyword={keyword}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <ModalTemplate
          isModal={isUserModal}
          closeModal={closeUserModal}
          tooltip
        >
          <ModalUser
            closeModal={closeUserModal}
            member={member}
            onLogout={onLogout}
          />
        </ModalTemplate>
      </HeaderPresenter>
      {member && member.waiting && <WaitingContainer />}
      <QuestionContainer />
    </>
  );
};

export default withRouter(React.memo(HeaderContainer));
