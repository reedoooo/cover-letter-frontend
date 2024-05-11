import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import CoverLetterForm from './components/CoverLetterForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CoverLetterForm />
    </ThemeProvider>
  );
}

export default App;
