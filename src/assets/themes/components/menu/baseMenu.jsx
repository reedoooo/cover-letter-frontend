import { borders, boxShadows, colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { lg } = boxShadows;
const { size } = typography;
const { text, white } = colors;
const { borderRadius } = borders;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      boxShadow: lg,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      fontSize: size.sm,
      color: text.main,
      textAlign: 'left',
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
      // border: `1px solid ${text.main}`,
    },
  },
};
