import React from 'react';
import { Box, Typography } from '@mui/material';

function CoverLetterPreview({ coverLetter }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Your Custom Cover Letter</Typography>
      <Typography variant="body1">{coverLetter}</Typography>
    </Box>
  );
}

export default CoverLetterPreview;
