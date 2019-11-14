import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../modules/member';
import HeaderPresenter from './HeaderPresenter';
import ModalTemplate from './ModalTemplate';
import ModalSearch from '../pages/user/ModalSearch';
import ModalUser from '../pages/user/ModalUser';

const HeaderContainer = ({ history }) => {
  const { member } = useSelector(({ member }) => ({ member: member.member }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

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
    </>
  );
};

export default withRouter(HeaderContainer);
