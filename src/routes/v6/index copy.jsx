// import { uniqueId } from 'lodash';
// import React, { lazy } from 'react';
// import {
//   Navigate,
//   createBrowserRouter,
//   useRouteError,
//   Outlet,
// } from 'react-router-dom';
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
// import { components } from 'config/data';
// import {
//   // useLazyLoadedComponents,
//   use404Routes,
//   useRouteFetcher,
// } from 'contexts/NavRouterProvider';
// // import ActiveLayout from 'layouts/generic-layouts';
// import Loadable from 'layouts/navigation/shared/loadable';
// import ErrorPage from './error-page';
// import Root, { loader as rootLoader } from './root';
// import { c } from 'vite/dist/node/types.d-aGj9QkWt';

// const base = `${window.location.origin}`;
// const {
//   Test,
//   SignInCentered,
//   SignUpCentered,
//   DataTable,
//   MainDashboard,
//   UserProfile,
//   Templates,
//   WorkSpace,
//   BlogPostGenerator,
//   Chat,
//   CodeConverter,
//   ThemeGenerator,
//   NotFoundPage,
//   Landing,
//   AdminLayout,
//   AuthLayout,
//   TemplateGenerator,
//   BlankLayout,
//   ActiveLayout,
// } = components;
// // =========================================================
// const RootErrorBoundary = () => {
//   let error = useRouteError() || { message: 'An unknown error occurred' };
//   return (
//     <div>
//       <h1>Uh oh, something went terribly wrong 😩</h1>
//       <pre>{error.message || JSON.stringify(error)}</pre>
//       <button onClick={() => (window.location.href = '/')}>
//         Click here to reload the app
//       </button>
//     </div>
//   );
// };

// // =========================================================
// // Base Routes
// // =========================================================

// const baseRoutes = [
//   {
//     id: uniqueId('router-base-'),
//     path: '/land',
//     element: <ActiveLayout layout="columnRight" />,
//     name: 'Land',
//     icon: <HomeIcon />,
//     collapse: true,
//     functionalStatus: false,
//     // loader: rootLoader('base'),
//     children: [
//       {
//         name: 'Landing',
//         element: <Navigate to="/hero-docs" />,
//         errorElement: <RootErrorBoundary />,
//         icon: <HomeIcon />,
//       },
//       {
//         name: 'Hero Docs',
//         path: 'hero-docs', // This remains relative
//         element: <Landing />,
//         exact: true,
//         state: {
//           title: 'Hero Docs',
//           description: 'Hero Docs Description',
//         },
//         icon: <HomeIcon />,
//       },
//     ],
//   },
// ];

