// =========================================================

import { CssBaseline } from '@mui/material';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Providers } from 'contexts/Providers';
import ErrorBoundary from 'utils/ErrorBoundary';
import { Router } from '../routes';

// [App] | This code provides the app with the router and renders it
const App = () => {
  const appRoutes = useRoutes(Router);
  return (
    <ErrorBoundary>
      <Providers>
        <CssBaseline />
        <BrowserRouter>{appRoutes}</BrowserRouter>
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
