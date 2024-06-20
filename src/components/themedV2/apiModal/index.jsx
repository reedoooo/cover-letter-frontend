import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  IconButton,
  Input,
  Link,
  Modal,
  Typography,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  List,
  Card,
} from '@mui/material';
import React, { useState } from 'react';
import { MdBolt, MdLock } from 'react-icons/md';
import useMode from 'hooks/useMode';

function APIModal({ setApiKey, sidebar }) {
  const [inputCode, setInputCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = event => {
    setInputCode(event.target.value);
  };

  const handleApiKeyChange = value => {
    setApiKey(value);
    localStorage.setItem('apiKey', value);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const showToast = (message, severity) => {
    console.log(`${severity}: ${message}`);
  };

  return (
    <>
      {sidebar ? (
        <Button
          onClick={handleOpen}
          sx={{
            cursor: 'pointer',
            transition: '0.3s',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            width: '164px',
            height: '70px',
            boxShadow: 'none',
            borderRadius: '14px',
            color: theme.palette.text.primary,
            fontSize: '18px',
            fontWeight: '700',
          }}
        >
          <Box
            sx={{
              borderRadius: 'full',
              justifyContent: 'center',
              alignItems: 'center',
              background: theme.palette.primary.main,
              marginRight: '10px',
              height: '39px',
              width: '39px',
            }}
          >
            <MdBolt
              style={{
                width: '20px',
                height: '20px',
                color: theme.palette.common.white,
              }}
            />
          </Box>
          Set API Key
        </Button>
      ) : (
        <IconButton
          onClick={handleOpen}
          sx={{
            padding: 0,
            marginRight: 2,
            '&:hover, &:focus, &:selected': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <MdLock
            style={{
              width: '18px',
              height: '18px',
              color: theme.palette.grey[500],
            }}
          />
        </IconButton>
      )}
      <Modal open={isOpen} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 2,
          }}
        >
          <Card
            sx={{ p: 3, maxWidth: 500, width: '100%', textAlign: 'center' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                color={theme.palette.text.primary}
              >
                Enter your OpenAI API Key
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography color={theme.palette.grey[500]} fontWeight="500" mb={2}>
              You need an OpenAI API Key to use Horizon AI Templates features.
              Your API Key is stored locally on your browser and never sent
              anywhere else.
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Input
                sx={{
                  width: '100%',
                  border: `1px solid ${theme.palette.grey[200]}`,
                  borderRadius: '45px',
                  padding: '15px 20px',
                  marginRight: 1,
                  fontSize: 'small',
                  fontWeight: '500',
                  color: theme.palette.text.primary,
                  '&::placeholder': {
                    color: theme.palette.grey[500],
                  },
                }}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                onChange={handleChange}
                value={inputCode}
              />
              <Button
                variant="contained"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: 'small',
                  borderRadius: '45px',
                  ml: 'auto',
                  mb: { xs: 2, md: 0 },
                  width: { xs: '100%', md: 'auto' },
                  height: '54px',
                }}
                onClick={() => {
                  if (inputCode.includes('sk-')) {
                    handleApiKeyChange(inputCode);
                    showToast(
                      'Success! You have successfully added your API key!',
                      'success'
                    );
                  } else {
                    showToast(
                      !inputCode.includes('sk-')
                        ? 'Invalid API key. Please make sure your API key is still working properly.'
                        : 'Please add your API key!',
                      inputCode ? 'error' : 'warning'
                    );
                  }
                }}
              >
                Save API Key
              </Button>
            </Box>
            <Link
              href="https://platform.openai.com/account/api-keys"
              sx={{
                color: theme.palette.primary.main,
                fontSize: 'small',
                textDecoration: 'underline',
                fontWeight: '600',
              }}
            >
              Get your API key from Open AI Dashboard
            </Link>
            <Accordion sx={{ width: '100%', mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={theme.palette.text.primary} fontWeight="700">
                  Your API Key is not working?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem
                    sx={{
                      mb: 2,
                      color: theme.palette.grey[500],
                      fontSize: 'small',
                      fontWeight: '500',
                    }}
                  >
                    Make sure you have an{' '}
                    <Link
                      href="https://platform.openai.com/account/"
                      sx={{
                        textDecoration: 'underline',
                        color: theme.palette.grey[500],
                      }}
                    >
                      OpenAI account
                    </Link>{' '}
                    and a valid API key to use ChatGPT. We dont sell API keys.
                  </ListItem>
                  <ListItem
                    sx={{
                      color: theme.palette.grey[500],
                      fontSize: 'small',
                      fontWeight: '500',
                    }}
                  >
                    Make sure you have your billing info added in{' '}
                    <Link
                      href="https://platform.openai.com/account/billing/overview"
                      sx={{
                        textDecoration: 'underline',
                        color: theme.palette.grey[500],
                      }}
                    >
                      OpenAI Billing
                    </Link>{' '}
                    page. Without billing info, your API key will not work.
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Typography
              color={theme.palette.grey[500]}
              fontWeight="500"
              fontSize="small"
              mt={2}
            >
              *The app will connect to OpenAI API server to check if your API
              Key is working properly.
            </Typography>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

export default APIModal;
