// OVERRIDE STYLES: TextField
import colors from '../../base/colors';

const { transparent } = colors;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      p: 2,
    },
    input: {
      '&::placeholder': {
        color: transparent.main,
      },
    },
  },
};
