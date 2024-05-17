import colors from '../../base/colors';
import typography from '../../base/typography';

const { text } = colors;
const { size, fontFamily, lineHeight } = typography;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  '--Icon-fontSize': 'calc(var(--FormHelperText-lineHeight) * 1em)',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontFamily: 'var(--FormHelperText-fontFamily, ' + fontFamily + ')',
  fontSize: 'var(--FormHelperText-fontSize, ' + size.sm + ')',
  lineHeight: 'var(--FormHelperText-lineHeight, ' + lineHeight + ')',
  color: 'var(--FormHelperText-color, ' + text.main + ')',
  margin: 'var(--FormHelperText-margin, 0px)',
};
