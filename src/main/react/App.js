import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import './react_dates_overrides.css';
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
import RestaurantContainer from './components/pages/admin/RestaurantContainer';
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
import OwnerLoginContainer from './components/pages/owner/OwnerLoginContainer';
import AdminLoginContainer from './components/pages/admin/AdminLoginContainer';
import AddShopContainer from './components/pages/owner/AddShopContainer';

const App = () => {
  const path = process.env.PATH;
  const { member } = useSelector(({ member }) => ({ member: member.member }));

  return (
    <>
      <Switch>
        <Route path={path} exact component={HomeContainer} />
        <Route path={`${path}/restaurant/:resNo`} component={DetailContainer} />
        <Route path={`${path}/search/:keyword`} component={SearchContainer} />
        <Route path={`${path}/register`} component={RegisterContainer} />
        <Route path={`${path}/login`} component={LoginContainer} />
        <Route
          path={`${path}/@:memName`}
          render={() => (member ? <MypageContainer /> : <Redirect to={path} />)}
        />
        <Route
          path={`${path}/review`}
          render={() => (member ? <WriteContainer /> : <Redirect to={path} />)}
        />
        <Route path={`${path}/eatdeal`} exact component={EatdealContainer} />
        <Route
          path={`${path}/eatdeal/:eatNo`}
          component={EatdealDetailContainer}
        />
        <Route
          path={`${path}/payment/:eatNo`}
          component={EatdealpayContainer}
        />

        <Route path={`${path}/owner/:resNo`} exact component={OwnerContainer} />
        <Route
          path={`${path}/owner/:resNo/restaurant`}
          component={UpdateOwnerRestaurant}
        />
        <Route
          path={`${path}/owner/:resNo/eatdeal`}
          exact
          component={OwnerEatDealContainer}
        />
        <Route
          path={`${path}/owner/:resNo/statics`}
          component={OwnerStaticsContainer}
        />
        <Route
          path={`${path}/owner/:resNo/waiting`}
          exact
          component={OwnerWaitingContainer}
        />
        <Route
          path={`${path}/owner/:resNo/public`}
          component={WaitingPublicContainer}
        />
        <Route path={`${path}/ownerEnroll`} exact component={OwnerEnroll} />
        <Route
          path={`${path}/ownerMain`}
          exact
          component={OwnerLoginContainer}
        />
        <Route path={`${path}/ownerShop`} exact component={AddShopContainer} />

        <Route
          path={`${path}/adminLogin`}
          exact
          component={AdminLoginContainer}
        />
        <Route path={`${path}/admin`} exact component={AdminContainer} />
        <Route path={`${path}/admin/enroll`} component={RestaurantContainer} />
        <Route path={`${path}/admin/qna`} component={QnAContainer} />
        <Route path={`${path}/admin/owner`} component={ApplyOwnerContainer} />
        <Route path={`${path}/admin/review`} component={ReviewContainer} />
        <Redirect from="*" to={path} />
      </Switch>
      <Footer />
    </>
  );
};
export default App;
