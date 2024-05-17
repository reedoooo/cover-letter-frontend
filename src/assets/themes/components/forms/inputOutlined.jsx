import colors from '../../base/colors';
import borders from '../../base/borders';
import typography from '../../base/typography';
import { pxToRem } from 'assets/themes';
import { alpha } from '@mui/material/styles';

const { info, grey, background, action } = colors;
const { borderRadius } = borders;
const { size } = typography;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.md,
      '&:hover': {
        borderColor: action.disabled, // Border color when focused (changed to match context)
        borderWidth: '3px', // Border width when focused
        boxShadow: `${alpha(action.hover, 0.25)} 0 0 0 0.2rem !important`, // override inline-style
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: info.main, // Border color when focused (changed to match context)
        borderWidth: '3px', // Border width when focused
        boxShadow: `${alpha(info.main, 0.25)} 0 0 0 0.2rem !important`, // override inline-style
      },
    },
    input: {
      backgroundColor: background.default,
    },
    notchedOutline: {
      borderColor: action.disabled,
      borderWidth: '2px',
      boxShadow: `${alpha(action.disabled, 0.25)} 0 0 0 0.2rem !important`, // override inline-style
    },

    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },

    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};
