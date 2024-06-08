import { createTheme } from '@mui/material/styles';
import { borders, boxShadows, breakpoints, colors, typography } from './themes';
import components from './themes/components';
import {
  boxShadow,
  hexToRgb,
  linearGradient,
  pxToRem,
  rgba,
} from './themes/functions';
import Transitions from './themes/transitions';

const baseThemeData = {
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },
  components: {
    ...components,
  },
  breakpoints: breakpoints.values,
  transitions: Transitions,
  borders: borders,
  boxShadows: boxShadows,
  typography: typography,
  spacing: factor => `${0.25 * factor}rem`,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
};

const getPalette = mode => ({
  mode,
  brand: colors.brand[mode],
  brandScheme: colors.brandScheme[mode],
  brandTabs: colors.brandTabs[mode],
  secondaryGray: colors.secondaryGray[mode],
  primary: colors.primary[mode],
  secondary: colors.secondary[mode],
  background: colors.background[mode],
  text: colors.text[mode],
  divider: colors.divider[mode],
  action: colors.action[mode],
});

export const lightTheme = createTheme({
  ...baseThemeData,
  palette: getPalette('light'),
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif',
  // },
});

export const darkTheme = createTheme({
  ...baseThemeData,
  palette: getPalette('dark'),
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif',
  // },
});

export const getTheme = mode => (mode === 'dark' ? darkTheme : lightTheme);
