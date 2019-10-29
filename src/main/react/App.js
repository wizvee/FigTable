import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/common/Footer';
import HomeContainer from './components/pages/user/HomeContainer';
import DetailContainer from './components/pages/user/detail/DetailContainer';
import AdminContainer from './components/pages/admin/AdminContainer';
import OwnerContainer from './components/pages/owner/OwnerContainer';
import RegisterContainer from './components/pages/user/RegisterContainer';
import LoginContainer from './components/pages/user/LoginContainer';
import EatdealContainer from './components/pages/eatdeal/EatdealContainer';
import EatdealDetailContainer from './components/pages/eatdeal/EatdealDetailContainer';
import InsertRestaurant from './components/pages/admin/InsertRestaurant';
import UpdateRestaurant from './components/pages/admin/UpdateRestaurant';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/figtable" exact component={HomeContainer} />
        <Route path="/figtable/restaurant/:resNo" component={DetailContainer} />
        <Route path="/figtable/register" component={RegisterContainer} />
        <Route path="/figtable/login" component={LoginContainer} />
        <Route path="/figtable/eatdeal" exact component={EatdealContainer} />
        <Route
          path="/figtable/eatdeal/:eatNo"
          component={EatdealDetailContainer}
        />
        <Route path="/figtable/owner" exact component={OwnerContainer} />
        <Route path="/figtable/admin" exact component={AdminContainer} />
        <Route path="/figtable/admin/enroll" component={InsertRestaurant} />
        <Route path="/figtable/admin/restaurant" component={UpdateRestaurant} />
        <Redirect from="*" to="/figtable" />
      </Switch>
      <Footer />
    </>
  );
};
export default App;
