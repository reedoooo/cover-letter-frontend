import Typography from '@mui/material/Typography';

import useMode from 'hooks/useMode';

const { default: styled } = require('styled-components');

export default styled(Typography)(({ ownerState }) => {
  const { theme } = useMode();
  const { palette, typography, functions } = theme;
  const {
    color,
    textTransform,
    verticalAlign,
    fontWeight,
    opacity,
    textGradient,
    darkMode,
  } = ownerState;
  const { gradients, transparent, white } = palette;
  const {
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
  } = typography;
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };
  const { linearGradient } = functions;

  const gradientStyles = () => ({
    backgroundImage:
      color !== 'inherit' &&
      color !== 'text' &&
      color !== 'white' &&
      gradients[color]
        ? linearGradient(gradients[color].main, gradients[color].state)
        : linearGradient(gradients.dark.main, gradients.dark.state),
    display: 'inline-block',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: transparent.main,
    position: 'relative',
    zIndex: 1,
  });

  let colorValue =
    color === 'inherit' || !palette[color] ? 'inherit' : palette[color].main;

  if (darkMode && (color === 'inherit' || !palette[color])) {
    colorValue = 'inherit';
  } else if (darkMode && color === 'dark') colorValue = white.main;

  if (color === 'textPrimary') colorValue = palette.text.primary;
  if (color === 'textSecondary') colorValue = palette.text.secondary;
  if (color === 'textTertiary') colorValue = palette.text.tertiary;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: 'none',
    color: colorValue,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...(textGradient && gradientStyles()),
  };
});
