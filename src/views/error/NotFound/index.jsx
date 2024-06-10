import FileCopyIcon from '@mui/icons-material/FileCopy';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Typography, Button, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexBetween } from 'components/index';
import { RCButton } from 'components/themed';
import useMode from 'hooks/useMode';
const NotFoundPage = failedRoute => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const failedRouteText = `/${failedRoute.path}`;
  const codeAsTLiteral = failedRouteText.replace(/\//g, '\\/');
  // Handler to navigate back to the home page
  const handleGoHome = () => {
    navigate('/');
  };
  // Handler to navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };
  // Handler to navigate to the route that failed
  const handleAttempt = () => {
    navigate(failedRoute);
  };
  // Handler to copy the route that failed
  const handleCopy = () => {
    navigator.clipboard.writeText(failedRoute);
  };
  // Handler to refresh the current page
  const handleRefresh = () => {
    window.location.reload();
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
      <Typography
        variant="subtitle1"
        sx={{ mb: 4, textAlign: 'center', color: theme.palette.text.tertiary }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>
      <FlexBetween
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: theme.palette.text.tertiary,
          }}
        >
          Failed Route:
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: theme.palette.error.main,
            fontWeight: 700,
            ml: 1,
            mb: 4,
          }}
        >
          {failedRouteText}
        </Typography>
      </FlexBetween>
      <Box
        marginTop={2}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        border={'1px solid #f44336'}
      >
        <Typography
          variant="h6"
          color="textPrimary"
          fontWeight="bold"
          gutterBottom
        >
          Route: {failedRoute?.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {failedRoute?.message}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {codeAsTLiteral}
        </Typography>
      </Box>
      <RCButton
        startIcon={<RefreshIcon />}
        color="primary"
        size="small"
        // variant="holo"
        variant="outlined"
        withContainer={false}
        onClick={handleRefresh}
        // onClick={() => window.location.reload()}
        theme={theme}
      >
        Refresh
      </RCButton>
      <Button
        startIcon={<FileCopyIcon />}
        variant="contained"
        color="primary"
        onClick={handleCopy}
        sx={{ mt: 2 }}
      >
        Copy Route
      </Button>
      <Button
        startIcon={<HomeIcon />}
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
      <Button
        startIcon={<HomeIcon />}
        variant="contained"
        color="primary"
        onClick={handleAttempt}
        sx={{ mt: 2 }}
        theme={theme}
      >
        Go to Route
      </Button>
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
