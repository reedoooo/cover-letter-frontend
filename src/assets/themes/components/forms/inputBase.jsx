import colors from '../../base/colors';
import typography from '../../base/typography';

const { dark } = colors;
const { size } = typography;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: dark.main,
    },
  },
};
