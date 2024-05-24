import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/index.css';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import ErrorBoundary from './utils/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>{' '}
  </React.StrictMode>,
);
