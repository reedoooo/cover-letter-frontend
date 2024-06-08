import { useContext } from 'react';
import { getTheme } from 'assets/theme';
import { ColorModeContext } from 'contexts/ColorModeProvider';

const useMode = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = getTheme(mode);

  const validateColor = color => {
    if (typeof color === 'object') {
      return true; // Assume object values are valid for now
    }
    const colorParts = color.split('.');
    let currentPalette = theme.palette;
    for (const part of colorParts) {
      if (currentPalette[part]) {
        currentPalette = currentPalette[part];
      } else {
        return false;
      }
    }
    return true;
  };

  const colorModeValues = (dark, light, defaultColor = '#26242C') => {
    const validDark = validateColor(dark);
    const validLight = validateColor(light);
    const returnDark = validDark ? dark : defaultColor;
    const returnLight = validLight ? light : defaultColor;
    return mode === 'dark' ? returnDark : returnLight;
  };

  return { mode, theme, toggleColorMode, colorModeValues };
};

export default useMode;
