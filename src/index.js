import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import CoreContextProvider from './context/core-context';
import TempContextProvider from './context/temp-context';

//axios.defaults.baseURL = 'http://patient.local'; // dev
axios.defaults.baseURL = 'https://patient-api.siddhantait.com'; // production


ReactDOM.render(
  <React.StrictMode>
    <CoreContextProvider>
      <TempContextProvider>
        <App />
      </TempContextProvider>
    </CoreContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
