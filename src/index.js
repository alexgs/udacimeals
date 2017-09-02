import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './components/App';
import { calendarReducer } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(
    calendarReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

ReactDOM.render(<App store={ store }/>, document.getElementById('root'));
registerServiceWorker();
