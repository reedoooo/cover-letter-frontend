import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';
import React, { useRef } from 'react';

const FileUpload = ({ onFileChange, iconStyle }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AttachFileIcon style={iconStyle} />
      </IconButton>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </>
  );
};

export default FileUpload;
