// Chakra imports
import { Box, CssBaseline, Portal, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { Route, Outlet, useNavigation } from 'react-router-dom';
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
  const navigation = useNavigation();

  const {
    isSidebarOpen,
    isMobileSidebarOpen,
    setSidebarOpen,
    toggleSidebarOpen,
    toggleMobileSidebar,
    onClose,
  } = useContext(SidebarContext);
  const isUserLoggedIn = true; // Replace with actual login state
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = routes => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = routes => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = routes => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };
  console.log('FILTERED ROUTES', routes);
  const { onOpen } = useDisclosure();
  if (navigation.state === 'loading') {
    return <h1>Loading...</h1>;
  }
  return (
    <Box>
      <Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
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
            onOpen={toggleSidebarOpen}
            onClose={onClose}
            isMobileOpen={isMobileSidebarOpen}
            onMobileOpen={toggleMobileSidebar}
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
              backgroundColor: theme.palette.background.default,
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
      </Box>
    </Box>
  );
};

export default AdminLayout;
