import borders from '../../base/borders';
import pxToRem from '../../functions/pxToRem';

const { borderRadius } = borders;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: 'auto',
    },
  },
};
