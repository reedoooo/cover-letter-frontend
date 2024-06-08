// Chakra imports
import { Box, CssBaseline, Portal } from '@mui/material';
import { useContext, useState } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import routes from '@/routes/index';
import { FooterAdmin } from 'components/index';
import Providers from 'contexts/Providers';
import { SidebarContext } from 'contexts/SidebarProvider';
import useMode from 'hooks/useMode';
import Navbar from 'layouts/navigation/navbar/NavbarAdmin';
import Sidebar from 'layouts/navigation/sidebar/Sidebar';

const AdminLayout = props => {
  const { ...rest } = props;
  const { theme } = useMode();
  const [fixed] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  const getRoute = () => {
    return location.pathname !== '/admin/full-screen-maps';
  };

  const getActiveRoute = routes => {
    let activeRoute = 'Default Brand Text';
    routes.forEach(route => {
      if (route.collapse) {
        const collapseActiveRoute = getActiveRoute(route.items);
        if (collapseActiveRoute !== activeRoute) {
          activeRoute = collapseActiveRoute;
        }
      } else if (route.category) {
        const categoryActiveRoute = getActiveRoute(route.items);
        if (categoryActiveRoute !== activeRoute) {
          activeRoute = categoryActiveRoute;
        }
      } else {
        if (window.location.href.indexOf(route.layout + route.path) !== -1) {
          activeRoute = route.name;
        }
      }
    });
    return activeRoute;
  };

  const getActiveNavbar = routes => {
    let activeNavbar = false;
    routes.forEach(route => {
      if (route.collapse) {
        const collapseActiveNavbar = getActiveNavbar(route.items);
        if (collapseActiveNavbar !== activeNavbar) {
          activeNavbar = collapseActiveNavbar;
        }
      } else if (route.category) {
        const categoryActiveNavbar = getActiveNavbar(route.items);
        if (categoryActiveNavbar !== activeNavbar) {
          activeNavbar = categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(route.layout + route.path) !== -1) {
          activeNavbar = route.secondary;
        }
      }
    });
    return activeNavbar;
  };

  const getActiveNavbarText = routes => {
    let activeNavbar = false;
    routes.forEach(route => {
      if (route.collapse) {
        const collapseActiveNavbar = getActiveNavbarText(route.items);
        if (collapseActiveNavbar !== activeNavbar) {
          activeNavbar = collapseActiveNavbar;
        }
      } else if (route.category) {
        const categoryActiveNavbar = getActiveNavbarText(route.items);
        if (categoryActiveNavbar !== activeNavbar) {
          activeNavbar = categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(route.layout + route.path) !== -1) {
          activeNavbar = route.messageNavbar;
        }
      }
    });
    return activeNavbar;
  };

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            element={<prop.component />}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      }
      return null;
    });
  };

  return (
    <Box>
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        {/* <Providers> */}
        <CssBaseline />
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={() => toggleSidebar(!isSidebarOpen)}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
          {getRoute() ? (
            <Box
              sx={{
                mx: 'auto',
                padding: { xs: '20px', md: '30px' },
                paddingRight: '20px',
                minHeight: '100vh',
                paddingTop: '50px',
              }}
            >
              {/* <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/admin/default" />} />
              </Routes> */}
              <Outlet />
            </Box>
          ) : null}
          <Box>
            <FooterAdmin />
          </Box>
        </Box>
        {/* </Providers> */}
      </Box>
    </Box>
  );
};

export default AdminLayout;

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
//             <Box sx={{ mx: 'auto', p: { xs: 2, md: 3 }, pt: 4 }}>
//               <Outlet />
//             </Box>
//             <Box>
//               <Footer />
//           </Box>
//         </SidebarContext.Provider>
//       </Box>
//     </Box>
//   );
// }
