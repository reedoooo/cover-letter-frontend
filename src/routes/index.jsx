import { uniqueId } from 'lodash';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
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

// const {
//   BarChartIcon,
//   EmojiEmotionsIcon,
//   HomeIcon,
//   LayersIcon,
//   LoginIcon,
//   PageviewIcon,
//   PersonAddIcon,
//   TextFieldsIcon,
//   ArticleIcon,
//   CodeIcon,
//   ColorLensIcon,
//   NoteAddIcon,
//   WorkIcon,
//   AssignmentIcon,
//   WorkspaceIcon,
//   TableChartIcon,
//   PersonIcon,
//   LockIcon,
//   ErrorIcon,
//   DashboardIcon,
//   ChatIcon,
// } = reedThaHumansIconLibrary;

const Test = Loadable(lazy(() => import('views/test')));

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('layouts/blank')));
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

// =========================================================
// ROUTES: Router
// =========================================================

const base = `${window.location.origin}`;

const routes = [
  {
    id: uniqueId('router-base-'),
    path: '/',
    element: <BlankLayout />,
    children: [
      {
        name: 'Error 404',
        path: '404',
        element: <NotFoundPage />,
        icon: <ErrorIcon />,
      },
      {
        name: 'Landing',
        path: '/',
        element: <Navigate to="/hero-docs" />,
        icon: <HomeIcon />,
      },
      {
        name: 'Hero Docs',
        path: 'hero-docs',
        exact: true,
        element: <Landing />,
        icon: <HomeIcon />,
      },
      {
        name: 'Error 404',
        path: '*',
        element: <Navigate to="404" />,
        icon: <ErrorIcon />,
      },
    ],
  },
  {
    id: uniqueId('router-test-'),
    path: 'test',
    element: <BlankLayout />,
    children: [
      {
        name: 'Chat Test',
        path: 'chat-test',
        element: <Test />,
        icon: <ChatIcon />,
      },
    ],
  },
  {
    id: uniqueId('router-admin-'),
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        name: 'Error 404',
        path: '404',
        element: <NotFoundPage />,
        icon: <ErrorIcon />,
      },
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
        id: uniqueId('router-templates-'),
        path: 'templates',
        element: <BlankLayout />,
        children: [
          {
            name: 'Error 404',
            path: '404',
            element: <NotFoundPage />,
            icon: <ErrorIcon />,
          },
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
            icon: <ChatIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
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
            icon: (
              <ArticleIcon sx={{ width: 20, height: 20, color: 'inherit' }} />
            ),
          },
          {
            id: uniqueId('templates-'),
            name: 'Code Converter',
            path: 'code-converter',
            element: <CodeConverter />,
            link: `${base}/templates/code-converter`,
            description: 'Code Converter Description',
            functionalStatus: false,
            icon: <CodeIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
          },
          {
            id: uniqueId('templates-'),
            name: 'Theme Generator',
            path: 'theme-generator',
            element: <ThemeGenerator />,
            link: `${base}/templates/theme-generator`,
            description: 'Theme Generator Description',
            functionalStatus: false,
            icon: (
              <ColorLensIcon sx={{ width: 20, height: 20, color: 'inherit' }} />
            ),
          },
          {
            id: uniqueId('templates-'),
            name: 'Template Generator',
            path: 'generate-template',
            link: `${base}/templates/generate-template`,
            description: 'Template Generator Description',
            functionalStatus: false,
            icon: (
              <NoteAddIcon sx={{ width: 20, height: 20, color: 'inherit' }} />
            ),
          },
          {
            id: uniqueId('templates-'),
            name: 'Error 404',
            path: '*',
            link: `${base}/404`,
            element: <Navigate to="404" />,
            description: 'Template Generator Description',
            functionalStatus: true,
            icon: <ErrorIcon />,
          },
        ],
      },
      {
        name: 'Profile',
        path: 'profile',
        element: <UserProfile />,
        icon: <PersonIcon />,
      },
      {
        name: 'Error 404',
        path: '*',
        element: <Navigate to="404" />,
        icon: <ErrorIcon />,
      },
    ],
  },
  {
    id: uniqueId('router-auth-'),
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        name: 'Error 404',
        path: '404',
        element: <NotFoundPage />,
        icon: <ErrorIcon />,
      },
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
      {
        name: 'Error 404',
        path: '*',
        element: <Navigate to="404" />,
        icon: <ErrorIcon />,
      },
    ],
  },
];
export const Router = routes;
export default routes;
