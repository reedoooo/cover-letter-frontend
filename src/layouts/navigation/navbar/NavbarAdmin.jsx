import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation, useMatches, Link as RouterLink } from 'react-router-dom';
import { RCFlex } from 'components/themed/RCFlex';
import useMode from 'hooks/useMode';
import { isWindowAvailable } from 'utils/navigation';
import AdminNavbarLinks from './NavbarLinksAdmin';
function BreadcrumbsComponent() {
  const matches = useMatches();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {matches?.map((match, index) => {
        const route = match?.route;
        const isLast = index === matches.length - 1;

        return isLast ? (
          <Typography key={uniqueId(`${route?.path}`)} color="text.primary">
            {route?.breadcrumb}
          </Typography>
        ) : (
          <Link
            key={uniqueId(`${route?.path}`)}
            component={RouterLink}
            to={match.pathname}
            color="inherit"
          >
            {route?.breadcrumb}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const anchorEl = React.useRef(null);
  const { theme } = useMode();
  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);

    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  });

  const { secondary, message, brandText } = props;

  const location = useLocation();
  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  const mainText = '#1B254B';
  let secondaryText = theme.palette.text.primary;
  let navbarPosition = 'fixed';
  let navbarFilter = 'none';
  let navbarBackdrop = 'blur(20px)';
  let navbarShadow = 'none';
  let navbarBg = 'rgba(244, 247, 254, 0.2)';
  let navbarBorder = 'transparent';
  let secondaryMargin = '0px';
  let paddingX = '15px';
  let gap = '0px';
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 1) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  // useEffect(() => {
  //   isWindowAvailable() && window.addEventListener('scroll', changeNavbar);
  //   return () => {
  //     isWindowAvailable() && window.removeEventListener('scroll', changeNavbar);
  //   };
  // });
  // const changeNavbar = () => {
  //   if (isWindowAvailable() && window.scrollY > 1) {
  //     setScrolled(true);
  //   } else {
  //     setScrolled(false);
  //   }
  // };
  return (
    <Box
      sx={{
        position: navbarPosition,
        boxShadow: navbarShadow,
        bgcolor: navbarBg,
        borderColor: navbarBorder,
        filter: navbarFilter,
        backdropFilter: navbarBackdrop,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '16px',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        transitionDelay: '0s, 0s, 0s, 0s',
        transitionDuration: '0.25s, 0.25s, 0.25s, 0s',
        transitionProperty: 'box-shadow, background-color, filter, border',
        transitionTimingFunction: 'linear, linear, linear, linear',
        alignItems: { xl: 'center' },
        display: secondary ? 'block' : 'flex',
        minHeight: '75px',
        justifyContent: { xl: 'center' },
        lineHeight: '25.6px',
        mx: 'auto',
        mt: secondaryMargin,
        pb: '8px',
        right: { base: '12px', md: '30px', lg: '30px', xl: '30px' },
        px: {
          sm: paddingX,
          md: '10px',
        },
        ps: {
          xl: '12px',
        },
        pt: '8px',
        top: { base: '12px', md: '16px', lg: '20px', xl: '20px' },
        width: {
          base: 'calc(100vw - 6%)',
          md: 'calc(100vw - 8%)',
          lg: 'calc(100vw - 6%)',
          xl: 'calc(100vw - 350px)',
          '2xl': 'calc(100vw - 365px)',
        },
      }}
    >
      <RCFlex
        sx={{
          width: '100%',
          flexDirection: { sm: 'column', md: 'row' },
          alignItems: { xl: 'center' },
          marginBottom: gap,
        }}
      >
        <Box sx={{ marginBottom: { sm: '8px', md: '0px' } }}>
          <BreadcrumbsComponent />
          {/* Here we create navbar brand, based on route name */}
          <Link
            href="/"
            color={mainText}
            sx={{
              bg: 'inherit',
              borderRadius: 'inherit',
              fontWeight: 'bold',
              fontSize: '34px',
              '&:hover': { color: mainText },
              '&:active': {
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              },
              '&:focus': {
                boxShadow: 'none',
              },
            }}
          >
            {brandText}
          </Link>
          <Box sx={{ marginLeft: 'auto', width: { sm: '100%', md: 'unset' } }}>
            <AdminNavbarLinks
              onOpen={props.onOpen}
              logoText={props.logoText}
              secondary={props.secondary}
              fixed={props.fixed}
              scrolled={scrolled}
            />
          </Box>
        </Box>
      </RCFlex>
      {secondary ? <Typography color="white">{message}</Typography> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};

// import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
// import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';
// import useMode from 'hooks/useMode';
// import AdminNavbarLinks from 'layouts/navigation/navbar/NavbarLinksAdmin';

// export default function AdminNavbar(props) {
//   const [scrolled, setScrolled] = useState(false);

//   const changeNavbar = () => {
//     if (window.scrollY > 1) {
//       setScrolled(true);
//     } else {
//       setScrolled(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', changeNavbar);
//     console.log(`PROPS CHECK IN ADMIN NAVBAR: ${props} `, props);
//     return () => {
//       window.removeEventListener('scroll', changeNavbar);
//     };
//   }, [props]);

//   const { secondary, message, brandText } = props;
//   const theme = useMode();

//   let mainText =
//     theme.palette.mode === 'light'
//       ? theme.palette.primary.dark
//       : theme.palette.common.white;
//   let secondaryText =
//     theme.palette.mode === 'light'
//       ? theme.palette.grey[700]
//       : theme.palette.grey[500];
//   let navbarPosition = 'fixed';
//   let navbarFilter = 'none';
//   let navbarBackdrop = 'blur(20px)';
//   let navbarShadow = 'none';
//   let navbarBg =
//     theme.palette.mode === 'light'
//       ? 'rgba(244, 247, 254, 0.2)'
//       : 'rgba(11,20,55,0.5)';
//   let navbarBorder = 'transparent';
//   let secondaryMargin = '0px';
//   let paddingX = '15px';
//   let gap = '0px';

//   return (
//     <Box
//       sx={{
//         position: navbarPosition,
//         boxShadow: navbarShadow,
//         backgroundColor: navbarBg,
//         borderColor: navbarBorder,
//         filter: navbarFilter,
//         backdropFilter: navbarBackdrop,
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         borderRadius: '16px',
//         borderWidth: '1.5px',
//         borderStyle: 'solid',
//         transition:
//           'box-shadow 0.25s linear, background-color 0.25s linear, filter 0.25s linear, border 0.25s linear',
//         alignItems: { xl: 'center' },
//         display: secondary ? 'block' : 'flex',
//         minHeight: '75px',
//         justifyContent: { xl: 'center' },
//         lineHeight: '25.6px',
//         mx: 'auto',
//         mt: secondaryMargin,
//         pb: '8px',
//         right: { sm: '12px', md: '30px', lg: '30px', xl: '30px' },
//         px: { sm: paddingX, md: '10px' },
//         ps: { xl: '12px' },
//         pt: '8px',
//         top: { sm: '12px', md: '16px', lg: '20px', xl: '20px' },
//         width: {
//           sm: 'calc(100vw - 6%)',
//           md: 'calc(100vw - 8%)',
//           lg: 'calc(100vw - 6%)',
//           xl: 'calc(100vw - 350px)',
//           '2xl': 'calc(100vw - 365px)',
//         },
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           mb: gap,
//         }}
//       >
//         {/* ====== [BREADCRUMBS/SITE BRAND HEADER] ====== */}
//         <Box mb={{ sm: '8px', md: '0px' }}>
//           <Breadcrumbs>
//             <Link
//               href={`${process.env.PUBLIC_URL}/#/`}
//               color={secondaryText}
//               fontSize="small"
//               mb="5px"
//             >
//               Pages
//             </Link>
//             {brandText}
//           </Breadcrumbs>
//           <Link
//             color={mainText}
//             href={`${process.env.PUBLIC_URL}/#/`}
//             sx={{
//               backgroundColor: 'inherit',
//               borderRadius: 'inherit',
//               fontWeight: 'bold',
//               fontSize: '34px',
//               '&:hover': { color: mainText },
//               '&:active': {
//                 backgroundColor: 'inherit',
//                 transform: 'none',
//                 borderColor: 'transparent',
//               },
//               '&:focus': { boxShadow: 'none' },
//             }}
//           >
//             {brandText}
//           </Link>
//         </Box>
//         {/* ====== [ADMIN/USER DETAILS NAV BAR] ====== */}
//         <Box ms="auto" width={{ sm: '100%', md: 'unset' }} open={true}>
//           <AdminNavbarLinks
//             onOpen={props.onOpen}
//             logoText={props.logoText}
//             secondary={props.secondary}
//             fixed={props.fixed}
//             scrolled={scrolled}
//             open={props.open}
//           />
//         </Box>
//         {secondary ? (
//           <Typography color="common.white">{message}</Typography>
//         ) : null}
//       </Box>
//     </Box>
//   );
// }

// AdminNavbar.propTypes = {
//   brandText: PropTypes.string,
//   variant: PropTypes.string,
//   secondary: PropTypes.bool,
//   fixed: PropTypes.bool,
//   onOpen: PropTypes.func,
// };
