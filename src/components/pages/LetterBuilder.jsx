import { Grid } from '@mui/material';
import Generator from 'components/Generator';
import { PageLayout } from '..';

function LetterBuilder() {
  return (
    <PageLayout>
      <Grid
        item
        xs={12}
        // container
        sx={{
          backgroundColor: '#1F2937',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Generator />
      </Grid>
    </PageLayout>
  );
}
export default LetterBuilder;
