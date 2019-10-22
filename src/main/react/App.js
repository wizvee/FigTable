import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ModalTemplate from './components/common/ModalTemplate';
import ModalSearch from './components/pages/ModalSearch';
import ModalUser from './components/pages/ModalUser';
import HomeContainer from './components/pages/HomeContainer';
import DetailContainer from './components/pages/DetailContainer';

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
      <ModalTemplate
        isModal={isSearchModal}
        closeModal={closeSearchModal}
        fullwidth
      >
        <ModalSearch />
      </ModalTemplate>

      <Header
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
      </Header>
      <Switch>
        <Route path="/figtable" exact component={HomeContainer} />
        <Route path="/figtable/restaurants/:id" component={DetailContainer} />
        <Redirect from="*" to="/figtable" />
      </Switch>
      <Footer />
    </>
  );
};
export default App;
