import borders from '../../base/borders';
import colors from '../../base/colors';
import { alpha } from '@mui/material/styles';

const { info, action } = colors;
const { borderWidth } = borders;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
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
