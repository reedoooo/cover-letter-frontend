import pxToRem from 'assets/themes/functions/pxToRem';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  defaultProps: {
    fontSize: 'inherit',
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: 'inherit !important',
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
  },
};
