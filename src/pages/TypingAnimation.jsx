/* eslint-disable max-len */
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

import useMode from 'hooks/useMode';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  margin: theme.spacing(2),
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  textAlign: 'flex-start',
  height: '100%',
  overflowY: 'auto',
}));
const AspectRatioBox = styled(Box)({
  width: '60%', // Take the full width of its paren
  maxHeight: 500, // Maximum height of 80% of the viewport height
  maxWidth: 'calc(500px * 0.707)', // Maintain A4 aspect ratio (0.707 = 1 / √2)
  alignItems: 'flex-start',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '1rem',
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '141.4%', // Height is 141.4% of the width, maintaining A4 aspect ratio
  },
  '& > div': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    margin: 'auto',
  },
});
function TypingAnimation() {
  const { theme } = useMode();
  const [text, setText] = useState('');
  const coverLetter =
    'Dear Hiring Manager,\n\nI am excited to apply for the role at your company. I believe my skills and background make me a good fit.\nThank you for considering my application.\n\nSincerely,\n[Your Name]';
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    const typeLetter = () => {
      if (indexRef.current < coverLetter.length) {
        setText(coverLetter.substring(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeLetter, 70); // Controls the typing speed
      } else {
        timeoutRef.current = setTimeout(() => {
          setText('');
          indexRef.current = 0;
          typeLetter();
        }, 3000); // Wait 3 seconds before clearing and restarting
      }
    };

    typeLetter();

    // Cleanup to prevent multiple intervals if component re-renders
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [coverLetter]);

  return (
    <AspectRatioBox>
      <StyledPaper elevation={3} theme={theme}>
        <Typography
          // theme={theme}
          variant="body1"
          component="pre" // Preformatted text to maintain whitespace
          sx={{
            fontFamily: '"Courier New", Courier, monospace', // Typewriter-style font
            fontSize: '1rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap', // Wraps text and preserves spaces and line breaks
            textAlign: 'left',
            color: '#333',
            margin: '1rem',
            padding: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {text}
        </Typography>
      </StyledPaper>
    </AspectRatioBox>
  );
}

export default TypingAnimation;
