import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import storeReducers from './reducers/store';
import { Provider } from 'react-redux';


const store = createStore(storeReducers);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </React.StrictMode>
);