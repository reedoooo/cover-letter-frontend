import { alpha } from '@mui/material/styles';

import { borders, colors, typography } from 'assets/themes/base';

const { info, action, dark } = colors;
const { borderWidth } = borders;
const { size } = typography;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: dark.main,
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: `${borderWidth[1]} solid ${alpha(action.hover, 0.15)}`,
      },

      '&:before': {
        borderColor: alpha(action.hover, 0.15),
      },

      '&:after': {
        borderColor: info.main,
      },
    },
  },
};
