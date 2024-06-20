import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from 'assets/theme';
import useManageCookies from 'hooks/useManageCookies';

export const ColorModeContext = createContext({
  mode: 'dark',
  toggleColorMode: () => {},
  theme: getTheme('dark'),
  colorModeValues: () => {},
});

export const ColorModeProvider = ({ children }) => {
  const { addCookies, getCookie } = useManageCookies();
  const initialMode = getCookie('colorMode') || 'dark';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    addCookies('colorMode', mode, { path: '/' });
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        addCookies('colorMode', newMode, { path: '/' });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);
  // const dispatch = useDispatch();
  // const initialMode = getCookie('colorMode') || 'dark';
  // const mode = useSelector(state => state.colorMode.mode);
  // const theme = useSelector(state => state.colorMode.theme);

  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       dispatch(toggleColorMode());
  //     },
  //   }),
  //   [dispatch]
  // );

  // useEffect(() => {
  //   addCookies('colorMode', mode, { path: '/' });
  // }, [mode]);

  return (
    <ColorModeContext.Provider value={{ ...colorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;

// /* eslint-disable react-hooks/exhaustive-deps */
// import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// import React, { useMemo, useState, useEffect, createContext } from 'react';
// import { ThemeProvider as StyledThemeProvider } from 'styled-components';
// import { getTheme } from 'assets/theme';
// import useManageCookies from 'hooks/useManageCookies';

// export const ColorModeContext = createContext({
//   mode: 'dark',
//   toggleColorMode: () => {},
//   theme: getTheme('dark'),
//   colorModeValues: () => {},
// });

// export const ColorModeProvider = ({ children }) => {
//   const { addCookies, getCookie } = useManageCookies();
//   const initialMode = getCookie('colorMode') || 'dark';
//   const [mode, setMode] = useState(initialMode);

//   useEffect(() => {
//     addCookies('colorMode', mode, { path: '/' });
//   }, [mode]);

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () => {
//         const newMode = mode === 'dark' ? 'light' : 'dark';
//         setMode(newMode);
//         addCookies('colorMode', newMode, { path: '/' });
//       },
//     }),
//     [mode]
//   );

//   const theme = useMemo(() => getTheme(mode), [mode]);

//   return (
//     <ColorModeContext.Provider value={{ ...colorMode, mode }}>
//       <MuiThemeProvider theme={theme}>
//         <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
//       </MuiThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default ColorModeProvider;
