// App.jsx
import { CssBaseline } from '@mui/material';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Providers } from 'contexts/Providers';
import { Router } from '../routes';

// [App] | This code provides the app with the router and renders it
const App = () => {
  const appRoutes = useRoutes(Router);
  return (
    <Providers>
      <CssBaseline />
      {appRoutes}
    </Providers>
  );
};

export default App;
