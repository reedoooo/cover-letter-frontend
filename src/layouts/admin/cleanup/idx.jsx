// import { Box, CssBaseline } from '@mui/material';
// import { SidebarContext } from 'contexts/SidebarContext';
// import React, { useState } from 'react';
// import { Outlet, Route } from 'react-router-dom';
// import Footer from 'components/themedV2/footer/FooterAdmin';
// import useMode from 'hooks/useMode';
// import Sidebar from 'layouts/navigation/sidebar/Sidebar';
// import routes from 'routes.jsx';

// export default function AdminLayout(props) {
//   const { ...rest } = props;
//   const { theme, colorModeValues } = useMode();
//   const [fixed] = useState(false);
//   const [toggleSidebar, setToggleSidebar] = useState(false);
//   // const { onOpen, onClose, close } = useDisclosure();
//   // Function to determine if the current route should display the default layout
//   const getRoute = () => {
//     return window.location.pathname !== '/admin/full-screen-maps';
//   };
//   // Function to get the active route name
//   const getActiveRoute = (routes) => {
//     let activeRoute = 'Default Brand Text';
//     for (let i = 0; i < routes.length; i++) {
//       if (routes[i].collapse) {
//         let collapseActiveRoute = getActiveRoute(routes[i].items);
//         if (collapseActiveRoute !== activeRoute) {
//           return collapseActiveRoute;
//         }
//       } else if (routes[i].category) {
//         let categoryActiveRoute = getActiveRoute(routes[i].items);
//         if (categoryActiveRoute !== activeRoute) {
//           return categoryActiveRoute;
//       } else {
//         if (
//           window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
//         ) {
//           return routes[i].name;
//       }
//     }
//     return activeRoute;
//   // Function to get the active navbar state
//   const getActiveNavbar = (routes) => {
//     let activeNavbar = false;
//         let collapseActiveNavbar = getActiveNavbar(routes[i].items);
//         if (collapseActiveNavbar !== activeNavbar) {
//           return collapseActiveNavbar;
//         let categoryActiveNavbar = getActiveNavbar(routes[i].items);
//         if (categoryActiveNavbar !== activeNavbar) {
//           return categoryActiveNavbar;
//           return routes[i].secondary;
//     return activeNavbar;
//   // Function to get the active navbar text
//   const getActiveNavbarText = (routes) => {
//         let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
//         let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
//           return routes[i].messageNavbar;
//   // Function to generate Route components based on the routes configuration
//   const getRoutes = (routes) => {
//     return routes.map((prop, key) => {
//       if (prop.layout === '/admin') {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             element={<prop.component />}
//             key={key}
//           />
//         );
//       if (prop.collapse) {
//         return getRoutes(prop.items);
//       if (prop.category) {
//       return null;
//     });
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box>
//         <CssBaseline />
//         {/* Sidebar context provider */}
//         <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
//           {/* Sidebar component */}
//           <Sidebar routes={routes} display="none" {...rest} />
//           {/* Main content area */}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               bgcolor: 'background.default',
//               minHeight: '100vh',
//               overflow: 'auto',
//               transition: theme.transitions.create(['margin', 'width'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//               }),
//               marginLeft: toggleSidebar ? '0px' : '240px',
//             }}
//           >
//             {/* Navbar component */}
//             <Navbar
//               onOpen={() => setToggleSidebar(!toggleSidebar)}
//               logoText="Horizon UI Dashboard PRO"
//               brandText={getActiveRoute(routes)}
//               secondary={getActiveNavbar(routes)}
//               message={getActiveNavbarText(routes)}
//               fixed={fixed}
//               {...rest}
//             />
//             {/* Content wrapper */}
//             {/* <Box sx={{ mx: 'auto', p: { xs: 2, md: 3 }, pt: 4 }}>
//               <Routes>
//                 {getRoutes(routes)}
//                 <Route path="*" element={<Navigate to="/admin/default" />} />
//               </Routes>
//             </Box> */}
//             {/* <Card
//               component={Box}
//               minHeight="100vh"
//               mx="auto"
//               pr={20}
//               pt={50}
//               py={{
//                 xs: 10,
//                 md: 20,
//               }}
//               px={{
//                 xs: 7.5,
//                 md: 12.5,
//             >
//               <Outlet />
//             </Card> */}
//             <Box sx={{ mx: 'auto', p: { xs: 2, md: 3 }, pt: 4 }}>
//             </Box>
//             <Box>
//               <Footer />
//           </Box>
//         </SidebarContext.Provider>
//       </Box>
//     </Box>
//   );
// }
