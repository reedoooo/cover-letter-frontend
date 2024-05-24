import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { TextField, Grid } from '@mui/material';
import React from 'react';

import { StyledIconContainer } from './styled';
import RCBox from './themed/RCBox';
import RCButton from './themed/RCButton';

const CoverLetterFormLinkedInSection = ({
  linkedInUrl,
  setLinkedInUrl,
  handleLinkedInSubmit,
  theme,
}) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <RCButton
        variant="contained"
        color="primary"
        onClick={handleLinkedInSubmit}
        textSizeVariant="button"
        textWeightVariant="bold"
        startIcon={
          <StyledIconContainer
            theme={theme}
            sx={{ borderRadius: `${theme.spacing(2)} !important` }}
          >
            <LinkedInIcon />
          </StyledIconContainer>
        }
        sx={{
          mt: 4,
          ml: 2,
          p: 2,
          width: '97.5%',
          justifyContent: 'flex-start',
          // mx: '1rem',
          '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: '1rem',
          },
        }}
      >
        LinkedIn URL
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
