import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import { insertRecent } from './modules/guest';
import { setMember, check } from './modules/member';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

function loadData() {
  // localStorage에서 최근 본 맛집 불러오기
  const recent = localStorage.getItem('recent');
  // sessionStorage에서 로그인 정보 가져오기
  const member = sessionStorage.getItem('member');
  // localStorage에서 로그인 정보 가져오기(로그인 유지 시)
  const keepMember = localStorage.getItem('member');
  if (!recent && !member) return;
  if (recent) store.dispatch(insertRecent(JSON.parse(recent)));
  if (member) store.dispatch(setMember(JSON.parse(member)));
  if (keepMember) store.dispatch(check(JSON.parse(keepMember).memNo));
}
loadData();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
