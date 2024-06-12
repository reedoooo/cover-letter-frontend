import { uniqueId } from 'lodash';
import React, { createContext, useContext } from 'react';
import {
  useNavigate,
  useMatches,
  useHref,
  useLinkClickHandler,
  useRouteError,
  useNavigation,
  Navigate,
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
import useLazyLoadedComponents from 'hooks/useLazyLoadedComponents';

const NavigationContext = createContext();

const NavRouterProvider = ({ children }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const matches = useMatches();
  const error = useRouteError() || { message: 'An unknown error occurred' };

  // Extract crumbs from matches
  const crumbs = matches
    .filter(match => Boolean(match.handle?.crumb))
    .map(match => match.handle.crumb(match.data));

  return (
    <NavigationContext.Provider value={{ navigate, navigation, crumbs, error }}>
      {children}
    </NavigationContext.Provider>
  );
};

const use404Routes = (basePath = '') => {
  const { NotFoundPage } = useLazyLoadedComponents();

  return [
    {
      name: 'Error 404',
      path: '404',
      element: <NotFoundPage failedRoute={basePath} />,
      icon: <ErrorIcon />,
    },
    {
      name: 'Error 404',
      path: '*',
      element: <Navigate to="404" />,
      icon: <ErrorIcon />,
    },
  ];
};

const useRouteFetcher = () => {
  const components = useLazyLoadedComponents();

  const localData = {
    base: {
      id: uniqueId('router-base-'),
      layout: '/blank',
      name: 'Base',
      collapse: true,
      functionalStatus: false,
      items: [
        {
          id: uniqueId('router-base-'),
          name: 'Home',
          path: '/',
          icon: <HomeIcon />,
          functionalStatus: false,
        },
        {
          id: uniqueId('router-base-'),
          name: 'Hero Docs',
          path: '/hero-docs',
          icon: <HomeIcon />,
          functionalStatus: false,
        },
      ],
    },
    test: {
      id: uniqueId('router-test-'),
      layout: '/blank',
      name: 'Test',
      collapse: true,
      functionalStatus: false,
      items: [
        {
          id: uniqueId('router-test-'),
          name: 'Home',
          path: '/test',
          element: <components.Test />,
          icon: <components.HomeIcon />,
          functionalStatus: false,
        },
        {
          id: uniqueId('router-test-'),
          name: 'Chat Test',
          path: '/test/chat-test',
          element: <components.Chat />,
          icon: <components.ChatIcon />,
          functionalStatus: false,
        },
      ],
    },
    admin: {
      id: uniqueId('router-admin-'),
      layout: '/admin',
      name: 'Admin',
      collapse: true,
      functionalStatus: false,
      items: [
        {
          name: 'Dashboard',
          path: '',
          element: <Navigate to="dashboard" />,
          icon: <components.DashboardIcon />,
          functionalStatus: false,
        },
        {
          name: 'Main Dashboard',
          path: 'dashboard',
          element: <components.MainDashboard />,
          icon: <components.DashboardIcon />,
          functionalStatus: false,
        },
        {
          name: 'User Profile',
          path: 'profile',
          element: <components.UserProfile />,
          icon: <components.PersonIcon />,
          functionalStatus: false,
        },
        {
          name: 'Templates',
          path: 'templates',
          element: <components.Templates />,
          icon: <components.ColorLensIcon />,
          functionalStatus: false,
          children: [
            {
              name: 'Blog Post Generator',
              path: 'blog-post-generator',
              element: <components.BlogPostGenerator />,
              icon: <components.ArticleIcon />,
              functionalStatus: false,
            },
            {
              name: 'Chat Ai',
              path: 'chat-ai',
              element: <components.Chat />,
              icon: <components.ChatIcon />,
              functionalStatus: false,
            },
            {
              name: 'Code Converter',
              path: 'code-converter',
              element: <components.CodeConverter />,
              icon: <components.CodeIcon />,
              functionalStatus: false,
            },
            {
              name: 'Theme Generator',
              path: 'theme-generator',
              element: <components.ThemeGenerator />,
              icon: <components.ColorLensIcon />,
              functionalStatus: false,
            },
          ],
        },
        {
          name: 'WorkSpace',
          path: 'workspace',
          element: <components.WorkSpace />,
          icon: <components.WorkspaceIcon />,
          functionalStatus: false,
        },
      ],
    },
    auth: {
      id: uniqueId('router-auth-'),
      layout: '/auth',
      name: 'Auth',
      collapse: true,
      functionalStatus: false,
      items: [
        {
          name: 'Sign In',
          path: 'sign-in',
          element: <components.SignInCentered />,
          icon: <components.LockIcon />,
          functionalStatus: false,
        },
        {
          name: 'Sign Up',
          path: 'sign-up',
          element: <components.SignUpCentered />,
          icon: <components.PersonAddIcon />,
          functionalStatus: false,
        },
      ],
    },
  };

  const getLocalData = rt => [localData[rt]];

  const fetcher = rt =>
    new Promise(resolve => setTimeout(() => resolve(getLocalData(rt)), 1000));

  return { localData, getLocalData, fetcher };
};

const useLinkNavHandler = (to, options) => {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to, options);
  return { href, handleClick };
};

