// App.jsx
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { Providers } from 'contexts/Providers';
import { Router } from '../routes';

// [App] | This code provides the app with the router and renders it
const App = () => {
  if (import.meta.hot) {
    import.meta.hot.dispose(() => Router.dispose());
  }
  return (
    <div className="App">
      <Providers>
        <CssBaseline />
        <RouterProvider router={Router} />
      </Providers>
    </div>
  );
};

export default App;
