import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import CoverLetterForm from './components/CoverLetterForm';
import CoverLetterPreview from './components/CoverLetterPreview';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CoverLetterForm />
      <CoverLetterPreview />
    </ThemeProvider>
  );
}

export default App;
