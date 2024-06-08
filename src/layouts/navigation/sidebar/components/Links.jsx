import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function SidebarLinks(props) {
  const location = useLocation();
  const theme = useTheme();
  const activeColor = theme.palette.text.primary;
  const inactiveColor = theme.palette.text.secondary;
  const activeIcon = theme.palette.primary.main;
  const textColor = theme.palette.text.secondary;
  const brandColor = theme.palette.primary.main;
  const { routes } = props;

  const activeRoute = routeName => {
    return location.pathname.includes(routeName);
  };

  const createLinks = routes => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <React.Fragment key={index}>
            <Typography
              variant="body1"
              color="textPrimary"
              fontWeight="bold"
              mx="auto"
              paddingLeft={{ sm: '10px', xl: '16px' }}
              paddingTop="18px"
              paddingBottom="12px"
            >
              {route.name}
            </Typography>
            {createLinks(route.items)}
          </React.Fragment>
        );
      } else if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            <Box>
              <Box
                display="flex"
                alignItems="center"
                paddingY="5px"
                paddingLeft="10px"
              >
                <Box
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeIcon
                      : textColor
                  }
                  marginRight="18px"
                >
                  {route.icon}
                </Box>
                <Typography
                  marginRight="auto"
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight={
                    activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                  }
                >
                  {route.name}
                </Typography>
                <Box
                  height="36px"
                  width="4px"
                  backgroundColor={
                    activeRoute(route.path.toLowerCase())
                      ? brandColor
                      : 'transparent'
                  }
                  borderRadius="5px"
                />
              </Box>
            </Box>
          </NavLink>
        );
      } else {
        return null;
      }
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;
