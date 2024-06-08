'use client';

/* eslint-disable no-unused-vars */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Icon,
  Input,
  Typography,
  Link,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from 'react-icons/md';
import Bg from 'assets/img/auth/banner.png';
import MessageBox from 'components/data/MessageBox';
import useMode from 'hooks/useMode';

export default function Chat(props) {
  const [inputOnSubmit, setInputOnSubmit] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [loading, setLoading] = useState(false);
  const { colorModeValues } = useMode();

  const borderColor = colorModeValues('gray.200', 'whiteAlpha.200');
  const inputColor = colorModeValues('navy.700', 'white');
  const iconColor = colorModeValues('brand.500', 'white');
  const bgIcon = colorModeValues(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'whiteAlpha.200'
  );
  const brandColor = colorModeValues('brand.500', 'white');
  const buttonBg = colorModeValues('white', 'whiteAlpha.100');
  const gray = colorModeValues('gray.500', 'white');
  const buttonShadow = colorModeValues(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'none'
  );
  const textColor = colorModeValues('navy.700', 'white');
  const placeholderColor = colorModeValues(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' }
  );

  const handleTranslate = async () => {
    let apiKey = localStorage.getItem('apiKey');
    setInputOnSubmit(inputCode);
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 700 : 700;

    if (!apiKey?.includes('sk-')) {
      alert('Please enter an API key.');
      return;
    }
    if (!inputCode) {
      alert('Please enter your message.');
      return;
    }
    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setOutputCode(' ');
    setLoading(true);
    const controller = new AbortController();
    const body = {
      inputCode,
      model,
      apiKey,
    };

    const response = await fetch('./api/chatAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      if (response) {
        alert(
          'Something went wrong when fetching from the API. Make sure to use a valid API key.'
        );
      }
      return;
    }

    const data = response.body;
    if (!data) {
      alert('Something went wrong');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      setLoading(true);
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setOutputCode(prevCode => prevCode + chunkValue);
    }
    setLoading(false);
  };

  const handleChange = event => {
    setInputCode(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: '70px', md: '0px' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={Bg}
        sx={{
          position: 'absolute',
          width: '350px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <Box
        sx={{
          mx: 'auto',
          width: { xs: '100%', md: '100%', xl: '100%' },
          minHeight: { xs: '75vh', xl: '85vh' },
          maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: '100%', mb: outputCode ? '20px' : 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              mx: 'auto',
              zIndex: 2,
              width: 'max-content',
              mb: '20px',
              borderRadius: '60px',
            }}
          >
            <Button
              onClick={() => setModel('gpt-3.5-turbo')}
              sx={{
                cursor: 'pointer',
                transition: '0.3s',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                  model === 'gpt-3.5-turbo' ? buttonBg : 'transparent',
                width: '174px',
                height: '70px',
                boxShadow: model === 'gpt-3.5-turbo' ? buttonShadow : 'none',
                borderRadius: '14px',
                color: textColor,
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              <Box
                sx={{
                  borderRadius: 'full',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: bgIcon,
                  marginRight: '10px',
                  height: '39px',
                  width: '39px',
                }}
              >
                <Icon
                  component={MdAutoAwesome}
                  sx={{ width: '20px', height: '20px', color: iconColor }}
                />
              </Box>
              GPT-3.5
            </Button>
            <Button
              onClick={() => setModel('gpt-4')}
              sx={{
                cursor: 'pointer',
                transition: '0.3s',
                justifyContent: 'center',
                alignItems: 'center',
                background: model === 'gpt-4' ? buttonBg : 'transparent',
                width: '164px',
                height: '70px',
                boxShadow: model === 'gpt-4' ? buttonShadow : 'none',
                borderRadius: '14px',
                color: textColor,
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              <Box
                sx={{
                  borderRadius: 'full',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: bgIcon,
                  marginRight: '10px',
                  height: '39px',
                  width: '39px',
                }}
              >
                <Icon
                  component={MdBolt}
                  sx={{ width: '20px', height: '20px', color: iconColor }}
                />
              </Box>
              GPT-4
            </Button>
          </Box>
          <Accordion sx={{ color: gray, width: '100%', my: '0px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color={gray} fontWeight="500" fontSize="sm">
                No plugins added
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                color={gray}
                fontWeight="500"
                fontSize="sm"
                textAlign="center"
              >
                This is a cool text example.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            display: outputCode ? 'flex' : 'none',
            flexDirection: 'column',
            width: '100%',
            mx: 'auto',
            mb: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              mb: '10px',
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: borderColor,
                mr: '20px',
                height: '40px',
                minHeight: '40px',
                minWidth: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                component={MdPerson}
                sx={{
                  width: '20px',
                  height: '20px',
                  color: brandColor,
                }}
              />
            </Box>
            <Paper
              sx={{
                p: '22px',
                width: '100%',
                zIndex: 2,
                backgroundColor: 'white',
                borderRadius: '14px',
                boxShadow: buttonShadow,
              }}
            >
              <Typography
                color={textColor}
                fontWeight="600"
                fontSize={{ base: 'sm', md: 'md' }}
                lineHeight={{ base: '24px', md: '26px' }}
              >
                {inputOnSubmit}
              </Typography>
            </Paper>
            <IconButton
              sx={{
                cursor: 'pointer',
                color: gray,
                width: '20px',
                height: '20px',
              }}
              onClick={() => {
                // Handle edit action here
              }}
            >
              <Icon component={MdEdit} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                borderRadius: 'full',
                background:
                  'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40px',
                minWidth: '40px',
                marginRight: '20px',
                display: 'flex',
              }}
            >
              <Icon
                component={MdAutoAwesome}
                sx={{ width: '20px', height: '20px', color: 'white' }}
              />
            </Box>
            <MessageBox output={outputCode} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mt: '20px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            ms: { base: '0px', xl: '60px' },
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              minHeight: '54px',
              height: '100%',
              border: '1px solid',
              borderColor: borderColor,
              borderRadius: '45px',
              padding: '15px 20px',
              mr: '10px',
              fontSize: 'sm',
              fontWeight: '500',
              '& .MuiInputBase-root': {
                color: inputColor,
              },
              '& .MuiInputBase-input::placeholder': placeholderColor,
            }}
            placeholder="Type your message here..."
            onChange={handleChange}
          />
          <Button
            variant="contained"
            sx={{
              py: '20px',
              px: '16px',
              ms: 'auto',
              width: { base: '160px', md: '210px' },
              height: '54px',
              background:
                'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              boxShadow: buttonShadow,
              '&:hover': {
                boxShadow:
                  '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                background:
                  'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              },
              '&:disabled': {
                background:
                  'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleTranslate}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
          }}
        >
          <Typography fontSize="xs" textAlign="center" color={gray}>
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts.
          </Typography>
          <Link href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes">
            <Typography
              fontSize="xs"
              fontWeight="500"
              textDecoration="underline"
              color={gray}
            >
              ChatGPT May 12 Version
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
