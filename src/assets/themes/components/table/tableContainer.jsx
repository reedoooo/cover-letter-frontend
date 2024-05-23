import { borders, boxShadows } from 'assets/themes/base';

const { md } = boxShadows;
const { borderRadius } = borders;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      backgroundColor: '#fff',
      boxShadow: md,
      borderRadius: borderRadius.xl,
    },
  },
};
