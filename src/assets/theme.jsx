import {
  boxShadow,
  hexToRgba,
  hexToRgb,
  linearGradient,
  pxToRem,
  rgba,
} from './themes';
import { breakpoints, colors, borders, boxShadows, typography } from './themes';
import { Transitions } from './themes';
import components from './themes/components';

export const theme = (mode) => {
  return {
    functions: {
      boxShadow,
      hexToRgb,
      hexToRgba,
      linearGradient,
      pxToRem,
      rgba,
    },
    palette: {
      ...colors,
      mode: mode === 'dark' ? 'dark' : 'light',
    },
    components: {
      ...components,
    },
    breakpoints: breakpoints.values,
    Transitions: Transitions,
    borders: borders,
    boxShadows: boxShadows,
    typography: typography,
    spacing: (factor) => `${0.25 * factor}rem`,
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  };
};
