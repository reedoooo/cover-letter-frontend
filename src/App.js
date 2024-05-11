import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './assets/theme';
import CoverLetterGenerator from './components/CoverLetterGenerator';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CoverLetterGenerator />
    </ThemeProvider>
  );
}

export default App;
