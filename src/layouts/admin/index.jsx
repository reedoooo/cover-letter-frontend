// Chakra imports
import { Box, CssBaseline, Portal, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { Route, Outlet, useNavigation } from 'react-router-dom';
import routes from '@/routes/index';
import { SidebarContext } from 'contexts/SidebarProvider';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import FooterAdmin from 'layouts/navigation/footer/FooterAdmin';
import Navbar from 'layouts/navigation/navbar/NavbarAdmin';
import Sidebar from 'layouts/navigation/sidebar/Sidebar';
import { SidebarResponsive } from 'layouts/navigation/sidebar/SidebarResponsive';
import LoadingIndicator from 'utils/LoadingIndicator';

const AdminLayout = props => {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // navigation states
  const navigation = useNavigation();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = routes => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        console.log('ROUTES', routes[i].items);
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
  const getMenuItems = routes => {
    let menuItems = [];
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        menuItems.push(...getMenuItems(routes[i].items));
      } else if (routes[i].category) {
        menuItems.push(...getMenuItems(routes[i].items));
      } else {
        menuItems.push(routes[i]);
      }
    }
    return menuItems;
  };
  const { onOpen } = useDisclosure();
  if (navigation.state === 'loading') {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          {/* <CssBaseline /> */}
          <SidebarResponsive routes={routes} display="none" {...rest} />
          <Box
            id="main-panel"
            sx={{
              float: 'right',
              minHeight: '100vh',
              height: '100%',
              overflow: 'auto',
              position: 'relative',
              maxHeight: '100%',
              width: { xs: '100%', xl: 'calc(100% - 290px)' },
              maxWidth: { xs: '100%', xl: 'calc(100% - 290px)' },
              transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
              transitionDuration: '.2s, .2s, .35s',
              transitionProperty: 'top, bottom, width',
              transitionTimingFunction: 'linear, linear, ease',
            }}
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Human Websites'}
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                />
              </Box>
            </Portal>
            {getRoute() ? (
              <Box
                sx={{
                  mx: 'auto',
                  P: { xs: '20px', md: '30px' },
                  // pt: `3.5rem`,
                  minHeight: '100vh',
                  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
                }}
              >
                <Outlet
                  context={{
                    menuItemData: getMenuItems(routes),
                  }}
                />
              </Box>
            ) : null}
            <Box>
              <FooterAdmin />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
};

export default AdminLayout;
