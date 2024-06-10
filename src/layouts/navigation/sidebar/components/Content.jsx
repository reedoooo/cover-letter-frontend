import { Box, Stack, useTheme } from '@mui/material';
// Custom components
import React from 'react';
import useMode from 'hooks/useMode';
import Brand from './Brand';
import Links from './Links';
// import SidebarCard from './SidebarCard';

function SidebarContent(props) {
  const { routes } = props;
  const { theme } = useMode();
  const borderRadius = theme.shape.borderRadius;
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius={borderRadius}
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box pl="20px" pr={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>
      {/* <Box mt="60px" mb="40px" borderRadius={borderRadius}>
        <SidebarCard routes={routes} />
      </Box> */}
    </Box>
  );
}
export default SidebarContent;