// // =========================================================
// // Test Routes
// // =========================================================
// const testRoutes = [
//   {
//     id: uniqueId('router-test-'),
//     path: '/test',
//     element: <BlankLayout />,
//     children: [
//       {
//         name: 'home',
//         path: '',
//         element: <Navigate to="test-home" />,
//         errorElement: <RootErrorBoundary />,
//         icon: <DashboardIcon />,
//       },
//       {
//         name: 'Test Home',
//         path: 'test-home',
//         element: <Test />,
//         errorElement: <RootErrorBoundary />,
//         icon: <HomeIcon />,
//       },
//       {
//         name: 'Chat Test',
//         path: 'chat-test',
//         element: <Chat />,
//         errorElement: <RootErrorBoundary />,
//         icon: <ChatIcon />,
//       },
//     ],
//   },
// ];
// // =========================================================
// // Admin Routes
// // =========================================================
// const adminRoutes = [
//   {
//     id: uniqueId('router-admin-'),
//     path: '/admin',
//     element: <AdminLayout />,
//     children: [
//       {
//         name: 'Dashboard',
//         path: '',
//         element: <Navigate to="dashboard" />,
//         icon: <DashboardIcon />,
//       },
//       {
//         name: 'Main Dashboard',
//         path: 'dashboard',
//         exact: true,
//         element: <MainDashboard />,
//         icon: <DashboardIcon />,
//       },
//       {
//         name: 'Data Tables',
//         path: 'data-tables',
//         element: <DataTable />,
//         icon: <TableChartIcon />,
//       },
//       {
//         name: 'Work Space',
//         path: 'workspace',
//         element: <WorkSpace />,
//         icon: <WorkspaceIcon />,
//       },
//       {
//         id: uniqueId('router-admin-templates-'),
//         path: 'templates',
//         element: <ActiveLayout layout="columnRight" />,
//         children: [
//           {
//             id: uniqueId('templates-'),
//             name: 'Templates Home',
//             path: '',
//             element: <Templates />,
//             icon: <HomeIcon />,
//           },
//           {
//             id: uniqueId('templates-'),
//             name: 'Original Chat Ai',
//             path: 'original-chat-ai',
//             element: <Chat />,
//             link: `${base}/templates/original-chat-ai`,
//             icon: <ChatIcon />,
//             description: 'Original Chat Ai Description',
//             functionalStatus: true,
//           },
//           {
//             id: uniqueId('templates-'),
//             name: 'Blog Post Generator',
//             path: 'blog-post',
//             element: <BlogPostGenerator />,
//             link: `${base}/templates/blog-post`,
//             description: 'Blog Post Generator Description',
//             functionalStatus: false,
//             icon: <ArticleIcon />,
//           },
//           {
//             id: uniqueId('templates-'),
//             name: 'Code Converter',
//             path: 'code-converter',
//             element: <CodeConverter />,
//             link: `${base}/templates/code-converter`,
//             description: 'Code Converter Description',
//             functionalStatus: false,
//             icon: <CodeIcon />,
//           },
//           {
//             id: uniqueId('templates-'),
//             name: 'Theme Generator',
//             path: 'theme-generator',
//             element: <ThemeGenerator />,
//             link: `${base}/templates/theme-generator`,
//             description: 'Theme Generator Description',
//             functionalStatus: false,
//             icon: <ColorLensIcon />,
//           },
//           {
//             id: uniqueId('templates-'),
//             name: 'Template Generator',
//             path: 'generate-template',
//             element: <ThemeGenerator />,
//             link: `${base}/templates/generate-template`,
//             description: 'Template Generator Description',
//             functionalStatus: false,
//             icon: <NoteAddIcon />,
//           },
//         ],
//       },
//       {
//         name: 'Profile',
//         path: 'profile',
//         element: <UserProfile />,
//         icon: <PersonIcon />,
//       },
//     ],
//   },
// ];
// // =========================================================
// // Auth Routes
// // =========================================================
// const authRoutes = [
//   {
//     id: uniqueId('router-auth-'),
//     path: '/auth',
//     element: <AuthLayout />,
//     children: [
//       {
//         name: 'Sign In',
//         path: '',
//         element: <Navigate to="sign-in" />,
//         icon: <LockIcon />,
//       },
//       {
//         name: 'Sign In',
//         path: 'sign-in',
//         element: <SignInCentered />,
//         icon: <LockIcon />,
//       },
//       {
//         name: 'Sign Up',
//         path: 'sign-up',
//         element: <SignUpCentered />,
//         icon: <PersonAddIcon />,
//       },
//     ],
//   },
// ];
// // =========================================================
// // Root Routes
// // =========================================================
// const rootRoutes = [
//   {
//     path: '/',
//     element: <Root />,
//     errorElement: <RootErrorBoundary />,
//     loader: rootLoader,
//     // action: async ({ request }) => {
//     //   return console.log(request);
//     // },
//     children: [
//       {
//         errorElement: <ErrorPage />,
//         children: [
//           { index: true, element: <Landing /> },
//           ...baseRoutes,
//           ...testRoutes,
//           ...adminRoutes,
//           ...authRoutes,
//         ],
//       },
//     ],
//   },
// ];

// // Combine all routes into a single array to be used in the router
// const routes = [...rootRoutes];
// console.log('ROUTES', routes);

// export const Router = createBrowserRouter(
//   routes.map(route => {
//     console.log('ROUTE', route);
//     return {
//       ...route,
//       children: route.children
//         ? route.children.map(childRoute => {
//             return {
//               ...childRoute,
//               path: `${route.path}/${childRoute.path}`,
//             };
//           })
//         : null,
//     };
//   })
// );
// console.log('ROUTER', Router);
// export default routes;
