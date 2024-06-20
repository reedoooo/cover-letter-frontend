// App.jsx
import { CssBaseline } from '@mui/material';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Providers } from 'contexts/Providers';
import { store } from 'store'; // Assuming you have configured your store here
import { NotFoundPage } from 'views/error';
import { Router } from '../routes';

function ErrorFallback(props) {
  return (
    <div className={'error-page'}>
      <NotFoundPage {...props} />
    </div>
  );
}

// =========================================================
// [App] | This code provides the app with the router and renders it
// =========================================================
const App = () => {
  const [someKey, setSomeKey] = React.useState(null);

  if (import.meta.hot) {
    import.meta.hot.dispose(() => Router.dispose());
  }

  return (
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reloading the page to restore the initial state
          // of the current page
          console.log('reloading the page...');
          window.location.reload();

          // other reset logic...
        }}
        resetKeys={[someKey]} // Reset error boundary when someKey changes
        onError={(error, errorInfo) => {
          // log the error
          console.log('Error caught!');
          console.error(error);
          console.error(errorInfo);
        }}
      >
        {/* <ReduxProvider store={store}> */}
        <CssBaseline />
        <Providers>
          <RouterProvider router={Router} />
        </Providers>
        {/* </ReduxProvider> */}
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
