import { borders } from 'assets/themes';

import colors from '../../base/colors';
import typography from '../../base/typography';
import pxToRem from '../../functions/pxToRem';

const { transparent, light, info, success, primary, secondary, error } = colors;
const { size, fontWeightRegular } = typography;
const { borderWidth } = borders;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  base: {
    minHeight: pxToRem(40),
    // color: light.main,
    borderColor: light.main,
    borderWidth: borderWidth[2],
    padding: `${pxToRem(10)} ${pxToRem(24)}`,

    '&:hover': {
      opacity: 0.75,
      backgroundColor: transparent.main,
    },
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(16)} !important`,
    },
    '& .MuiButton-label': {
      fontWeight: fontWeightRegular,
    },
  },

  small: {
    minHeight: pxToRem(32),
    padding: `${pxToRem(6)} ${pxToRem(16)}`,
    fontSize: size.xs,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(47),
    padding: `${pxToRem(12)} ${pxToRem(28)}`,
    fontSize: size.sm,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    backgroundColor: transparent.main,
    borderColor: primary.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },

  secondary: {
    backgroundColor: transparent.main,
    borderColor: secondary.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },

  error: {
    backgroundColor: transparent.main,
    borderColor: error.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },
  info: {
    backgroundColor: transparent.main,
    borderColor: info.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },
  success: {
    backgroundColor: transparent.main,
    borderColor: success.main,

    '&:hover': {
      backgroundColor: transparent.main,
    },
  },
};
