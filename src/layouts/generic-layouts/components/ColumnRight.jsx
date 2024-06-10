import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout, PaperCard } from 'components/index';
import useMode from 'hooks/useMode';

const ColumnRight = () => {
  const { theme } = useMode();
  return (
    <PageLayout>
      <Grid
        item
        xs={9}
        style={{ padding: '16px', borderRight: '1px solid #ddd' }}
      >
        <Box
          // width="100vw"
          height="100%"
          minHeight="100vh"
          maxWidth="100%"
          sx={{ overflowX: 'hidden', m: 0, p: 0 }} // Ensure no margins or paddings
        >
          <Grid
            container
            sx={{ minHeight: '100vh', minWidth: '100vw', m: 0, p: 0 }}
          >
            <Outlet />
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={3} style={{ padding: '16px', marginTop: '2rem' }}>
        <PaperCard theme={theme}>
          <CardHeader title="Header" />
          <CardContent>
            <Box>{/* Body content goes here */}</Box>
          </CardContent>
          <CardActions>
            <Box>{/* Footer content goes here */}</Box>
          </CardActions>
        </PaperCard>
      </Grid>
    </PageLayout>
  );
};

export default ColumnRight;
