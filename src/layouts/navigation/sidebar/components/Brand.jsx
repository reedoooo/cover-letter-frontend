import { Box, Divider, useTheme } from '@mui/material';
import React from 'react';
import { HorizonLogo } from 'components/themedV2/icons/Icons';
import useMode from 'hooks/useMode';

export function SidebarBrand() {
  const { theme } = useMode();
  const logoColor = theme.palette.text.primary;
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <HorizonLogo
        // height="26px"
        // width="175px"
        // marginY="32px"
        // color={logoColor}
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
