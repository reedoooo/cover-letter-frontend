import colors from '../../base/colors';
import borders from '../../base/borders';
import typography from '../../base/typography';
import { pxToRem } from 'assets/themes';
import { alpha } from '@mui/material/styles';

const {
  grey,

  success,
  error,
  action,
} = colors;
const { borderRadius } = borders;
const { size } = typography;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      borderRadius: borderRadius.md,
      padding: pxToRem(2),
      margin: pxToRem(4),
      '&.success .MuiOutlinedInput-notchedOutline': {
        borderColor: success.main, // Border color when focused (changed to match context)
        borderWidth: '3px',
        boxShadow: `${alpha(success.main, 0.25)} 0 0 0 0.25rem !important`, // override inline-style
      },
      '&.error .MuiOutlinedInput-notchedOutline': {
        borderColor: error.main, // Border color when focused (changed to match context)
        borderWidth: '3px', // Border width when focused
        boxShadow: `${alpha(error.main, 0.25)} 0 0 0 0.25rem !important`, // override inline-style
      },
    },
  },
  input: {
    '&::placeholder': {
      color: grey[600],
    },
  },

  notchedOutline: {
    borderColor: action.disabled,
    borderWidth: '2px',
    boxShadow: `${alpha(action.disabled, 0.25)} 0 0 0 0.2rem !important`, // override inline-style
  },
};
