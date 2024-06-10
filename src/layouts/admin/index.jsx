// Chakra imports
import { Box, CssBaseline, Portal, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { Route, Outlet } from 'react-router-dom';
import routes from '@/routes/index';
import { FooterAdmin } from 'components/index';
import { SidebarContext } from 'contexts/SidebarProvider';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import Navbar from 'layouts/navigation/navbar/NavbarAdmin';
import Sidebar from 'layouts/navigation/sidebar/Sidebar';

const AdminLayout = props => {
  const { ...rest } = props;
  const { theme } = useMode();
  const MuiTheme = useTheme();
  const [fixed] = useState(false);
  // const [toggleSidebar, setToggleSidebar] = useState(false);

  const {
    isSidebarOpen,
    isMobileSidebarOpen,
    setSidebarOpen,
    toggleSidebarOpen,
    toggleMobileSidebar,
    onClose,
  } = useContext(SidebarContext);
  const isUserLoggedIn = true; // Replace with actual login state
  const getActiveRoute = routes => {
    const route = routes.find(r => window.location.pathname.includes(r.path));
    return route ? route.name : 'Default';
  };

  const getActiveNavbar = routes => {
    const route = routes.find(r => window.location.pathname.includes(r.path));
    return route ? route.icon : null;
  };

  const getActiveNavbarText = routes => {
    const route = routes.find(r => window.location.pathname.includes(r.path));
    return route ? route.description : '';
  };
  console.log('FILTERED ROUTES', routes);
  const { onOpen } = useDisclosure();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Portal>
        <Box>
          <Navbar
            onOpen={onOpen}
            logoText={'Horizon UI Dashboard PRO'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            message={getActiveNavbarText(routes)}
            fixed={fixed}
          />
        </Box>
      </Portal>
      <Sidebar
        isOpen={isSidebarOpen}
        isMobileOpen={isMobileSidebarOpen}
        onOpen={toggleSidebarOpen}
        onMobileOpen={toggleMobileSidebar}
        onClose={onClose}
        routes={routes}
        {...rest}
      />
      <Box
        component="main"
        sx={{
          mx: 'auto',
          padding: { xs: '20px', md: '30px' },
          paddingRight: '20px',
          minHeight: '100vh',
          paddingTop: '50px',
          flexGrow: 1,
          p: 3,
          backgroundColor: theme => theme.palette.background.default,
          transition: theme =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: isSidebarOpen ? 240 : 0,
        }}
      >
        <Outlet />
      </Box>
      <Portal>
        <FooterAdmin />
      </Portal>
    </Box>
  );
};

export default AdminLayout;
//   return (
//     <Box>
//       <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
//         <CssBaseline />
//         <Sidebar routes={routes} display="none" {...rest} />
//         <Box
//           float="right"
//           minHeight="100vh"
//           height="100%"
//           overflow="auto"
//           // position="relative"
//           maxHeight="100%"
//           width={{ xs: '100%', xl: 'calc( 100% - 290px )' }}
//           maxWidth={{ xs: '100%', xl: 'calc( 100% - 290px )' }}
//           // transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
//           // transitionDuration=".2s, .2s, .35s"
//           // transitionProperty="top, bottom, width"
//           // transitionTimingFunction="linear, linear, ease"
//         >
//           <Portal>
//             <Box>
//               <Navbar
//                 onOpen={onOpen}
//                 logoText={'Horizon UI Dashboard PRO'}
//                 brandText={getActiveRoute(routes)}
//                 secondary={getActiveNavbar(routes)}
//                 message={getActiveNavbarText(routes)}
//                 fixed={fixed}
//                 {...rest}
//               />
//             </Box>
//           </Portal>
//           {getRoute() ? (
// <Box
//   sx={{
// mx: 'auto',
// padding: { xs: '20px', md: '30px' },
// paddingRight: '20px',
// minHeight: '100vh',
// paddingTop: '50px',
//   }}
// >
//               <Outlet />
//             </Box>
//           ) : null}
//           <Box>
//             <FooterAdmin />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
