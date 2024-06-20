import { Box, SvgIcon, useTheme } from '@mui/material';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { LogoIcon } from 'components/index';
import { RCFlex } from 'components/themed/RCFlex';
import useMode from 'hooks/useMode';
import LoadingIndicator from 'utils/LoadingIndicator';
// import Loadable from 'layouts/navigation/shared/loadable';

const StyledLogoIcon = styled(SvgIcon)(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: '50%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
}));

// const LazyLogoIcon = Loadable(() => import('components/index').LogoIcon);

const NavbarLogo = () => (
  <Suspense fallback={<LoadingIndicator />}>
    <StyledLogoIcon>
      <LogoIcon />
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
