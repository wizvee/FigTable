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
import { insertRecent } from './modules/recent';

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
  if (!recent || !member) return;
  if (recent) store.dispatch(insertRecent(JSON.parse(recent)));
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
