import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.css'
import "./styles/font-awesome-4.7.0/css/font-awesome.min.css"
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
