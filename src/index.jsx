// import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ErrorBoundary } from 'react-error-boundary';
// import { BrowserRouter } from 'react-router-dom';
import App from 'app/App';
// import { Providers } from 'contexts/Providers';
// import ErrorFallback from 'utils/ErrorFallback';

// =========================================================
// [index] | This is the entry point for the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
