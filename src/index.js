import React from 'react';
import ReactDOM from 'react-dom';

// global css
import './index.css';
import {
  Provider,
} from 'react-redux';
import {
  HashRouter as Router,
} from 'react-router-dom';
import App from './App';
import dvaCore from './dvaCore';

ReactDOM.render(
  <Provider store={dvaCore.start()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
