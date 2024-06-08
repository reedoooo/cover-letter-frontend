import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoMenuOutline } from 'react-icons/io5';
import useDisclosure from 'hooks/useDisclosure';
import Content from './components/Content';

function Sidebar({ routes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display={{ sm: 'none', xl: 'block' }}
      width="100%"
      position="fixed"
      minHeight="100%"
    >
      <Box
        bgcolor="background.paper"
        transition="0.2s linear"
        width="300px"
        height="100vh"
        minHeight="100%"
        overflowX="hidden"
        boxShadow={1}
      >
        <Scrollbars autoHide>
          <Content routes={routes} />
        </Scrollbars>
      </Box>
      <IconButton
        onClick={onOpen}
        sx={{ display: { xl: 'none' }, position: 'fixed', top: 16, left: 16 }}
      >
        <IoMenuOutline />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Scrollbars autoHide>
            <Content routes={routes} />
          </Scrollbars>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidebar;

// ! ----------------------- NEW VERSION -----------------------
// import { Box, useMediaQuery } from '@mui/material';
// import PropTypes from 'prop-types';
// import { Scrollbars } from 'react-custom-scrollbars-2';
// import useMode from 'hooks/useMode';
// import {
//   renderThumb,
//   renderTrack,
//   renderView,
// } from '../shared/scrollbar/Scrollbar';
// import Content from './components/Content';

// // Sidebar component
// const Sidebar = ({ routes }) => {
//   const { theme } = useMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down('xl'));
//   const sidebarBg =
//     theme.palette.mode === 'light'
//       ? theme.palette.background.paper
//       : theme.palette.background.default;
//   const shadow =
//     theme.palette.mode === 'light'
//       ? '14px 17px 40px 4px rgba(112, 144, 176, 0.08)'
//       : 'unset';

//   return (
//     <Box
//       display={{ xs: 'none', xl: 'block' }}
//       width="300px"
//       position="fixed"
//       height="100vh"
//       boxShadow={shadow}
//     >
//       <Box bgcolor={sidebarBg} height="100%" overflow="hidden">
//         <Scrollbars
//           autoHide
//           renderTrackVertical={renderTrack}
//           renderThumbVertical={renderThumb}
//           renderView={renderView}
//         >
//           <Content routes={routes} />
//         </Scrollbars>
//       </Box>
//     </Box>
//   );
// };

// // PropTypes
// Sidebar.propTypes = {
//   routes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// export { Sidebar };
// ! ----------------------- OLD VERSION -----------------------
// import { Upgrade } from '@mui/icons-material';
// import { Box, Drawer, useMediaQuery } from '@mui/material';
// import React, { useContext } from 'react';
// import { SidebarContext } from 'contexts/SidebarProvider';
// import Logo from '../shared/logo';
// import SidebarItems from './components/SidebarItems';

// const Sidebar = () => {
//   const { isSidebarOpen, isMobileSidebarOpen, onSidebarClose } =
//     useContext(SidebarContext);
//   const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'));
//   const sidebarWidth = '270px';

//   if (lgUp) {
//     return (
//       <Box
//         sx={{
//           width: sidebarWidth,
//           flexShrink: 0,
//         }}
//       >
//         <Drawer
//           anchor="left"
//           open={isSidebarOpen}
//           variant="permanent"
//           PaperProps={{
//             sx: {
//               width: sidebarWidth,
//               boxSizing: 'border-box',
//             },
//           }}
//         >
//           <Box
//             sx={{
//               height: '100%',
//             }}
//           >
//             {/* <Box px={3}>
//               <Logo />
//             </Box> */}
//             {/* <Box>
//               <SidebarItems />
//               <Upgrade />
//             </Box> */}
//           </Box>
//         </Drawer>
//       </Box>
//     );
//   }

//   return (
//     <Drawer
//       anchor="left"
//       open={isMobileSidebarOpen}
//       onClose={onSidebarClose}
//       variant="temporary"
//       PaperProps={{
//         sx: {
//           boxShadow: theme => theme.shadows[8],
//         },
//       }}
//     >
//       {/* <Box px={2}>
//         <Logo />
//       </Box> */}
//       {/* <SidebarItems />
//       <Upgrade /> */}
//     </Drawer>
//   );
// };

// export default Sidebar;
