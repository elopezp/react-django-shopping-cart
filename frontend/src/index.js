import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import store from './store'
import './index.css';
import './bootstrap.min.css'
import App from './App';
import './fontawesome'
import IntlWrapper from "./components/IntlWrapper";

ReactDOM.render(
  <Provider store={store}>
    <IntlWrapper>
      <App />
    </IntlWrapper>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
