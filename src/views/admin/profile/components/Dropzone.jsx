/* eslint-disable no-unused-vars */
import { Button, Box, Input, useTheme } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { styled as styledDefault } from 'styled-components';

const DropzoneContainer = styledDefault(Box)(({ theme, bg, borderColor }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  background: bg,
  border: `1px dashed ${borderColor}`,
  borderRadius: 16,
  width: '100%',
  height: 'max-content',
  minHeight: '100%',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
}));

const Dropzone = props => {
  const { content, ...rest } = props;
  const { getRootProps, getInputProps } = useDropzone();
  const theme = useTheme();
  const bg =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.primary.dark;
  const borderColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : 'rgba(255, 255, 255, 0.1)';

  return (
    <DropzoneContainer
      bg={bg}
      borderColor={borderColor}
      {...getRootProps()}
      {...rest}
    >
      <Input {...getInputProps()} style={{ display: 'none' }} />
      <Button variant="contained" disableElevation>
        {content}
      </Button>
    </DropzoneContainer>
  );
};

export default Dropzone;
