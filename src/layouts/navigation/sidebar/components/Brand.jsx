import { Box, SvgIcon, useTheme } from '@mui/material';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { RCFlex } from 'components/themed/RCFlex';
import useMode from 'hooks/useMode';
import Loadable from 'layouts/navigation/shared/loadable';

const StyledLogoIcon = styled(SvgIcon)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
}));

const LazyLogoIcon = Loadable(() => import('components/index').LogoIcon);

const NavbarLogo = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <StyledLogoIcon>
      <LazyLogoIcon />
    </StyledLogoIcon>
  </Suspense>
);

const HSeparator = props => {
  const { variant, children, ...rest } = props;
  return (
    <Box
      sx={{
        height: '1px',
        width: '100%',
        backgroundColor: 'rgba(135, 140, 189, 0.3)',
      }}
      {...rest}
    ></Box>
  );
};

export function SidebarBrand() {
  const { theme } = useMode();
  const logoColor = theme.palette.mode === 'light' ? 'navy.700' : 'white';

  return (
    <RCFlex align="center" direction="column">
      <NavbarLogo />
      <HSeparator mb="20px" />
    </RCFlex>
  );
}

const Brand = props => {
  return <SidebarBrand />;
};

export default Brand;
