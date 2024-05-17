import colors from 'assets/themes/base/colors';
import borders from 'assets/themes/base/borders';
import boxShadows from 'assets/themes/base/boxShadows';
import pxToRem from 'assets/themes/functions/pxToRem';

const { grey, white } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      position: 'relative',
      backgroundColor: grey[100],
      borderRadius: borderRadius.xl,
      minHeight: 'unset',
      padding: pxToRem(4),
    },

    flexContainer: {
      height: '100%',
      position: 'relative',
      zIndex: 10,
    },

    fixed: {
      overflow: 'unset !important',
      overflowX: 'unset !important',
    },

    vertical: {
      '& .MuiTabs-indicator': {
        width: '100%',
      },
    },

    indicator: {
      height: '100%',
      borderRadius: borderRadius.lg,
      backgroundColor: white.main,
      boxShadow: tabsBoxShadow.indicator,
      transition: 'all 500ms ease',
    },
  },
};
// root: {
//   position: 'relative',
//   backgroundColor: '#f6fefc',
//   borderRadius: borderRadius.lg,
//   minHeight: 'unset',
//   padding: pxToRem(12),

//   '&.MuiTabs-indicator': {
//     color: `${text.main} !important`,
//     backgroundColor: `${success.main} !important`,
//     boxShadow: tabsBoxShadow.indicator,
//     transition: 'all 500ms ease',
//   },
//   'span.MuiTabs-indicator': {
//     color: `${text.main} !important`,
//     backgroundColor: `${success.main} !important`,
//     boxShadow: tabsBoxShadow.indicator,
//     transition: 'all 500ms ease',
//   },
//   'span.label.MuiTabs-selected': {
//     color: `${text.main} !important`,
//     backgroundColor: `${success.main} !important`,
//     boxShadow: tabsBoxShadow.indicator,
//     transition: 'all 500ms ease',
//   },
//   // '&.MuiTabs-selected': {
//   //   color: `${text.main} !important`,
//   //   backgroundColor: `${success.main} !important`,
//   //   boxShadow: tabsBoxShadow.indicator,
//   //   transition: 'all 500ms ease',
//   // },
// },
