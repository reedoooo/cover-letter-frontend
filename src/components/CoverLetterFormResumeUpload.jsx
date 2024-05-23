import React from 'react';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RCBox from './themed/RCBox';
import RCButton from './themed/RCButton';

const CoverLetterFormResumeUpload = ({
  resFormat,
  setResFormat,
  resText,
  setResText,
  handleFileUpload,
}) => (
  <>
    <FormControl component="fieldset">
      <FormLabel component="legend">
        Do you want to upload or paste your resume/key experience?
      </FormLabel>
      <RadioGroup
        aria-label="resume format"
        name="resFormat"
        value={resFormat}
        onChange={(e) => setResFormat(e.target.value)}
        row
      >
        <FormControlLabel value="Upload" control={<Radio />} label="Upload" />
        <FormControlLabel value="Paste" control={<Radio />} label="Paste" />
      </RadioGroup>
    </FormControl>
    {resFormat === 'Upload' ? (
      <RCBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <RCButton
          variant="contained"
          component="label"
          color="primary"
          startIcon={<UploadFileIcon />}
          sx={{ width: '100%' }}
        >
          Upload Resume
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
            accept="application/pdf"
          />
        </RCButton>
      </RCBox>
    ) : (
      <TextField
        fullWidth
        label="Pasted resume elements"
        value={resText}
        onChange={(e) => setResText(e.target.value)}
        multiline
        rows={4}
        margin="normal"
      />
    )}
  </>
);

export default CoverLetterFormResumeUpload;
