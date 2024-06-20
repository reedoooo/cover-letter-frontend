import { SvgIcon, styled, Link } from '@mui/material';
import React from 'react';
import LogoSvg from 'assets/logo.svg';

// Styled link component for the logo
const LinkStyled = styled(Link)(({ theme }) => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    height: '50px',
    width: '130px',
  },
}));

// Styled SvgIcon component for the logo
const LogoIcon = styled(SvgIcon)(({ theme }) => ({
  height: '100%',
  width: '100%',
  fill: 'currentColor',
  transition: theme.transitions.create('fill', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    fill: theme.palette.primary.main,
  },
}));

function Logo() {
  return (
    <LinkStyled href="/" aria-label="Home">
      <LogoIcon component={LogoSvg} />
    </LinkStyled>
  );
}

export default Logo;
