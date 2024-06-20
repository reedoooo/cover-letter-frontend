import { Box } from '@mui/material';
import { styled as styledDefault } from 'styled-components';
import useMode from 'hooks/useMode';

const StyledBox = styledDefault(Box)(({ ownerState }) => {
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
  } = ownerState;
  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;
  const greyColors = {
    'grey-100': grey[100],
    'grey-200': grey[200],
    'grey-300': grey[300],
    'grey-400': grey[400],
    'grey-500': grey[500],
    'grey-600': grey[600],
    'grey-700': grey[700],
    'grey-800': grey[800],
    'grey-900': grey[900],
  };
  const validGradients = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ];
  const validColors = [
    'transparent',
    'white',
    'black',
    'text',
    'grey-100',
    'grey-200',
    'grey-300',
    'grey-400',
    'grey-500',
    'grey-600',
    'grey-700',
    'grey-800',
    'grey-900',
  ];
  const validBorderRadius = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'section'];
  const validBoxShadows = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'inset'];

  let backgroundValue = bgColor;
  if (variant === 'gradient') {
    backgroundValue = validGradients.find(el => el === bgColor)
      ? linearGradient(gradients[bgColor]?.main, gradients[bgColor]?.state)
      : white?.main;
  } else if (validColors.find(el => el === bgColor)) {
    backgroundValue = palette[bgColor]
      ? palette[bgColor].main
      : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  let colorValue = color;
  if (validColors.find(el => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  let borderRadiusValue = borderRadius;
  if (validBorderRadius.find(el => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  let boxShadowValue = 'none';
  if (validBoxShadows.find(el => el === shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : 'none';
  }

  const baseVariants = ['contained', 'gradient', 'dashboard', 'none'];
  const getBaseTheme = () => ({
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  });
  const getDashboardTheme = () => ({
    backgroundColor: '#2d2d34',
    borderRadius: '1rem',
    flexGrow: 1,
  });
  const basePaper = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    minWidth: '100%',
    overflowWrap: 'break-word',
    maxWidth: 'max-content',
    height: '100%',
    borderRadius: '20px',
    background: 'border-box rgb(255, 255, 255)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  };
  const getCardTheme = () => ({
    ...basePaper,
    padding: '20px 20px',
  });
  const getPaperTheme = () => ({
    ...basePaper,
    padding: theme.spacing(8),
  });
  const getOutlinedTheme = () => ({
    backgroundColor: 'transparent',
    border: `1px solid ${palette.grey[500]}`,
    color: palette.grey[500],
    borderRadius: '1rem',
    padding: '1rem',
  });

  return {
    ...(baseVariants.includes(variant) && getBaseTheme()),
    ...(variant === 'dashboard' && getDashboardTheme()),
    ...(variant === 'paper' && getPaperTheme()),
    ...(variant === 'card' && getCardTheme()),
    ...(variant === 'outlined' && getOutlinedTheme()),
  };
});

export default StyledBox;
