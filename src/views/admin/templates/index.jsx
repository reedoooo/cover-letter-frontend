/* eslint-disable no-unused-vars */
import { Box, Grid } from '@mui/material';
import { templateData } from 'config/data';
import useMode from 'hooks/useMode';
import TemplatesDisplay from './components/TemplatesDisplay';

// ==============================|| TEMPLATES ||============================== //

export default function Templates() {
  const { theme } = useMode();
  const data = templateData.filter(template => template.type !== 'template');
  return (
    <Grid item xs={12}>
      {/* <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}> */}
      <TemplatesDisplay templates={data} />
      {/* </Box> */}
    </Grid>
  );
}
