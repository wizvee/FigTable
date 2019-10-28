import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/common/Footer';
import HomeContainer from './components/pages/user/HomeContainer';
import DetailContainer from './components/pages/user/detail/DetailContainer';
import AdminContainer from './components/pages/admin/AdminContainer';
import OwnerContainer from './components/pages/owner/OwnerContainer';
import RegisterContainer from './components/pages/user/RegisterContainer';
import LoginContainer from './components/pages/user/LoginContainer';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/figtable" exact component={HomeContainer} />
        <Route path="/figtable/restaurant/:resNo" component={DetailContainer} />
        <Route path="/figtable/register" component={RegisterContainer} />
        <Route path="/figtable/login" component={LoginContainer} />
        <Route path="/figtable/owner" component={OwnerContainer} />
        <Route path="/figtable/admin" component={AdminContainer} />
        <Redirect from="*" to="/figtable" />
      </Switch>
      <Footer />
    </>
  );
};
export default App;