const useNavRouter = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavRouter must be used within a NavRouterProvider');
  }
  return context;
};

export {
  NavRouterProvider,
  useNavRouter,
  useLinkNavHandler,
  use404Routes,
  useRouteFetcher,
  useLazyLoadedComponents,
};

// import { uniqueId } from 'lodash';
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   lazy,
// } from 'react';
// import {
//   useNavigate,
//   useMatches,
//   useHref,
//   useLinkClickHandler,
//   useRouteError,
//   useNavigation,
//   Navigate,
// } from 'react-router-dom';
// // import {
// //   MainDashboard,
// //   UserProfile,
// //   Templates,
// //   BlogPostGenerator,
// //   Chat,
// //   CodeConverter,
// //   ThemeGenerator,
// //   WorkSpace,
// //   SignInCentered,
// //   SignUpCentered,
// // } from 'views';
// import {
//   ArticleIcon,
//   ChatIcon,
//   CodeIcon,
//   ColorLensIcon,
//   DashboardIcon,
//   ErrorIcon,
//   HomeIcon,
//   LockIcon,
//   NoteAddIcon,
//   PersonAddIcon,
//   PersonIcon,
//   TableChartIcon,
//   WorkspaceIcon,
// } from 'assets/humanIcons';
// import { componentPaths } from 'config/data';
// import { Loadable } from 'layouts/navigation/shared/loadable';
// // Navigation context
// const NavigationContext = createContext();

// const NavRouterProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const navigation = useNavigation();
//   const matches = useMatches();
//   const error = useRouteError() || { message: 'An unknown error occurred' };
//   // Extract crumbs from matches
//   const crumbs = matches
//     .filter(match => Boolean(match.handle?.crumb))
//     .map(match => match.handle.crumb(match.data));

//   return (
//     <NavigationContext.Provider
//       value={{
//         navigate,
//         navigation,
//         crumbs,
//         error,
//         // handleNavigation: () => {},
//       }}
//     >
//       {children}
//     </NavigationContext.Provider>
//   );
// };
// const use404Routes = (basePath = '') => {
//   const { NotFoundPage } = useLazyLoadedComponents();

