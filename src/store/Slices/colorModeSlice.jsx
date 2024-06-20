import { createSlice } from '@reduxjs/toolkit';
import { getTheme } from 'assets/theme';

// Utility functions for managing cookies
const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const addCookies = (name, value, options = {}) => {
  let cookieString = `${name}=${value};`;
  if (options.path) {
    cookieString += `path=${options.path};`;
  }
  document.cookie = cookieString;
};

const initialMode = getCookie('colorMode') || 'dark';

const colorModeSlice = createSlice({
  name: 'colorMode',
  initialState: {
    mode: initialMode,
    theme: getTheme(initialMode),
  },
  reducers: {
    toggleColorMode: state => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      state.mode = newMode;
      state.theme = getTheme(newMode);
      addCookies('colorMode', newMode, { path: '/' });
    },
    setColorMode: (state, action) => {
      state.mode = action.payload;
      state.theme = getTheme(action.payload);
      addCookies('colorMode', action.payload, { path: '/' });
    },
  },
});

export const { toggleColorMode, setColorMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
