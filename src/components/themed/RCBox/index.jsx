import PropTypes from 'prop-types';
import React from 'react';

import RCBoxRoot from './RCBoxRoot';

/**
 * A customizable box component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant='contained'] - The box variant.
 * @param {string} [props.bgColor='transparent'] - The background color of the box.
 * @param {string} [props.color='dark'] - The text color of the box.
 * @param {number} [props.opacity=1] - The opacity of the box.
 * @param {string} [props.borderRadius='none'] - The border radius of the box.
 * @param {string} [props.shadow='none'] - The box shadow.
 * @param {string} [props.coloredShadow='none'] - The colored shadow of the box.
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCBox component.
 */
const RCBox = React.forwardRef(
  (
    {
      variant = 'contained',
      bgColor = 'transparent',
      color = 'dark',
      opacity = 1,
      hasBorderRadius = false,
      borderRadius = 'none',
      shadow = 'none',
      coloredShadow = 'none',
      ...rest
    },
    ref
  ) => (
    <RCBoxRoot
      {...rest}
      ref={ref}
      ownerstate={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow,
      }}
    />
  )
);

RCBox.displayName = 'RCBox';

// Typechecking props for the RCBox
RCBox.propTypes = {
  variant: PropTypes.oneOf(['contained', 'gradient', 'dashboard', 'none']),
  borderWidth: PropTypes.number,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  hasBorderRadius: PropTypes.bool,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'none',
  ]),
};

export default RCBox;
