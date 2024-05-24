import { createTheme } from '@mui/material';
import { useMemo } from 'react';

import { theme as settings } from 'assets/theme';

const useMode = () => {
  const defaultMode = 'dark';
  const theme = useMemo(
    () => createTheme(settings(defaultMode)),
    [defaultMode],
  );

  return { theme };
};

export default useMode;
