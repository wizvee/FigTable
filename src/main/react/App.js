import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/common/Footer';
import HomeContainer from './components/pages/user/HomeContainer';
import DetailContainer from './components/pages/user/detail/DetailContainer';
import AdminContainer from './components/pages/admin/AdminContainer';
import OwnerContainer from './components/pages/owner/OwnerContainer';
import RegisterContainer from './components/pages/user/RegisterContainer';
import LoginContainer from './components/pages/user/LoginContainer';
import WriteContainer from './components/pages/user/review/WriteContainer';
import EatdealContainer from './components/pages/eatdeal/EatdealContainer';
import EatdealDetailContainer from './components/pages/eatdeal/EatdealDetailContainer';
import EatdealpayContainer from './components/pages/eatdeal/EatdealpayContainer';
import InsertRestaurant from './components/pages/admin/InsertRestaurant';
import UpdateRestaurant from './components/pages/admin/UpdateRestaurant';
import UpdateOwnerRestaurant from './components/pages/owner/UpdateOwnerRestautrant';
import OwnerEatDealContainer from './components/pages/owner/OwnerEatDealContainer';
import OwnerReservationContainer from './components/pages/owner/OwnerReservationContainer';
import OwnerWaitingContainer from './components/pages/owner/OwnerWaitingContainer';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/figtable" exact component={HomeContainer} />
        <Route path="/figtable/restaurant/:resNo" component={DetailContainer} />
        <Route path="/figtable/register" component={RegisterContainer} />
        <Route path="/figtable/login" component={LoginContainer} />
        <Route path="/figtable/review" component={WriteContainer} />
        <Route path="/figtable/eatdeal" exact component={EatdealContainer} />
        <Route
          path="/figtable/eatdeal/:eatNo"
          component={EatdealDetailContainer}
        />

        <Route
          path="/figtable/payment/:eatNo"
          component={EatdealpayContainer}
        />
        <Route path="/figtable/owner" exact component={OwnerContainer} />
        <Route
          path="/figtable/owner/restaurant"
          component={UpdateOwnerRestaurant}
        />
        <Route
          path="/figtable/owner/eatdeal"
          component={OwnerEatDealContainer}
        />
        <Route
          path="/figtable/owner/reservation"
          component={OwnerReservationContainer}
        />
        <Route
          path="/figtable/owner/waiting"
          component={OwnerWaitingContainer}
        />

        <Route path="/figtable/admin" exact component={AdminContainer} />
        <Route path="/figtable/admin/enroll" component={InsertRestaurant} />
        <Route path="/figtable/admin/restaurant" component={UpdateRestaurant} />
        <Route path="/figtable/admin/owner" component={ApplyOwner} />
        <Redirect from="*" to="/figtable" />
      </Switch>
      <Footer />
    </>
  );
};
export default App;
