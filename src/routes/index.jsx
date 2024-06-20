import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import BugReportIcon from '@mui/icons-material/BugReport';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PendingIcon from '@mui/icons-material/Pending';
import { Icon } from '@mui/material';
import { uniqueId } from 'lodash';
import React, { lazy } from 'react';
import { IoMdPerson } from 'react-icons/io';
import { MdLayers, MdOutlineManageAccounts } from 'react-icons/md';
import {
  Navigate,
  createBrowserRouter,
  useRouteError,
  Outlet,
  redirect,
} from 'react-router-dom';
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
import { Loadable } from 'layouts/navigation/shared/loadable';
import { dispatch } from 'store/index';
import { setField } from 'store/Reducers/draftSlice';
import ErrorBoundary from 'utils/ErrorBoundary';
import { NotFoundPage } from 'views/error';

/* *** Error Utils *** */
const RootErrorBoundary = Loadable(
  lazy(() => import('utils/RouterErrorBoundary.jsx'))
);
const PageErrorBoundary = Loadable(
  lazy(() => import('utils/RouteErrorBoundary.jsx'))
);
const ErrorLayout = Loadable(lazy(() => import('layouts/error')));
// const ErrorPage = Loadable(lazy(() => import('views/error/ErrorPage')));
/* *** Layouts *** */
const BlankLayout = Loadable(lazy(() => import('layouts/blank')));
const PageLayout = Loadable(lazy(() => import('layouts/page')));
const AdminLayout = Loadable(lazy(() => import('layouts/admin')));
const AuthLayout = Loadable(lazy(() => import('layouts/auth')));
const ActiveLayout = Loadable(lazy(() => import('layouts/generic-layouts')));
/* *** Views *** */
const HeroDocs = Loadable(lazy(() => import('views/land/heroDocs')));

const Test = Loadable(lazy(() => import('views/test')));
const LoadersDisplay = Loadable(lazy(() => import('views/test/loaders')));

const SignInCentered = Loadable(lazy(() => import('views/auth/signIn')));
const SignUpCentered = Loadable(lazy(() => import('views/auth/signUp')));

const MainDashboard = Loadable(lazy(() => import('views/admin/default')));
const DataTable = Loadable(lazy(() => import('views/admin/dataTables')));
const UserProfile = Loadable(lazy(() => import('views/admin/profile')));

const Templates = Loadable(lazy(() => import('views/admin/templates')));
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
const EditorInterface = Loadable(
  lazy(() => import('views/admin/templates/components/EditorInterface'))
);
const TemplateGenerator = Loadable(
  lazy(() => import('views/admin/templates/components/TemplateGenerator.jsx'))
);
const base = `${window.location.origin}`;

