import { Box, Grid, Stack, Typography, alpha } from '@mui/material';
import { PageLayout, PaperCard } from 'components/index';
import useMode from 'hooks/useMode';
import LoadersA from './LoadersA';
import LoadersB from './LoadersB';

export const LoadersDisplay = () => {
  const { theme } = useMode();
  return (
    <PageLayout>
      <Grid
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100vh',
          width: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            // width: '50vw',
            textAlign: 'center',
            border: `1px solid ${alpha('#000', 0.2)}`,
            borderRadius: 2,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box p={4} bgcolor="primary.main" color="white">
                <Typography variant="h4">Top Bar</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box p={4} bgcolor="secondary.main" color="white">
                <Typography variant="h4">Left Sidebar</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box p={4} bgcolor="primary.light" color="white">
                <Typography variant="h4">Main Content</Typography>
              </Box>
              {/* <Stack> */}
              {/* <PaperCard theme={theme}> */}
              <LoadersA />
              {/* </PaperCard> */}
              {/* </Stack> */}
              {/* <Stack>
                <PaperCard theme={theme}>
                  <LoadersB />
                </PaperCard>
              </Stack> */}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </PageLayout>
  );
};

export default LoadersDisplay;
