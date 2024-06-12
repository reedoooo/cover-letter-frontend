import { lazy } from 'react';
import { Loadable } from 'layouts/navigation/shared/loadable';

const componentPaths = {
  Test: 'views/test',

  /* ***Layouts**** */
  BlankLayout: 'layouts/blank',
  // PageLayout: 'layouts/page',
  AdminLayout: 'layouts/admin',
  AuthLayout: 'layouts/auth',
  // ActiveLayout: 'layouts/generic-layouts',
  RootLayout: 'layouts/root',

  /* ****Pages***** */
  NotFoundPage: 'views/error/NotFound',
  Landing: 'views/land/landing',
  HeroDocs: 'views/land/heroDocs',
  // SignInCentered: 'views/auth/signIn',
  // SignUpCentered: 'views/auth/signUp',
  // DataTable: 'views/admin/dataTables',
  // MainDashboard: 'views/admin/default',
  // UserProfile: 'views/admin/profile',
  // Templates: 'views/admin/templates',
  // WorkSpace: 'views/admin/workspace',
  // BlogPostGenerator: 'views/admin/templates/components/BlogPostGenerator',
  // Chat: 'views/admin/templates/components/Chat',
  // CodeConverter: 'views/admin/templates/components/CodeConverter',
  // ThemeGenerator: 'views/admin/templates/components/ThemeGenerator',
};

const useLazyLoadedComponents = () => {
  const components = {};

  for (const [key, path] of Object.entries(componentPaths)) {
    components[key] = Loadable(
      lazy(() => import(/* @vite-ignore */ `${path}`))
    );
  }
  console.log('COMPONENTS', components);
  return components;
};

export default useLazyLoadedComponents;
