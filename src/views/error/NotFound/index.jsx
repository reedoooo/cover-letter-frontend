import FileCopyIcon from '@mui/icons-material/FileCopy';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Typography, Button, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RCButton } from 'components/themed';
const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Handler to navigate back to the home page
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 3, // Apply some padding for smaller screens
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        gutterBottom
        sx={{ fontSize: '6rem', fontWeight: 700 }}
      >
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Oops! Page Not Found.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>
      <RCButton
        startIcon={<RefreshIcon />}
        color="primary"
        size="small"
        // variant="holo"
        variant="outlined"
        withContainer={false}
        onClick={() => window.location.reload()}
        theme={theme}
      >
        Refresh
      </RCButton>
      <Button
        startIcon={<HomeIcon />}
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 2 }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
