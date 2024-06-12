// LAYOUTS: auth/index.js
import { Box, Card, CssBaseline, Portal } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import routes from '@/routes/index';
import { PageLayout } from 'components/index';
import Footer from 'components/themedV2/footer/FooterAuth';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import AuthNavbar from 'layouts/navigation/navbar/NavbarAuth';

// Custom Material UI theme
export const AuthLayout = props => {
  const { theme } = useMode();
  const { ...rest } = props;
  const authBg = theme.palette.background.default;
  const navigation = useNavigation();
  const [fixed] = useState(false);
  const getRoute = () => {
    return window.location.pathname !== '/auth/full-screen-maps';
  };
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
  if (navigation.state === 'loading') {
    return <h1>Loading...</h1>;
  }
  return (
    <PageLayout>
      <CssBaseline />
      <Portal>
        <Box>
          <AuthNavbar
            onOpen={onOpen}
            logoText={'Horizon UI Dashboard PRO'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            message={getActiveNavbarText(routes)}
            fixed={fixed}
          />
        </Box>
      </Portal>
      <Box
        sx={{
          backgroundColor: authBg,
          float: 'right',
          minHeight: '100vh',
          height: '100%',
          position: 'relative',
          width: '100%',
          transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
          transitionDuration: '.2s, .2s, .35s',
          transitionProperty: 'top, bottom, width',
          transitionTimingFunction: 'linear, linear, ease',
        }}
      >
        <Card
          component={Box}
          minHeight="100vh"
          mx="auto"
          pr={20}
          pt={50}
          p={{
            xs: 10,
            md: 20,
          }}
        >
          <Outlet />
        </Card>
        <Box>
          <Footer />
        </Box>
      </Box>
    </PageLayout>
  );
};
export default AuthLayout;
// const getRoute = () => {
//   return window.location.pathname !== '/auth/full-screen-maps';
// };
// const getRoutes = (routes) => {
//   return routes.map((prop, key) => {
//     if (prop.layout === '/auth') {
//       return (
//         <Route
//           path={prop.layout + prop.path}
//           component={prop.component}
//           key={key}
//         />
//       );
//     }
//     if (prop.collapse) {
//       return getRoutes(prop.items);
//     if (prop.category) {
//     } else {
//       return null;
//   });
// const authBg = theme.palette.mode === 'light' ? 'white' : 'navy.900';
// document.documentElement.dir = 'ltr';
// return (
// <Box>
{
  /* <SidebarContextProvider
        value={{
          toggleSidebar,
          setToggleSidebar,
      > */
}
/* <Box
        bg={authBg}
        sx={{
          // backgroundColor: authBg,
          float: 'right',
          minHeight: '100vh',
          height: '100%',
          position: 'relative',
          width: '100%',
          transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
          transitionDuration: '.2s, .2s, .35s',
          transitionProperty: 'top, bottom, width',
          transitionTimingFunction: 'linear, linear, ease',
  /* <Portal> */
/* <Box>
            <Navbar
              onOpen={onOpen}
              fixed={fixed}
              logoText={'Material AI: Cover Letter Generator'}
              brandText="Dashboard"
              message="Welcome to the dashboard"
              {...rest}
            />
          </Box>
        </Portal> */
/* <Card
          component={Box}
          minHeight="100vh"
          mx="auto"
          pr={20}
          pt={50}
          p={{
            xs: 10,
            md: 20,
          }}
        >
          <Outlet />
        </Card>
        <Box>
          <Footer />
        </Box>
      </Box> */
/* </SidebarContextProvider> */
/* </Box>
} */