// =========================================================
// Base Routes
// =========================================================
const baseRoutes = [
  {
    name: 'Docs',
    path: '/land',
    breadcrumb: 'Docs',
    element: <BlankLayout />,
    errorElement: <RootErrorBoundary />,
    icon: <HomeIcon />,
    collapse: true,
    invisible: false,
    items: ['Hero Docs'],
    children: [
      {
        name: 'Hero Docs',
        path: 'heroDocs',
        breadcrumb: 'Hero Docs',
        element: <HeroDocs />,
        icon: <FolderRoundedIcon />,
        invisible: false,
        collapse: false,
      },
    ],
  },
];
// =========================================================
// Test Routes
// =========================================================
const testRoutes = [
  {
    name: 'Test',
    path: '/test',
    breadcrumb: 'Test',
    element: <PageLayout />,
    errorElement: <RootErrorBoundary />,
    icon: <BugReportIcon />,
    collapse: true,
    items: ['Test Home', 'Chat Test', 'Loaders Test'],
    children: [
      // {
      //   index: true,
      //   path: 'test-home',
      //   element: <Navigate to="/test/test-home" />,
      // },
      {
        index: true,
        name: 'Test Home',
        path: 'test-home',
        breadcrumb: 'Test Home',
        element: <Test />,
        icon: <HomeIcon />,
        collapse: false,
      },
      {
        name: 'Chat Test',
        path: 'chat-test',
        breadcrumb: 'Chat Test',
        element: <Chat />,
        icon: <ChatIcon />,
        collapse: false,
      },
      {
        name: 'Loaders Test',
        path: 'loaders-test',
        breadcrumb: 'Loaders Test',
        element: <LoadersDisplay />,
        icon: <PendingIcon />,
        collapse: false,
      },
    ],
  },
];
// =========================================================
// Admin Routes
// =========================================================
const adminRoutes = [
  {
    name: 'Admin',
    path: '/admin',
    breadcrumb: 'Admin',
    element: <AdminLayout />,
    errorElement: <RootErrorBoundary />,
    icon: <AdminPanelSettingsRoundedIcon />,
    collapse: true,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/admin/dashboard" />,
      // },
      {
        index: true,
        name: 'Main Dashboard',
        path: 'dashboard',
        breadcrumb: 'Main Dashboard',
        element: <MainDashboard />,
        icon: <DashboardIcon />,
        description: 'Main Dashboard',
        collapse: false,
      },
      {
        name: 'Data Tables',
        path: 'data-tables',
        breadcrumb: 'Data Tables',
        element: <DataTable />,
        icon: <TableChartIcon />,
        collapse: false,
      },
      {
        name: 'Templates',
        path: 'templates',
        breadcrumb: 'Templates',
        element: <ActiveLayout layout="columnRight" />,
        icon: <DocumentScannerRoundedIcon />,
        collapse: true,
        children: [
          // {
          //   index: true,
          //   // path: '/admin/templates',
          //   element: <Navigate to="/admin/templates/templates-home" />,
          // },
          {
            index: true,
            name: 'Templates Home',
            path: 'templates-home',
            breadcrumb: 'Templates Home',
            element: <Templates />,
            icon: <HomeIcon />,
            description: 'Original Chat Ai Description',
            functionalStatus: true,
            collapse: false,
          },
          {
            name: 'Original Chat Ai',
            path: 'original-chat-ai',
            breadcrumb: 'Original Chat Ai',
            element: <Chat />,
            link: `${base}/templates/original-chat-ai`,
            icon: <ChatIcon />,
            description: 'Original Chat Ai Description',
            functionalStatus: true,
            collapse: false,
          },
          {
            name: 'Blog Post Generator',
            path: 'blog-post',
            breadcrumb: 'Blog Post Generator',
            element: <BlogPostGenerator />,
            link: `${base}/templates/blog-post`,
            description: 'Blog Post Generator Description',
            functionalStatus: false,
            icon: <ArticleIcon />,
            collapse: false,
          },
          {
            name: 'Code Converter',
            path: 'code-converter',
            breadcrumb: 'Code Converter',
            element: <CodeConverter />,
            link: `${base}/templates/code-converter`,
            description: 'Code Converter Description',
            functionalStatus: false,
            icon: <CodeIcon />,
            collapse: false,
          },
          {
            name: 'Theme Generator',
            path: 'theme-generator',
            breadcrumb: 'Theme Generator',
            element: <ThemeGenerator />,
            link: `${base}/templates/theme-generator`,
            description: 'Theme Generator Description',
            functionalStatus: false,
            icon: <ColorLensIcon />,
            collapse: false,
          },
          {
            name: 'Template Generator',
            path: 'generate-template',
            breadcrumb: 'Template Generator',
            element: <TemplateGenerator />,
            link: `${base}/templates/generate-template`,
            description: 'Template Generator Description',
            functionalStatus: false,
            icon: <NoteAddIcon />,
            collapse: false,
          },
          {
            name: 'Template Editor',
            path: 'editor',
            breadcrumb: 'Template Editor',
            element: <EditorInterface />,
            link: `${base}/templates/editor`,
            description: 'Editor Description',
            functionalStatus: false,
            icon: <NoteAddIcon />,
            collapse: false,
          },
        ],
      },
      {
        name: 'Profile',
        path: 'profile',
        breadcrumb: 'Profile',
        element: <UserProfile />,
        icon: <PersonIcon />,
        collapse: false,
      },
      // {
      //   path: 'templates-home',
      //   element: <Navigate to="/admin/templates/templates-home" />,
      // },
      // {
      //   path: 'original-chat-ai',
      //   element: <Navigate to="/admin/templates/original-chat-ai" />,
      // },
      // {
      //   path: 'blog-post',
      //   element: <Navigate to="/admin/templates/blog-post" />,
      // },
      // {
      //   path: 'code-converter',
      //   element: <Navigate to="/admin/templates/code-converter" />,
      // },
      // {
      //   path: 'theme-generator',
      //   element: <Navigate to="/admin/templates/theme-generator" />,
      // },
      // {
      //   path: 'generate-template',
      //   element: <Navigate to="/admin/templates/generate-template" />,
      // },
      // {
      //   path: 'editor',
      //   element: <Navigate to="/admin/templates/editor" />,
      // },
    ],
  },
];
// =========================================================
// Auth Routes
// =========================================================
const authRoutes = [
  {
    type: 'layout',
    name: 'Auth',
    path: '/auth',
    breadcrumb: 'Auth',
    element: <AuthLayout />,
    errorElement: <RootErrorBoundary />,
    icon: <LockIcon />,
    collapse: true,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/auth/sign-in" />,
      // },
      {
        index: true,
        name: 'Sign In',
        path: 'sign-in',
        breadcrumb: 'Sign In',
        element: <SignInCentered />,
        icon: <LockIcon />,
        collapse: false,
        onLoginSuccess: (token, userData) => {
          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(setField({ field: 'isAuthenticated', value: true }));
        },
      },
      {
        name: 'Sign Up',
        path: 'sign-up',
        breadcrumb: 'Sign Up',
        element: <SignUpCentered />,
        icon: <PersonAddIcon />,
        collapse: false,
        onSignupSuccess: (token, userData) => {
          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(setField({ field: 'isAuthenticated', value: true }));
        },
      },
      {
        name: 'Logout',
        path: 'logout',
        breadcrumb: 'Logout',
        element: <Navigate to="/" />,
        collapse: false,
        icon: <PersonAddIcon />,
        async action() {
          // We signout in a "resource route" that we can hit from a fetcher.Form
          // await fakeAuthProvider.signout();
          return redirect('/');
        },
      },
    ],
  },
];
// =========================================================
// Root Routes
// =========================================================
const rootRoutes = [
  {
    type: 'root',
    name: 'Root',
    path: '/',
    element: <BlankLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/land/heroDocs" />,
      },
      ...baseRoutes,
      ...testRoutes,
      ...adminRoutes,
      ...authRoutes,
    ],
  },
  // {
  //   type: 'error',
  //   name: 'Error',
  //   path: '/error',
  //   element: <ErrorLayout />,
  //   // errorElement: <RootErrorBoundary />,
  //   children: [
  //     {
  //       index: true,
  //       path: '404',
  //       element: <Navigate to="/error/404" />,
  //     },
  //     {
  //       name: '404',
  //       element:
  //   ],
  // },
];
// Combine all routes into a single array to be used in the router
const routes = [...rootRoutes];
export const extractPaths = (routes, basePath = '') => {
  const paths = [];
  routes.forEach(route => {
    if (route.path) {
      const fullPath =
        basePath === '/' ? `/${route.path}` : `${basePath}${route.path}`;
      paths.push(fullPath);
      if (route.children) {
        paths.push(
          ...extractPaths(
            route.children,
            fullPath === '/' ? '' : `${fullPath}/`
          )
        );
      }
    } else if (route.index) {
      const fullPath = basePath.endsWith('/')
        ? basePath.slice(0, -1)
        : basePath;
      paths.push(fullPath);
    }
  });
  return paths;
};
// Add items property to routes with collapse value of true
const addItemsToRoutes = routes => {
  const routeLinks = extractPaths(routes);
  routes.forEach((route, index) => {
    const linkPath = routeLinks[index];
    console.log(`[LINK PATH @ ${route?.name}] `, linkPath);
    if (route.collapse) {
      route.items = route.children.map(child => ({
        ...child,
        link: linkPath,
        // name: child.name,
        // path: child.path,
        // layout: route.path,
        // element: child.element,
      }));
    }
    if (route.children) {
      addItemsToRoutes(route.children);
    }
  });
};
addItemsToRoutes(routes);

export const Router = createBrowserRouter(routes);

export const checkARouterValue = () => {
  const linkPaths = extractPaths(rootRoutes);
  console.log(linkPaths);
  console.log('ROUTES', routes);
  console.log('ROUTER', Router);
};

export const validateLinkPath = path => {
  const correctPaths = [
    '/',
    '/land',
    '/land/heroDocs',
    '/test',
    '/test/test-home',
    '/test/chat-test',
    '/test/loaders-test',
    '/admin',
    '/admin/dashboard',
    '/admin/data-tables',
    '/admin/templates',
    '/admin/templates/templates-home',
    '/admin/templates/original-chat-ai',
    '/admin/templates/blog-post',
    '/admin/templates/code-converter',
    '/admin/templates/theme-generator',
    '/admin/templates/generate-template',
    '/admin/templates/editor',
    '/admin/profile',
    '/auth',
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/logout',
    '/404',
  ];
  if (correctPaths.includes(path)) {
    return true;
  } else {
    console.log('Invalid Path:', path);
    return false;
  }
};

export default routes;
