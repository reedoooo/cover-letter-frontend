import { Dialog } from '@mui/material';

import useMode from 'hooks/useMode';

const { default: styled } = require('styled-components');

const validGradients = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
];
const validColors = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
  'grey',
];
const validBorderRadius = ['none', 'sm', 'md', 'lg', 'xl'];
const validBoxShadows = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export default styled(Dialog)(({ ownerState }) => {
  const { theme } = useMode();
  const { palette, functions, borders, boxShadows } = theme;
  const {
    variant,
    bgColor,
    color,
    opacity,
    borderRadius,
    shadow,
    coloredShadow,
    transition,
  } = ownerState;

  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;

  // BACKGROUND COLOR
  let backgroundValue = bgColor;
  if (variant === 'gradient' && validGradients.includes(bgColor)) {
    backgroundValue = linearGradient(
      gradients[bgColor].main,
      gradients[bgColor].state,
    );
  } else if (validColors.includes(bgColor)) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : grey[bgColor];
  }

  // COLOR
  let colorValue = color;
  if (validColors.includes(color)) {
    colorValue = palette[color] ? palette[color].main : grey[color];
  }

  // BORDER RADIUS
  let borderRadiusValue = borderRadius;
  if (validBorderRadius.includes(borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  // BOX SHADOWS
  let boxShadowValue = 'none';
  if (validBoxShadows.includes(shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : 'none';
  }

  const transitionStyles = {
    slide: {
      transition: 'transform 0.3s ease-out',
    },
    fade: {
      transition: 'opacity 0.3s ease-out',
    },
    grow: {
      transition: 'transform 0.3s ease-out',
      transformOrigin: 'center',
    },
    zoom: {
      transition: 'transform 0.3s ease-out',
      transform: 'scale(1.1)',
    },
    none: {},
  };

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
    ...transitionStyles[transition],
  };
});
