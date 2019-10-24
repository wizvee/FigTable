import React, { useState } from 'react';
import HeaderPresenter from './HeaderPresenter';
import ModalTemplate from './ModalTemplate';
import ModalSearch from '../pages/user/ModalSearch';
import ModalUser from '../pages/user/ModalUser';

const HeaderContainer = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  // 가고싶다, 로그인 모달 열고 닫는 이벤트
  function openUserModal() {
    setIsUserModal(true);
    document.body.style.overflow = 'hidden';
  }
  function closeUserModal() {
    setIsUserModal(false);
    document.body.style.overflow = 'unset';
  }

  // 검색 모달 열고 닫는 이벤트
  function openSearchModal() {
    setIsSearchModal(true);
    document.body.style.overflow = 'hidden';
  }
  function closeSearchModal() {
    setIsSearchModal(false);
    document.body.style.overflow = 'unset';
  }

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
      >
        <ModalTemplate
          isModal={isUserModal}
          closeModal={closeUserModal}
          tooltip
        >
          <ModalUser closeModal={closeUserModal} />
        </ModalTemplate>
      </HeaderPresenter>
    </>
  );
};

export default HeaderContainer;
