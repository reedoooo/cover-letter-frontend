import borders from '../../base/borders';
import colors from '../../base/colors';
import pxToRem from '../../functions/pxToRem';

const { borderWidth } = borders;
const { light } = colors;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};