//   return [
//     {
//       name: 'Error 404',
//       path: `404`,
//       element: <NotFoundPage failedRoute={basePath} />,
//       icon: <ErrorIcon />,
//     },
//     {
//       name: 'Error 404',
//       path: '*',
//       element: <Navigate to={`404`} />,
//       icon: <ErrorIcon />,
//     },
//   ];
// };
// const useRouteFetcher = () => {
//   const {
//     Test,
//     BlankLayout,
//     AdminLayout,
//     AuthLayout,
//     NotFoundPage,
//     Landing,
//     SignInCentered,
//     SignUpCentered,
//     DataTable,
//     MainDashboard,
//     UserProfile,
//     Templates,
//     WorkSpace,
//     BlogPostGenerator,
//     Chat,
//     CodeConverter,
//     ThemeGenerator,
//   } = useLazyLoadedComponents();
//   // Define the local data
//   const localData = {
//     base: {
//       id: uniqueId('router-base-'),
//       layout: '/blank',
//       name: 'Base',
//       collapse: true,
//       functionalStatus: false,
//       items: [
//         {
//           id: uniqueId('router-base-'),
//           name: 'Home',
//           path: '/',
//           icon: <HomeIcon />,
//           functionalStatus: false,
//         },
//         {
//           id: uniqueId('router-base-'),
//           name: 'Hero Docs',
//           path: '/hero-docs',
//           icon: <HomeIcon />,
//           functionalStatus: false,
//         },
//       ],
//     },
//     test: {
//       id: uniqueId('router-test-'),
//       layout: '/blank',
//       name: 'Test',
//       collapse: true,
//       functionalStatus: false,
//       items: [
//         {
//           id: uniqueId('router-test-'),
//           name: 'Home',
//           path: '/test',
//           element: <Test />,
//           icon: <HomeIcon />,
//           functionalStatus: false,
//         },
//         {
//           id: uniqueId('router-test-'),
//           name: 'Chat Test',
//           path: '/test/chat-test',
//           element: <Chat />,
//           icon: <ChatIcon />,
//           functionalStatus: false,
//         },
//       ],
//     },
//     admin: {
//       id: uniqueId('router-admin-'),
//       layout: '/admin',
//       name: 'Admin',
//       collapse: true,
//       functionalStatus: false,
//       items: [
//         {
//           name: 'Dashboard',
//           path: '',
//           element: <Navigate to="dashboard" />,
//           icon: <DashboardIcon />,
//           functionalStatus: false,
//         },
//         {
//           name: 'Main Dashboard',
//           path: 'dashboard',
//           element: <MainDashboard />,
//           icon: <DashboardIcon />,
//           functionalStatus: false,
//         },
//         {
//           name: 'User Profile',
//           path: 'profile',
//           element: <UserProfile />,
//           icon: <PersonIcon />,
//           functionalStatus: false,
//         },
//         {
//           name: 'Templates',
//           path: 'templates',
//           element: <Templates />,
//           icon: <ColorLensIcon />,
//           functionalStatus: false,
//           children: [
//             {
//               name: 'Blog Post Generator',
//               path: 'blog-post-generator',
//               element: <BlogPostGenerator />,
//               icon: <ArticleIcon />,
//               functionalStatus: false,
//             },
//             {
//               name: 'Chat Ai',
//               path: 'chat-ai',
//               element: <Chat />,
//               icon: <ChatIcon />,
//               functionalStatus: false,
//             },
//             {
//               name: 'Code Converter',
//               path: 'code-converter',
//               element: <CodeConverter />,
//               icon: <CodeIcon />,
//               functionalStatus: false,
//             },
//             {
//               name: 'Theme Generator',
//               path: 'theme-generator',
//               element: <ThemeGenerator />,
//               icon: <ColorLensIcon />,
//               functionalStatus: false,
//             },
//           ],
//         },
//         {
//           name: 'WorkSpace',
//           path: 'workspace',
//           element: <WorkSpace />,
//           icon: <WorkspaceIcon />,
//           functionalStatus: false,
//         },
//       ],
//     },
//     auth: {
//       id: uniqueId('router-auth-'),
//       layout: '/auth',
//       name: 'Auth',
//       collapse: true,
//       functionalStatus: false,
//       items: [
//         {
//           name: 'Sign In',
//           path: 'sign-in',
//           element: <SignInCentered />,
//           icon: <LockIcon />,
//           functionalStatus: false,
//         },
//         {
//           name: 'Sign Up',
//           path: 'sign-up',
//           element: <SignUpCentered />,
//           icon: <PersonAddIcon />,
//           functionalStatus: false,
//         },
//       ],
//     },
//   };

//   // Fetching local data based on route type
//   const getLocalData = rt => {
//     const data = {
//       base: localData.base,
//       test: localData.test,
//       admin: localData.admin,
//       auth: localData.auth,
//     };
//     return [data[rt]];
//   };

//   // Simulate fetching data with a delay
//   const fetcher = rt => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(getLocalData(rt));
//       }, 1000); // Simulate network delay
//     });
//   };

//   return { localData, getLocalData, fetcher };
// };
// const useLinkNavHandler = (to, options) => {
//   let href = useHref(to);
//   let handleClick = useLinkClickHandler(to, options);
//   return { href, handleClick };
// };
// const useNavRouter = () => {
//   const context = useContext(NavigationContext);
//   if (!context) {
//     throw new Error('useNavRouter must be used within a NavRouterProvider');
//   }
//   return context;
// };

// export {
//   NavRouterProvider,
//   useNavRouter,
//   useLinkNavHandler,
//   use404Routes,
//   useRouteFetcher,
//   useLazyLoadedComponents,
// };
