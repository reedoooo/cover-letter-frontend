import HomeIcon from '@mui/icons-material/Home';
import { Box, Typography, Button, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
        px: 3,
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
