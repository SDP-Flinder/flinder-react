// import react
import React from 'react';
// import render method from react dom
import { render } from 'react-dom';
// import global stylesj
import './GlobalStyles.css';
// import App component
import App from './components/app';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
