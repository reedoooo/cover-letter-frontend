import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RCBox from './themed/RCBox';
import RCButton from './themed/RCButton';

const CoverLetterFormLinkedInSection = ({
  linkedInUrl,
  setLinkedInUrl,
  handleLinkedInSubmit,
}) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <RCButton
        variant="contained"
        color="primary"
        onClick={handleLinkedInSubmit}
        startIcon={<LinkedInIcon />}
        sx={{ mt: 4, ml: 2, p: 2, width: '97.5%' }}
      >
        <Typography
          variant="button"
          color="white"
          sx={{
            width: '100%',
            py: 2,
            fontWeight: 500,
            fontSize: '1rem',
            textTransform: 'none',
            letterSpacing: '0.02rem',
            lineHeight: '1.5rem',
            textDecoration: 'none',
            textShadow: '0 0.05rem 0.1rem rgba(0, 0, 0, 0.15)',
          }}
        >
          Submit LinkedIn URL
        </Typography>
      </RCButton>
    </Grid>
    <Grid item xs={12} md={6}>
      <RCBox sx={{ mt: 1, mr: 4, p: 2, width: '100%' }}>
        <TextField
          id="linkedInUrl"
          label="LinkedIn URL"
          name="linkedInUrl"
          variant="outlined"
          value={linkedInUrl}
          onChange={(e) => setLinkedInUrl(e.target.value)}
          sx={{
            fontSize: '1rem',
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'green' },
              '&:hover fieldset': { borderColor: 'darkgreen' },
              '&.Mui-focused fieldset': { borderColor: 'darkgreen' },
            },
          }}
        />
      </RCBox>
    </Grid>
  </Grid>
);

export default CoverLetterFormLinkedInSection;
