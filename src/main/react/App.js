import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/common/Header';
import Responsive from './components/common/Responsive';
import ModalTemplate from './components/common/ModalTemplate';
import ModalSearch from './components/pages/ModalSearch';
import HomeContainer from './components/pages/HomeContainer';
import ModalUser from './components/pages/ModalUser';

const ResponsiveBlock = styled(Responsive)`
  position: relative;
`;

const App = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);

  // 가고싶다, 로그인 모달 열고 닫는 이벤트
  function openUserModal() {
    setIsUserModal(true);
  }
  function closeUserModal() {
    setIsUserModal(false);
  }

  // 검색 모달 열고 닫는 이벤트
  function openSearchModal() {
    setIsSearchModal(true);
  }
  function closeSearchModal() {
    setIsSearchModal(false);
  }

  return (
    <>
      <Header openSearchModal={openSearchModal} openUserModal={openUserModal} />
      <ModalTemplate
        isModal={isSearchModal}
        closeModal={closeSearchModal}
        fullwidth
      >
        <ModalSearch />
      </ModalTemplate>
      <ResponsiveBlock>
        <ModalTemplate
          isModal={isUserModal}
          closeModal={closeUserModal}
          tooltip
        >
          <ModalUser />
        </ModalTemplate>
      </ResponsiveBlock>
      <Switch>
        <Route path="/figtable" exact component={HomeContainer} />
        <Redirect from="*" to="/figtable" />
      </Switch>
    </>
  );
};
export default App;
