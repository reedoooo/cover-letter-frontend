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
  body: {
    overflowX: 'hidden',
    bg: '#F4F7FE',
    fontFamily: 'DM Sans',
    letterSpacing: '-0.5px',
  },
  input: {
    color: '#364152',
  },
};
const globals = {
  ...globalsA,
};

export default globals;
