import PropTypes from 'prop-types';
import RCButtonRoot from './RCButtonRoot';
import { Box } from '@mui/material';
import React from 'react';
// Wrapper component for when you need a container around the button
const ButtonContainer = ({ children, withContainer }) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      maxWidth: withContainer ? '50%' : '100%',
    }}
  >
    {children}
  </Box>
);
const RCButton = React.forwardRef(
  (
    {
      color = 'white',
      variant = 'contained',
      size = 'medium',
      circular = false,
      iconOnly = false,
      children,
      withContainer = false, // Default value for withContainer prop
      ...rest
    },
    ref
  ) => {
    // TODO: Add darkMode support using the hook below.
    // ! const [controller] = useMaterialUIController();
    // ! const { darkMode } = controller;
    const darkMode = false; // TODO: Add darkMode support using the hook below.
    const ButtonContent = (
      <RCButtonRoot
        {...rest}
        ref={ref}
        color="primary.main"
        variant={variant === 'gradient' ? 'contained' : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </RCButtonRoot>
    );

    if (withContainer) {
      return (
        <ButtonContainer withContainer={withContainer}>
          {ButtonContent}
        </ButtonContainer>
      );
    }
    return ButtonContent;
  }
);

RCButton.displayName = 'RCButton';

RCButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf([
    'text',
    'contained',
    'outlined',
    'gradient',
    'holo',
  ]),
  color: PropTypes.oneOf([
    'white',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  withContainer: PropTypes.bool, // Add withContainer to the prop types
  children: PropTypes.node.isRequired,
};

export default RCButton;
