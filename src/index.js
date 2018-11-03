import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ThemeProvider from 'linnia-brand/ThemeProvider';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


ReactDOM.render(
  <CssBaseline>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </CssBaseline>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
