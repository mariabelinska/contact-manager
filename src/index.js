import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { configureToast } from './services/configureToast';

configureToast();

ReactDOM.render(<App />, document.getElementById('root'));
