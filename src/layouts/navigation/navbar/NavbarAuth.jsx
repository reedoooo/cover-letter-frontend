/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';

// Custom components
import PropTypes from 'prop-types';
import React from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import routes from '@/routes';
import IconBox from 'components/themedV2/icons/IconBox';
import { SidebarContext } from 'contexts/SidebarProvider';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import { SidebarResponsive } from 'layouts/navigation/sidebar/Sidebar';

export default function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const theme = useMode();
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();
  const {
    isOpen: isOpenDashboards,
    onOpen: onOpenDashboards,
    onClose: onCloseDashboards,
  } = useDisclosure();
  const {
    isOpen: isOpenMain,
    onOpen: onOpenMain,
    onClose: onCloseMain,
  } = useDisclosure();
  const {
    isOpen: isOpenLanding,
    onOpen: onOpenLanding,
    onClose: onCloseLanding,
  } = useDisclosure();

  function getLinks(routeName) {
    let foundRoute = routes.filter(function (route) {
      return route.items && route.name === routeName;
    });
    return foundRoute[0]?.items || [];
  }

  function getLinksCollapse(routeName) {
    let foundLinks = getLinks(routeName).filter(function (link) {
      return link.collapse === true;
    });
    return foundLinks;
  }

  let authObject = getLinksCollapse('Authentication');
  let mainObject = getLinksCollapse('Main Pages');
  let dashboardsObject = getLinks('Dashboards');
  let landingObject = getLinks('Landing');

  let logoColor = theme.palette.common.white;
  let extraArr = [];
  routes.forEach(route => {
    route.items?.forEach(item => {
      if (item.items && item.name === 'Pages') {
        extraArr = item.items.filter(link => !link.collapse);
      }
    });
  });

  const textColor =
    theme.palette.mode === 'light'
      ? theme.palette.primary.dark
      : theme.palette.common.white;
  let menuBg = theme.palette.common.white;
  let mainText = theme.palette.common.white;
  let navbarBg = 'none';
  let navbarShadow = 'initial';
  let bgButton = theme.palette.common.white;
  let colorButton = theme.palette.primary.main;
  let navbarPosition = 'absolute';

  let brand = (
    <a
      href={`${process.env.PUBLIC_URL}/#/`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        lineHeight: '100%',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color: mainText,
      }}
    >
      <Typography variant="subtitle2" mt={1}>
        {logoText}
      </Typography>
    </a>
  );

  if (props.secondary === true) {
    brand = (
      <a
        href={`${process.env.PUBLIC_URL}/#/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          minWidth: '175px',
          display: 'flex',
          lineHeight: '100%',
          fontWeight: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
          color: mainText,
        }}
      >
        <Stack direction="row" spacing="12px" align="center" justify="center">
          <Box
            w="1px"
            h="20px"
            bg={theme.palette.mode === 'dark' ? 'white' : 'gray.700'}
          />
        </Stack>
        <Typography fontSize="sm" mt="3px">
          {logoText}
        </Typography>
      </a>
    );
  }

  const createPagesLinks = routes => {
    return routes.map((link, index) => {
      if (
        link.name === 'Applications' ||
        link.name === 'Ecommerce' ||
        link.name === 'Authentication' ||
        link.name === 'RTL' ||
        link.name === 'Widgets' ||
        link.name === 'Charts' ||
        link.name === 'Alerts'
      ) {
        return null;
      }
      if (link.name === 'Pricing Page') {
        return (
          <Stack key={link.name} direction="column">
            <Stack
              direction="row"
              spacing="6px"
              align="center"
              mb="6px"
              cursor="default"
            >
              <IconBox bg="blue.500" color="white" h="30px" w="30px">
                {/* <RocketIcon color='inherit' /> */}
              </IconBox>
              <Typography fontWeight="bold" fontSize="sm" color={textColor}>
                Extra
              </Typography>
            </Stack>
            {createExtraLinks(extraArr)}
          </Stack>
        );
      }
      if (link.authIcon) {
        return (
          <React.Fragment key={index}>
            {link.authIcon}
            {link.name}
            {createPagesLinks(link.items)}
          </React.Fragment>
        );
      } else {
        if (link.component) {
          return (
            <NavLink key={link.name} to={link.layout + link.path}>
              <MenuItem
                ps="36px"
                py="0px"
                sx={{
                  '&:hover': {
                    boxShadow: 'none',
                    background: 'none',
                  },
                }}
                style={{ borderRadius: '12px' }}
              >
                <Typography color="gray.400" fontSize="sm" fontWeight="normal">
                  {link.name}
                </Typography>
              </MenuItem>
            </NavLink>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {createPagesLinks(link.items)}
            </React.Fragment>
          );
        }
      }
    });
  };

  const createLandingLinks = routes => {
    return routes.map((link, key) => (
      <NavLink
        key={key}
        to={link.layout + link.path}
        style={{ maxWidth: 'max-content', marginLeft: '40px' }}
      >
        <Typography color="text.secondary" fontSize="small" fontWeight="normal">
          {link.name}
        </Typography>
      </NavLink>
    ));
  };

  const createExtraLinks = routes => {
    return routes.map(link => (
      <NavLink key={link.name} to={link.layout + link.path}>
        <MenuItem
          ps="36px"
          py="0px"
          sx={{
            '&:hover': { boxShadow: 'none', background: 'none' },
          }}
          style={{ borderRadius: '12px' }}
        >
          <Typography color="gray.400" fontSize="sm" fontWeight="normal">
            {link.name}
          </Typography>
        </MenuItem>
      </NavLink>
    ));
  };

  const createDashboardsLinks = routes => {
    return routes.map((link, key) => (
      <NavLink key={key} to={link.layout + link.path}>
        <MenuItem
          ps="36px"
          py="0px"
          sx={{
            '&:hover': { boxShadow: 'none', background: 'none' },
          }}
          style={{ borderRadius: '12px' }}
        >
          <Typography color="gray.400" fontSize="sm" fontWeight="normal">
            {link.name}
          </Typography>
        </MenuItem>
      </NavLink>
    ));
  };

  const createMainLinks = routes => {
    return routes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction="column" maxWidth="max-content">
            <Stack direction="row" spacing="0px" align="center">
              <IconBox bg="primary.main" h="30px" w="30px" mr={1}>
                {link.icon}
              </IconBox>
              <Typography
                fontWeight="bold"
                fontSize="medium"
                mr="auto"
                color={textColor}
              >
                {link.name}
              </Typography>
              <Icon
                as={GoChevronRight}
                color={mainText}
                width="14px"
                height="14px"
                fontWeight="2000"
              />
            </Stack>
            <Stack direction="column" bg={menuBg}>
              {createMainLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <NavLink
            key={key}
            to={link.layout + link.path}
            style={{ maxWidth: 'max-content', marginLeft: '40px' }}
          >
            <Typography
              color="text.secondary"
              fontSize="small"
              fontWeight="normal"
            >
              {link.name}
            </Typography>
          </NavLink>
        );
      }
    });
  };

  const createAuthLinks = routes => {
    return routes.map((link, key) => {
      return (
        <Stack key={key} direction="column" my="auto" maxWidth="max-content">
          <Stack direction="row" spacing="0px" align="center">
            <IconBox bg="primary.main" h="30px" w="30px" mr={1}>
              {link.icon}
            </IconBox>
            <Typography
              fontWeight="bold"
              fontSize="medium"
              mr="auto"
              color={textColor}
            >
              {link.name}
            </Typography>
            <Icon
              as={GoChevronRight}
              color={mainText}
              width="14px"
              height="14px"
              fontWeight="2000"
            />
          </Stack>
          <Stack direction="column" bg={menuBg}>
            {createAuthLinks(link.items)}
          </Stack>
        </Stack>
      );
    });
  };

  const linksAuth = (
    <Grid container spacing={1} display={{ sm: 'none', lg: 'flex' }}>
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenDashboards}
        onMouseLeave={onCloseDashboards}
        cursor="pointer"
        position="relative"
      >
        <Typography fontSize="small" color={mainText}>
          Dashboards
        </Typography>
        <Box>
          <Icon
            mt={1}
            as={GoChevronDown}
            color={mainText}
            width="14px"
            height="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu open={isOpenDashboards}>
          <MenuList
            sx={{
              backgroundColor: menuBg,
              p: 2.75,
              cursor: 'default',
              borderRadius: '15px',
              position: 'absolute',
              top: '30px',
              left: '-10px',
            }}
          >
            <Grid container spacing={2} wrap="wrap" width="300px">
              {createDashboardsLinks(dashboardsObject)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenAuth}
        onMouseLeave={onCloseAuth}
        cursor="pointer"
        position="relative"
      >
        <Typography fontSize="small" color={mainText}>
          Authentications
        </Typography>
        <Box>
          <Icon
            mt={1}
            as={GoChevronDown}
            color={mainText}
            width="14px"
            height="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu open={isOpenAuth}>
          <MenuList
            sx={{
              backgroundColor: menuBg,
              p: 2.75,
              cursor: 'default',
              borderRadius: '15px',
              position: 'absolute',
              top: '30px',
              left: '-10px',
            }}
          >
            <Grid container spacing={2} wrap="wrap" width="300px">
              {createAuthLinks(authObject)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenMain}
        onMouseLeave={onCloseMain}
        cursor="pointer"
        position="relative"
      >
        <Typography fontSize="small" color={mainText}>
          Main Pages
        </Typography>
        <Box>
          <Icon
            mt={1}
            as={GoChevronDown}
            color={mainText}
            width="14px"
            height="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu open={isOpenMain}>
          <MenuList
            sx={{
              backgroundColor: menuBg,
              p: 2.75,
              cursor: 'default',
              borderRadius: '15px',
              position: 'absolute',
              top: '30px',
              left: '-10px',
            }}
          >
            <Grid container spacing={2} wrap="wrap" width="500px">
              {createMainLinks(mainObject)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenLanding}
        onMouseLeave={onCloseLanding}
        cursor="pointer"
        position="relative"
      >
        <Typography fontSize="small" color={mainText}>
          Landings
        </Typography>
        <Box>
          <Icon
            mt={1}
            as={GoChevronDown}
            color={mainText}
            width="14px"
            height="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu open={isOpenLanding}>
          <MenuList
            sx={{
              backgroundColor: menuBg,
              p: 2.75,
              cursor: 'default',
              borderRadius: '15px',
              position: 'absolute',
              top: '30px',
              left: '-10px',
              minWidth: '350px',
            }}
          >
            <Grid container spacing={2} columns={2}>
              {createLandingLinks(landingObject)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
    </Grid>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Box
        sx={{
          position: navbarPosition,
          top: 2,
          left: '50%',
          transform: 'translate(-50%, 0px)',
          background: navbarBg,
          boxShadow: navbarShadow,
          borderRadius: '15px',
          p: 2.75,
          mx: 'auto',
          width: '1044px',
          maxWidth: '90%',
          zIndex: 3,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            justifyContent: { sm: 'start', lg: 'space-between' },
          }}
        >
          {brand}
          <Box
            ms={{ base: 'auto', lg: '0px' }}
            display={{ base: 'flex', lg: 'none' }}
            justifyContent="center"
            alignItems="center"
          >
            <SidebarResponsive
              logo={
                <Stack
                  direction="row"
                  spacing="12px"
                  align="center"
                  justify="center"
                >
                  <Box
                    w="1px"
                    h="20px"
                    bg={theme.palette.mode === 'dark' ? 'white' : 'gray.700'}
                  />
                </Stack>
              }
              logoText={props.logoText}
              secondary={props.secondary}
              routes={routes}
              {...rest}
            />
          </Box>
          {linksAuth}
          <a href="https://www.horizon-ui.com/pro">
            <Button
              sx={{
                backgroundColor: bgButton,
                color: colorButton,
                fontSize: 'xs',
                variant: 'contained',
                borderRadius: '50px',
                px: 6,
                display: { sm: 'none', lg: 'flex' },
              }}
            >
              Buy Now
            </Button>
          </a>
        </Container>
      </Box>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  logoText: PropTypes.string,
  secondary: PropTypes.bool,
  sidebarWidth: PropTypes.number,
};
