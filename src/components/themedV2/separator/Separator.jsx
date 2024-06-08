import { Box } from '@mui/material';
import React from 'react';

const HSeparator = props => {
  return (
    <Box
      height="1px"
      width="100%"
      bgcolor="rgba(135, 140, 189, 0.3)"
      {...props}
    ></Box>
  );
};

const VSeparator = props => {
  return <Box width="1px" bgcolor="rgba(135, 140, 189, 0.3)" {...props}></Box>;
};

export { HSeparator, VSeparator };
