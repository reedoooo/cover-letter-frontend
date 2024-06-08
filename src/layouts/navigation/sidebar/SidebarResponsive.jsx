import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import {
  renderThumb,
  renderTrack,
  renderView,
} from '../shared/scrollbar/Scrollbar';
import Content from './components/Content';

// SidebarResponsive component
const SidebarResponsive = ({ routes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'));
  const sidebarBg =
    theme.palette.mode === 'light'
      ? theme.palette.background.paper
      : theme.palette.background.default;
  const menuColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[400]
      : theme.palette.common.white;

  return (
    <Box display={{ xs: 'block', xl: 'none' }}>
      <IconButton ref={btnRef} color="inherit" onClick={onOpen}>
        <MenuIcon sx={{ color: menuColor }} />
      </IconButton>
      <Drawer
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerOverlay />
        <DrawerContent sx={{ width: 285, maxWidth: 285, bgcolor: sidebarBg }}>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ px: 0, pb: 0, maxWidth: 285, overflow: 'hidden' }}>
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} />
            </Scrollbars>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

SidebarResponsive.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { SidebarResponsive };
