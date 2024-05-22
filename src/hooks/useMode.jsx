import { createTheme } from '@mui/material';
import { theme as settings } from 'assets/theme';
import { useMemo } from 'react';

const useMode = () => {
  const defaultMode = 'dark';
  const theme = useMemo(
    () => createTheme(settings(defaultMode)),
    [defaultMode]
  );

  return { theme };
};

export default useMode;
