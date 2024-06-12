import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App';
import ErrorBoundary from 'utils/ErrorBoundary';

// =========================================================
// [index] | This is the entry point for the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
