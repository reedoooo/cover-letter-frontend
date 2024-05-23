const { borders, boxShadows } = require('assets/themes/base');

const { borderRadius } = borders;
const { xxl } = boxShadows;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    paper: {
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
    },

    paperFullScreen: {
      borderRadius: 0,
    },
  },
};
