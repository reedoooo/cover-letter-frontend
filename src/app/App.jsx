// =========================================================

import { useRoutes } from 'react-router-dom';
import { Router } from '../routes';

// [App] | This code provides the app with the router and renders it
const App = () => {
  const appRoutes = useRoutes(Router);
  return <>{appRoutes}</>;
};

export default App;
