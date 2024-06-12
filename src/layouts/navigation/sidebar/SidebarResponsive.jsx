import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoMenuOutline } from 'react-icons/io5';
import { SidebarContext } from 'contexts/SidebarProvider';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import {
  renderThumb,
  renderTrack,
  renderView,
} from '../shared/scrollbar/Scrollbar';
import { Content } from './components/Content';

function SidebarResponsive(props) {
  const { routes } = props;
  const { theme } = useMode();
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: { xs: 'flex', xl: 'none' }, alignItems: 'center' }}>
      <Box
        ref={btnRef}
        sx={{ width: 'max-content', height: 'max-content' }}
        onClick={handleOpen}
      >
        <IconButton>
          <IoMenuOutline
            style={{
              color: theme.palette.text.secondary,
              width: '20px',
              height: '20px',
            }}
          />
        </IconButton>
      </Box>
      <Drawer
        anchor={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '285px',
            maxWidth: '285px',
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 0, top: 0, zIndex: 3 }}
        >
          <IoMenuOutline
            style={{
              color: theme.palette.text.secondary,
              width: '20px',
              height: '20px',
            }}
          />
        </IconButton>
        <Box sx={{ width: '285px', padding: '0', paddingBottom: '0' }}>
          <Scrollbars
            autoHide
            renderTrackVertical={renderTrack}
            renderThumbVertical={renderThumb}
            renderView={renderView}
          >
            <Content routes={routes} />
          </Scrollbars>
        </Box>
      </Drawer>
    </Box>
  );
}

SidebarResponsive.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { SidebarResponsive };

// const SidebarResponsive = ({ routes }) => {
//   const {
//     isSidebarOpen,
//     isMobileSidebarOpen,
//     setMobileSidebarOpen,
//     setSidebarOpen,
//     onClose,
//   } = useContext(SidebarContext);
//   const btnRef = React.useRef(null);
//   const { theme } = useMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down('xl'));
//   const sidebarBg =
//     theme.palette.mode === 'light'
//       ? theme.palette.background.paper
//       : theme.palette.background.default;
//   const menuColor =
//     theme.palette.mode === 'light'
//       ? theme.palette.grey[400]
//       : theme.palette.common.white;

//   return (
//     <Box display={{ xs: 'block', xl: 'none' }}>
//       <IconButton ref={btnRef} color="inherit" onClick={setSidebarOpen}>
//         <MenuIcon sx={{ color: menuColor }} />
//       </IconButton>
//       <Drawer
//         anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//         open={isSidebarOpen}
//         onClose={onClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: 285, bgcolor: sidebarBg } }}
//       >
//         <Box sx={{ position: 'relative', height: '100%' }}>
//           <IconButton
//             onClick={onClose}
//             sx={{ position: 'absolute', top: 16, right: 16 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box
//             sx={{
//               px: 0,
//               pb: 0,
//               maxWidth: 285,
//               overflow: 'hidden',
//               height: '100%',
//             }}
//           >
//             <Scrollbars
//               autoHide
//               renderTrackVertical={renderTrack}
//               renderThumbVertical={renderThumb}
//               renderView={renderView}
//             >
//               <Content routes={routes} />
//             </Scrollbars>
//           </Box>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// };

// SidebarResponsive.propTypes = {
//   routes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// export { SidebarResponsive };
