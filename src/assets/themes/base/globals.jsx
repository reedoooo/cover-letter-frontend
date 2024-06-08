import mode from '../functions/mode';
import colors from './colors';

const { info, dark } = colors;

const globalsA = {
  html: {
    scrollBehavior: 'smooth',
  },
  '*, *::before, *::after': {
    margin: 0,
    padding: 0,
  },
  'a, a:link, a:visited': {
    textDecoration: 'none !important',
  },
  'a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited': {
    color: `${dark.main} !important`,
    transition: 'color 150ms ease-in !important',
  },
  'a.link:hover, .link:hover, a.link:focus, .link:focus': {
    color: `${info.main} !important`,
  },
};

const globalsB = {
  global: props => ({
    body: {
      overflowX: 'hidden',
      bg: mode('secondaryGray.300', 'navy.900')(props),
      fontFamily: 'DM Sans',
      letterSpacing: '-0.5px',
    },
    input: {
      color: 'gray.700',
    },
    html: {
      scrollBehavior: 'smooth',
    },
  }),
};

const globals = {
  ...globalsA,
  ...globalsB,
};

export default globals;
