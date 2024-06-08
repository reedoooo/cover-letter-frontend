/* eslint-disable no-unused-vars */
import { Box, Grid } from '@mui/material';
import { templateData } from 'config/data';
import useMode from 'hooks/useMode';
import TemplatesDisplay from './components/TemplatesDisplay';

// ==============================|| TEMPLATES ||============================== //

export default function Templates() {
  const { theme } = useMode();
  const brandColor = theme.palette.secondary.main;
  const boxBg =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[700];
  const { location } = window;
  const base = `${location.origin}/`;

  return (
    <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
      <Grid container spacing={2} mb={2}>
        <TemplatesDisplay templates={templateData} />
      </Grid>
      <Grid container mb={2} spacing={2}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
}
