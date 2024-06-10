import { uniqueId } from 'lodash';
import { lazy } from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import {
  ArticleIcon,
  ChatIcon,
  CodeIcon,
  ColorLensIcon,
  DashboardIcon,
  ErrorIcon,
  HomeIcon,
  LockIcon,
  NoteAddIcon,
  PersonAddIcon,
  PersonIcon,
  TableChartIcon,
  WorkspaceIcon,
} from 'assets/humanIcons';
import ActiveLayout from 'layouts/generic-layouts';
import { Loadable } from 'layouts/navigation/shared/loadable';

const Test = Loadable(lazy(() => import('views/test')));

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('layouts/blank')));
// const PageLayout = Loadable(lazy(() => import('layouts/page')));
const AdminLayout = Loadable(lazy(() => import('layouts/admin')));
const AuthLayout = Loadable(lazy(() => import('layouts/auth')));

/* ****Pages***** */
const NotFoundPage = Loadable(lazy(() => import('views/error/NotFound')));
const Landing = Loadable(lazy(() => import('views/land/Docs/index.jsx')));

const SignInCentered = Loadable(lazy(() => import('views/auth/signIn')));
const SignUpCentered = Loadable(lazy(() => import('views/auth/signUp')));

const DataTable = Loadable(lazy(() => import('views/admin/dataTables')));
const MainDashboard = Loadable(lazy(() => import('views/admin/default')));
const UserProfile = Loadable(lazy(() => import('views/admin/profile')));

const Templates = Loadable(lazy(() => import('views/admin/templates')));
const WorkSpace = Loadable(lazy(() => import('views/admin/workspace')));
const BlogPostGenerator = Loadable(
  lazy(() => import('views/admin/templates/components/BlogPostGenerator'))
);
const Chat = Loadable(
  lazy(() => import('views/admin/templates/components/Chat'))
);
const CodeConverter = Loadable(
  lazy(() => import('views/admin/templates/components/CodeConverter'))
);
const ThemeGenerator = Loadable(
  lazy(() => import('views/admin/templates/components/ThemeGenerator'))
);

// This path = window.location.origin which is the base url
const base = `${window.location.origin}`;

// Function to generate 404 routes
const generate404Routes = (basePath = '') => [
  {
    name: 'Error 404',
    path: `404`,
    element: <NotFoundPage failedRoute={basePath} />,
    icon: <ErrorIcon />,
  },
  {
    name: 'Error 404',
    path: '*',
    element: <Navigate to={`404`} />,
    icon: <ErrorIcon />,
  },
];
const RootErrorBoundary = () => {
  let error = useRouteError() || { message: 'An unknown error occurred' };
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>
        Click here to reload the app
      </button>
    </div>
  );
};

// =========================================================
// Base Routes
// =========================================================

const baseRoutes = [
  {
    id: uniqueId('router-base-'),
    path: '/',
    layout: '/blank',
    name: 'Base',
    element: <BlankLayout />,
    collapse: true,
    children: [
      ...generate404Routes(),
      {
        name: 'Landing',
        path: '/',
        element: <Navigate to="/hero-docs" />,
        icon: <HomeIcon />,
      },
      {
        name: 'Hero Docs',
        path: '/hero-docs',
        exact: true,
        state: {
          title: 'Hero Docs',
          description: 'Hero Docs Description',
        },
        // replace: true,
        element: <Landing />,
        icon: <HomeIcon />,
      },
    ],
  },
];

// =========================================================
// Test Routes
// =========================================================

const testRoutes = [
  {
    id: uniqueId('router-test-'),
    path: '/test',
    layout: '/test',
    name: 'Test',
    element: <BlankLayout />,
    collapse: true,
    children: [
      ...generate404Routes('test'),
      {
        name: 'home',
        path: '',
        element: <Navigate to="test-home" />,
        errorElement: <RootErrorBoundary />,
        icon: <DashboardIcon />,
      },
      {
        name: 'Test Home',
        path: 'test-home',
        element: <Test />,
        errorElement: <RootErrorBoundary />,
        icon: <HomeIcon />,
      },
      {
        name: 'Chat Test',
        path: 'chat-test',
        element: <Chat />,
        errorElement: <RootErrorBoundary />,
        icon: <ChatIcon />,
      },
    ],
  },
];

