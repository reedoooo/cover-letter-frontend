import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import TypingAnimation from 'assets/TypingAnimation';
import PageLayout from 'components/common/PageLayout';
import useMode from 'hooks/useMode';
import useRouter from 'hooks/useRouter';

function Home() {
  const { theme } = useMode();
  const { navigate } = useRouter();

  return (
    <PageLayout>
      <Grid
        item
        xs={12}
        md={6}
        lg={8}
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: 4,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100vh',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontSize: '2rem', fontWeight: 'bold' }}
          >
            AI Cover Letter Generator
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ mb: 2, color: theme.palette.text.secondary }}
          >
            Generate a cover letter in seconds precisely tuned to the job you
            are applying for.
            <br />
            Click the &quot;Generate&quot; button to get started.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2, // Space between buttons
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/cover-letter')}
            >
              Generate
            </Button>
            <Button variant="outlined" color="primary">
              More Info
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#1F2937',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ width: '100%', marginBottom: 4 }}>
            <TypingAnimation />
          </Box>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              padding: 4,
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              This is a simple cover letter generator. It is a project to help
              me learn React and Material-UI. The code is available on{' '}
              <a
                href="https://github.com/reedooooo/cover-letter-generator"
                style={{
                  color: '#64b5f6',
                  textDecoration: 'none',
                }}
              >
                GitHub
              </a>
              .
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </PageLayout>
  );
}

export default Home;