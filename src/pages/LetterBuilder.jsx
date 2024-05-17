const { Grid } = require('@mui/material');
const {
  default: CoverLetterGenerator,
} = require('components/CoverLetterGenerator');
const { default: PageLayout } = require('components/common/PageLayout');

function LetterBuilder() {
  return (
    <PageLayout>
      <Grid
        item
        xs={12}
        container
        sx={{
          backgroundColor: '#1F2937',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CoverLetterGenerator />
      </Grid>
    </PageLayout>
  );
}

export default LetterBuilder;
