import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import React, { useState, useEffect } from 'react';

// Define keyframes for the background color animation
const bgChange = keyframes`
  0% { background-color: transparent; }
  100% { background-color: inherit; }
`;

// Define the animated icon with conditional background color
const AnimatedIconWrapper = styled('div')(({ theme, isLoggedIn }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  color: theme.palette.common.white,
  backgroundColor: isLoggedIn
    ? theme.palette.success.main
    : theme.palette.error.main,
  borderRadius: '50%',
  borderColor: theme.palette.common.white,
  borderWidth: '1px',
  padding: theme.spacing(2),
  animation: `${bgChange} 1s ease-in-out`,
  transition: 'background-color 1s ease-in-out',
  marginLeft: '10px',
}));

const ValidationIcon = ({ IconComponent, isLoggedIn }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    const timeout = setTimeout(() => setAnimated(false), 1000);
    return () => clearTimeout(timeout);
  }, [isLoggedIn]);

  return (
    <AnimatedIconWrapper
      isLoggedIn={isLoggedIn}
      className={animated ? 'animated' : ''}
    >
      <IconComponent fontSize="inherit" />
    </AnimatedIconWrapper>
  );
};

export default ValidationIcon;