// =========================================================
// Admin Routes
// =========================================================

const adminRoutes = [
  {
    id: uniqueId('router-admin-'),
    path: '/admin',
    layout: '/admin',
    name: 'Admin',
    element: <AdminLayout />,
    collapse: true,
    children: [
      ...generate404Routes('admin'),
      {
        name: 'Dashboard',
        path: '',
        element: <Navigate to="dashboard" />,
        icon: <DashboardIcon />,
      },
      {
        name: 'Main Dashboard',
        path: 'dashboard',
        exact: true,
        element: <MainDashboard />,
        icon: <DashboardIcon />,
      },
      {
        name: 'Data Tables',
        path: 'data-tables',
        element: <DataTable />,
        icon: <TableChartIcon />,
      },
      {
        name: 'Work Space',
        path: 'workspace',
        element: <WorkSpace />,
        icon: <WorkspaceIcon />,
      },
      {
        id: uniqueId('router-admin-templates-'),
        path: 'templates',
        layout: 'templates',
        element: <ActiveLayout layout="columnRight" />,
        collapse: true,
        children: [
          ...generate404Routes('admin/templates'),
          {
            id: uniqueId('templates-'),
            name: 'Templates Home',
            path: '',
            element: <Templates />,
            icon: <HomeIcon />,
          },
          {
            id: uniqueId('templates-'),
            name: 'Original Chat Ai',
            path: 'original-chat-ai',
            element: <Chat />,
            link: `${base}/templates/original-chat-ai`,
            icon: <ChatIcon />,
            description: 'Original Chat Ai Description',
            functionalStatus: true,
          },
          {
            id: uniqueId('templates-'),
            name: 'Blog Post Generator',
            path: 'blog-post',
            element: <BlogPostGenerator />,
            link: `${base}/templates/blog-post`,
            description: 'Blog Post Generator Description',
            functionalStatus: false,
            icon: <ArticleIcon />,
          },
          {
            id: uniqueId('templates-'),
            name: 'Code Converter',
            path: 'code-converter',
            element: <CodeConverter />,
            link: `${base}/templates/code-converter`,
            description: 'Code Converter Description',
            functionalStatus: false,
            icon: <CodeIcon />,
          },
          {
            id: uniqueId('templates-'),
            name: 'Theme Generator',
            path: 'theme-generator',
            element: <ThemeGenerator />,
            link: `${base}/templates/theme-generator`,
            description: 'Theme Generator Description',
            functionalStatus: false,
            icon: <ColorLensIcon />,
          },
          {
            id: uniqueId('templates-'),
            name: 'Template Generator',
            path: 'generate-template',
            link: `${base}/templates/generate-template`,
            description: 'Template Generator Description',
            functionalStatus: false,
            icon: <NoteAddIcon />,
          },
        ],
      },
      {
        name: 'Profile',
        path: 'profile',
        element: <UserProfile />,
        icon: <PersonIcon />,
      },
    ],
  },
];

// =========================================================
// Auth Routes
// =========================================================

const authRoutes = [
  {
    id: uniqueId('router-auth-'),
    path: '/auth',
    layout: '/auth',
    name: 'Auth',
    element: <AuthLayout />,
    collapse: true,
    children: [
      ...generate404Routes('auth'),
      {
        name: 'Sign In',
        path: '',
        element: <Navigate to="sign-in" />,
        icon: <LockIcon />,
      },
      {
        name: 'Sign In',
        path: 'sign-in',
        element: <SignInCentered />,
        icon: <LockIcon />,
      },
      {
        name: 'Sign Up',
        path: 'sign-up',
        element: <SignUpCentered />,
        icon: <PersonAddIcon />,
      },
    ],
  },
];

// Combine all routes into a single array to be used in the router
const routes = [...baseRoutes, ...testRoutes, ...adminRoutes, ...authRoutes];

export const Router = routes;
export default routes;
