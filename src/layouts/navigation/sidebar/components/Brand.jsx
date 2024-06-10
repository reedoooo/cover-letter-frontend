import { Box, Divider, useTheme } from '@mui/material';
import React from 'react';
import useMode from 'hooks/useMode';
import Logo from 'layouts/navigation/shared/logo';

export function SidebarBrand() {
  const { theme } = useMode();
  const logoColor = theme.palette.text.primary;
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Logo
        sx={{
          color: logoColor,
          my: 32,
          w: 175,
          h: 26,
        }}
      />
      <Divider style={{ marginBottom: '20px' }} />
    </Box>
  );
}
export default SidebarBrand;
