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
import QnAContainer from './components/pages/admin/QnAContainer';
import UpdateOwnerRestaurant from './components/pages/owner/UpdateOwnerRestautrant';
import OwnerEatDealContainer from './components/pages/owner/OwnerEatDealContainer';
import OwnerStaticsContainer from './components/pages/owner/OwnerStaticsContainer';
import OwnerWaitingContainer from './components/pages/owner/waiting/OwnerWaitingContainer';
import ApplyOwnerContainer from './components/pages/admin/ApplyOwnerContainer';
import SearchContainer from './components/pages/user/search/SearchContainer';
import WaitingPublicContainer from './components/pages/owner/waiting/WaitingPublicContainer';
import ReviewContainer from './components/pages/admin/ReviewContainer';
import OwnerEnroll from './components/pages/owner/OwnerEnroll';
import MypageContainer from './components/pages/user/mypage/MypageContainer';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/figtable" exact component={HomeContainer} />
        <Route path="/figtable/restaurant/:resNo" component={DetailContainer} />
        <Route path="/figtable/search/:keyword" component={SearchContainer} />
        <Route path="/figtable/register" component={RegisterContainer} />
        <Route path="/figtable/login" component={LoginContainer} />
        <Route path="/figtable/@:memName" component={MypageContainer} />
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
        <Route path="/figtable/owner/:resNo" exact component={OwnerContainer} />
        <Route
          path="/figtable/owner/:resNo/restaurant"
          component={UpdateOwnerRestaurant}
        />
        <Route
          path="/figtable/owner/:resNo/eatdeal"
          component={OwnerEatDealContainer}
        />
        <Route
          path="/figtable/owner/:resNo/statics"
          component={OwnerStaticsContainer}
        />
        <Route
          path="/figtable/owner/:resNo/waiting"
          component={OwnerWaitingContainer}
        />
        <Route
          path="/figtable/owner/:resNo/public"
          component={WaitingPublicContainer}
        />
        <Route path="/figtable/ownerEnroll" exact component={OwnerEnroll} />
        <Route path="/figtable/admin" exact component={AdminContainer} />
        <Route path="/figtable/admin/enroll" component={InsertRestaurant} />
        <Route path="/figtable/admin/qna" component={QnAContainer} />
        <Route path="/figtable/admin/owner" component={ApplyOwnerContainer} />
        <Route path="/figtable/admin/review" component={ReviewContainer} />
        <Redirect from="*" to="/figtable" />
      </Switch>
      <Footer />
    </>
  );
};
export default App;
