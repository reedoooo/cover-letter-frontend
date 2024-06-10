import { Box, Typography } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useMode from 'hooks/useMode';

const SidebarLinks = ({ routes }) => {
  const { theme } = useMode();
  const location = useLocation();

  const activeRoute = routeName => {
    return location.pathname.includes(routeName);
  };

  const createLinks = routes => {
    const routeLayouts = [...new Set(routes?.map(route => route.layout))];

    return routeLayouts.map((layout, layoutIndex) => {
      const layoutRoutes = routes.filter(
        route =>
          route.layout === layout &&
          route.name &&
          !route.name.toLowerCase().includes('error')
      );

      return (
        <Box key={layoutIndex}>
          {layoutRoutes.map((route, index) => (
            <React.Fragment key={index}>
              <NavLink
                to={route.layout + route.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 15px',
                  borderRadius: theme.shape.borderRadius,
                  textDecoration: 'none',
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  backgroundColor: isActive
                    ? theme.palette.action.selected
                    : 'transparent',
                })}
              >
                {route.icon && (
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '10px',
                    }}
                  >
                    {route.icon}
                  </Box>
                )}
                <Typography variant="body1">{route.name}</Typography>
              </NavLink>
              {route.children && route.children.length > 0 && (
                <Box pl={4}>
                  {route.children
                    .filter(
                      childRoute =>
                        childRoute.name &&
                        !childRoute.name.toLowerCase().includes('error')
                    )
                    .map((childRoute, childIndex) => (
                      <NavLink
                        to={route.layout + childRoute.path}
                        key={childIndex}
                        style={({ isActive }) => ({
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          borderRadius: theme.shape.borderRadius,
                          textDecoration: 'none',
                          color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                          backgroundColor: isActive
                            ? theme.palette.action.selected
                            : 'transparent',
                        })}
                      >
                        {childRoute.icon && (
                          <Box
                            component="span"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '10px',
                            }}
                          >
                            {childRoute.icon}
                          </Box>
                        )}
                        <Typography variant="body2">
                          {childRoute.name}
                        </Typography>
                      </NavLink>
                    ))}
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      );
    });
  };

  return <Box>{createLinks(routes)}</Box>;
};

export default SidebarLinks;

// import { Box, Typography } from '@mui/material';
// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import useMode from 'hooks/useMode';

// export function SidebarLinks(props) {
//   const location = useLocation();
//   const { theme } = useMode();
//   const { routes } = props;

//   const activeColor = theme.palette.text.primary;
//   const inactiveColor = theme.palette.text.secondary;
//   const activeIcon = theme.palette.primary.main;
//   const textColor = theme.palette.text.secondary;
//   const brandColor = theme.palette.primary.main;

// const activeRoute = routeName => {
//   return location.pathname.includes(routeName);
// };

//   const createLinks = routes => {
//     return routes.map((route, index) => {
//       if (route.category) {
//         return (
//           <React.Fragment key={index}>
//             <Typography
//               variant="body1"
//               color={activeColor}
//               fontWeight="bold"
//               mx="auto"
//               paddingLeft={{ sm: '10px', xl: '16px' }}
//               paddingTop="18px"
//               paddingBottom="12px"
//             >
//               {route.name}
//             </Typography>
//             {createLinks(route.items)}
//           </React.Fragment>
//         );
//       } else if (
//         ['/admin', '/auth', '/blank', '/land'].includes(route.layout)
//       ) {
//         return (
//           <NavLink key={index} to={route.path}>
//             <Box
//               display="flex"
//               alignItems="center"
//               paddingY="5px"
//               paddingLeft="10px"
//             >
//               <Box
//                 color={
//                   activeRoute(route.path.toLowerCase()) ? activeIcon : textColor
//                 }
//                 marginRight="18px"
//               >
//                 {route.icon}
//               </Box>
//               <Typography
//                 marginRight="auto"
//                 color={
//                   activeRoute(route.path.toLowerCase())
//                     ? activeColor
//                     : inactiveColor
//                 }
//                 fontWeight={
//                   activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
//                 }
//               >
//                 {route.name}
//               </Typography>
//               <Box
//                 height="36px"
//                 width="4px"
//                 backgroundColor={
//                   activeRoute(route.path.toLowerCase())
//                     ? brandColor
//                     : 'transparent'
//                 }
//                 borderRadius="5px"
//               />
//             </Box>
//           </NavLink>
//         );
//       } else {
//         return null;
//       }
//     });
//   };

//   return <>{createLinks(routes)}</>;
// }

// export default SidebarLinks;
