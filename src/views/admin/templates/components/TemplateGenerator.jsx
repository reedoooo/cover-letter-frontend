'use client';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import KeyIcon from '@mui/icons-material/Key';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Link,
  useMediaQuery,
  Modal,
  List,
  Card,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { MdLock } from 'react-icons/md';
import { ChatApp } from 'components/TipTapEditor';
import useMode from 'hooks/useMode';
import ValidationIcon from './ValidationIcon'; // Adjust the path as needed

export const TemplateGenerator = () => {
  const { theme } = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);

  const checkUser = () => {
    return !!localStorage.getItem('user');
  };

  const checkApiKey = () => {
    return !!localStorage.getItem('apiKey');
  };

  const checkStatusUpdates = () => {
    setIsLoggedIn(checkUser());
    setIsApiKeyValid(checkApiKey());
  };

  useEffect(() => {
    checkStatusUpdates(); // Initial check when the component mounts

    // Function to handle storage events
    const handleStorageChange = () => {
      checkStatusUpdates();
    };

    // Add event listener for localStorage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            Original Chat AI
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            component="div"
            sx={{
              flex: '1 1 100%',
              color: theme.palette.text.secondary,
              fontSize: '0.8rem',
            }}
          >
            UserId
          </Typography>
          <ValidationIcon
            IconComponent={FingerprintIcon}
            isLoggedIn={isLoggedIn}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            component="div"
            sx={{
              flex: '1 1 100%',
              color: theme.palette.text.secondary,
              fontSize: '0.8rem',
            }}
          >
            Api Key
          </Typography>
          <ValidationIcon IconComponent={KeyIcon} isLoggedIn={isApiKeyValid} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: '#1C1C1C',
          width: '100%',
          borderRadius: '14px',
        }}
      >
        <ChatApp />
      </Box>
    </>
  );
};

export default TemplateGenerator;
