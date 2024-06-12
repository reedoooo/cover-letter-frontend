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

const Test = Loadable(lazy(() => import('views/test')));
const LoadersDisplay = Loadable(lazy(() => import('views/test/loaders')));

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('layouts/blank')));
const PageLayout = Loadable(lazy(() => import('layouts/page')));
const AdminLayout = Loadable(lazy(() => import('layouts/admin')));
const AuthLayout = Loadable(lazy(() => import('layouts/auth')));
const RootLayout = Loadable(lazy(() => import('layouts/root')));
const ActiveLayout = Loadable(lazy(() => import('layouts/generic-layouts')));
/* ****Pages***** */
const NotFoundPage = Loadable(lazy(() => import('views/error/NotFound')));
const RootErrorBoundary = Loadable(lazy(() => import('views/error/NotFound')));
const Landing = Loadable(lazy(() => import('views/land/landing')));
const HeroDocs = Loadable(lazy(() => import('views/land/heroDocs')));

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
const base = `${window.location.origin}`;

// =========================================================
// Base Routes
// =========================================================
const baseRoutes = [
  {
    name: 'Docs',
    path: '/land',
    breadcrumb: 'Root',
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
      {
        name: 'Test Home',
        path: 'test-home',
        breadcrumb: 'Test Home',
        element: <Test />,
        errorElement: <RootErrorBoundary />,
        icon: <HomeIcon />,
        collapse: false,
      },
      {
        name: 'Chat Test',
        path: 'chat-test',
        breadcrumb: 'Chat Test',
        element: <Chat />,
        errorElement: <RootErrorBoundary />,
        icon: <ChatIcon />,
        collapse: false,
      },
      {
        name: 'Loaders Test',
        path: 'loaders-test',
        breadcrumb: 'Loaders Test',
        element: <LoadersDisplay />,
        errorElement: <RootErrorBoundary />,
        icon: <PendingIcon />,
        collapse: false,
      },
      // {
      //   name: 'My Projects',
      //   disabled: true,
      //   path: 'my-projects-test',
      //   icon: React.createElement(Icon, {
      //     as: MdLayers,
      //     width: '20px',
      //     height: '20px',
      //     color: 'inherit',
      //   }),
      //   collapse: false,
      // },
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
    items: [
      'Main Dashboard',
      'Data Tables',
      {
        name: 'Templates',
        icon: 'documentscannerroundedicon',
        items: [
          'Templates Home',
          'Original Chat Ai',
          'Blog Post Generator',
          'Code Converter',
          'Theme Generator',
          'Template Generator',
        ],
      },
      'Profile',
    ],
    children: [
      {
        name: 'Main Dashboard',
        path: 'dashboard',
        breadcrumb: 'Main Dashboard',
        exact: true,
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
      // {
      //   name: 'Work Space',
      //   path: 'workspace',
      //   element: <WorkSpace />,
      //   icon: <WorkspaceIcon />,
      // },
      {
        name: 'Templates',
        path: 'templates',
        breadcrumb: 'Templates',
        element: <ActiveLayout layout="columnRight" />,
        icon: <DocumentScannerRoundedIcon />,
        collapse: true,
        children: [
          {
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
            element: <ThemeGenerator />,
            link: `${base}/templates/generate-template`,
            description: 'Template Generator Description',
            functionalStatus: false,
            icon: <NoteAddIcon />,
            collapse: false,
          },
          // {
          //   name: 'Email Enhancer',
          //   disabled: true,
          //   path: 'email-enhancer',
          //   icon: /*#__PURE__*/ React.createElement(Icon, {
          //     as: IoMdPerson,
          //     width: '20px',
          //     height: '20px',
          //     color: 'inherit',
          //   }),
          //   invisible: true,
          //   collapse: false,
          // },
          // {
          //   name: 'LinkedIn Message',
          //   disabled: true,
          //   path: 'linkedin-message',
          //   icon: React.createElement(Icon, {
          //     as: IoMdPerson,
          //     width: '20px',
          //     height: '20px',
          //     color: 'inherit',
          //   }),
          //   invisible: true,
          //   collapse: false,
          // },
          // {
          //   name: 'Content Simplifier',
          //   disabled: true,
          //   path: 'simplifier',
          //   icon: React.createElement(Icon, {
          //     as: IoMdPerson,
          //     width: '20px',
          //     height: '20px',
          //     color: 'inherit',
          //   }),
          //   invisible: true,
          //   collapse: false,
          // },
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
    ],
  },
];
// =========================================================
// Auth Routes
// =========================================================
const authRoutes = [
  {
    name: 'Auth',
    path: '/auth',
    breadcrumb: 'Auth',
    element: <AuthLayout />,
    errorElement: <RootErrorBoundary />,
    icon: <LockIcon />,
    collapse: true,
    items: ['Sign In', 'Sign Up', 'Logout'],
    children: [
      {
        name: 'Sign In',
        path: 'sign-in',
        breadcrumb: 'Sign In',
        // action: loginAction,
        // loader: loginLoader,
        element: <SignInCentered />,
        icon: <LockIcon />,
        collapse: false,
      },
      {
        name: 'Sign Up',
        path: 'sign-up',
        breadcrumb: 'Sign Up',
        element: <SignUpCentered />,
        icon: <PersonAddIcon />,
        collapse: false,
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
      // {
      //   name: 'Profile Settings',
      //   disabled: true,
      //   path: '/settings',
      //   icon: React.createElement(Icon, {
      //     as: MdOutlineManageAccounts,
      //     width: '20px',
      //     height: '20px',
      //     color: 'inherit',
      //   }),
      //   invisible: true,
      //   collapse: false,
      // },
    ],
  },
];
// =========================================================
// Root Routes
// =========================================================
const rootRoutes = [
  {
    name: 'Root',
    path: '/',
    breadcrumb: 'Root',
    icon: <HomeIcon />,
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    collapse: true,
    loader() {
      // Our root route always provides the user, if logged in
      return {
        user: {
          name: 'Admin',
          email: 'Admin@Fmail.com',
          avatar: 'assets/img/avatars/avatar2.png',
          role: 'admin',
        },
      };
    },
    children: [
      {
        index: true,
        name: 'Home',
        path: '',
        breadcrumb: 'Home',
        element: <Landing />,
        icon: <HomeIcon />,
        invisible: false,
        collapse: false,
      },
      ...baseRoutes,
      ...testRoutes,
      ...adminRoutes,
      ...authRoutes,
    ],
  },
];
// Combine all routes into a single array to be used in the router
const routes = [...rootRoutes];
// Add items property to routes with collapse value of true
const addItemsToRoutes = routes => {
  routes.forEach(route => {
    if (route.collapse) {
      route.items = route.children.map(child => ({
        ...child,
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

console.log('ROUTES', routes);

export const Router = createBrowserRouter(routes);

console.log('ROUTER', Router);

export default routes;
