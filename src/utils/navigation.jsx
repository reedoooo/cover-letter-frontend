// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';
export const findCurrentRoute = (routes, pathname) => {
  for (let route of routes) {
    if (route.items) {
      const found = findCurrentRoute(route.items, pathname);
      if (found) return found;
    }
    if (pathname?.match(route.path) && route) {
      return route;
    }
  }
};
export const getActiveRoute = (routes, pathname) => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || 'Default Brand Text';
};
export const getActiveNavbar = (routes, pathname) => {
  const route = findCurrentRoute(routes, pathname);
  if (route?.secondary) return route?.secondary;
  else return false;
};
export const getActiveNavbarText = (routes, pathname) => {
  return getActiveRoute(routes, pathname) || false;
};
// const getActiveRoute = routes => {
//   let activeRoute = 'Default Brand Text';
//   routes.forEach(route => {
//     if (route.collapse) {
//       const collapseActiveRoute = getActiveRoute(route.items);
//       if (collapseActiveRoute !== activeRoute) {
//         activeRoute = collapseActiveRoute;
//       }
//     } else if (route.category) {
//       const categoryActiveRoute = getActiveRoute(route.items);
//       if (categoryActiveRoute !== activeRoute) {
//         activeRoute = categoryActiveRoute;
//       }
//     } else {
//       if (window.location.href.indexOf(route.layout + route.path) !== -1) {
//         activeRoute = route.name;
//       }
//     }
//   });
//   return activeRoute;
// };

// const getActiveNavbar = routes => {
//   let activeNavbar = false;
//   routes.forEach(route => {
//     if (route.collapse) {
//       const collapseActiveNavbar = getActiveNavbar(route.items);
//       if (collapseActiveNavbar !== activeNavbar) {
//         activeNavbar = collapseActiveNavbar;
//       }
//     } else if (route.category) {
//       const categoryActiveNavbar = getActiveNavbar(route.items);
//       if (categoryActiveNavbar !== activeNavbar) {
//         activeNavbar = categoryActiveNavbar;
//       }
//     } else {
//       if (window.location.href.indexOf(route.layout + route.path) !== -1) {
//         activeNavbar = route.secondary;
//       }
//     }
//   });
//   return activeNavbar;
// };

// const getActiveNavbarText = routes => {
//   let activeNavbar = false;
//   routes.forEach(route => {
//     if (route.collapse) {
//       const collapseActiveNavbar = getActiveNavbarText(route.items);
//       if (collapseActiveNavbar !== activeNavbar) {
//         activeNavbar = collapseActiveNavbar;
//       }
//     } else if (route.category) {
//       const categoryActiveNavbar = getActiveNavbarText(route.items);
//       if (categoryActiveNavbar !== activeNavbar) {
//         activeNavbar = categoryActiveNavbar;
//       }
//     } else {
//       if (window.location.href.indexOf(route.layout + route.path) !== -1) {
//         activeNavbar = route.messageNavbar;
//       }
//     }
//   });
//   return activeNavbar;
// };

// const getRoutes = routes => {
//   return routes.map((prop, key) => {
//     if (prop.layout === '/admin') {
//       return (
//         <Route
//           path={prop.layout + prop.path}
//           element={<prop.component />}
//           key={key}
//         />
//       );
//     }
//     if (prop.collapse) {
//       return getRoutes(prop.items);
//     }
//     if (prop.category) {
//       return getRoutes(prop.items);
//     }
//     return null;
//   });
// };
// const getLayout = () => {
//   return window.location.pathname.startsWith('/admin');
// };
// const getRoute = () => {
//   // The following works as follows:
//   // /'full-screen-maps' is the route that should not render the Navbar and Sidebar. This works by checking if the window.location.pathname is equal to '/admin/full-screen-maps'.
//   return window.location.pathname !== '/admin/full-screen-maps';
// };
// const getRoutes = () => {
//   return routes?.map((prop, key) => {
//     if (prop.layout) {
//       return (
//         <Route
//           path={prop.layout + prop.path}
//           element={<prop.element />}
//           key={key}
//         />
//       );
//     }
//     if (prop.collapse) {
//       return getRoutes(prop.items);
//     }
//     if (prop.category) {
//       return getRoutes(prop.items);
//     }
//     return null;
//   });
// };
