import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import { insertRecent } from './modules/recent';
import './index.css';
import App from './App';

const store = createStore(rootReducer, composeWithDevTools());

function loadRecent() {
  try {
    localStorage.removeItem('recent');
    const recent = localStorage.getItem('recent');
    if (!recent) return; // 최근 본 맛집이 없다면 아무 것도 안함
    // 최근 본 맛집 localStorage에서 불러오기
    console.log(recent);
    // store.dispatch(insertRecent(recent));
  } catch {
    console.log('localStorage is not working');
  }
}

loadRecent();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
