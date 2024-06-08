import { Upgrade } from '@mui/icons-material';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';
import { SidebarContext } from 'contexts/SidebarProvider';
import Logo from '../shared/logo';
import SidebarItems from './components/SidebarItems';

const Sidebar = () => {
  const { isSidebarOpen, isMobileSidebarOpen, onSidebarClose } =
    useContext(SidebarContext);
  const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'));
  const sidebarWidth = '270px';

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Box px={3}>
              <Logo />
            </Box>
            <Box>
              <SidebarItems />
              <Upgrade />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: theme => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
      <Upgrade />
    </Drawer>
  );
};

export default Sidebar;
