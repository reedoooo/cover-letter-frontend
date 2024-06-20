import { createSlice } from '@reduxjs/toolkit';

const LOCAL_NAME = 'appSetting';

const defaultLanguage = navigator.language;

const langs = ['zh-CN', 'en-US', 'zh-TW'];

function defaultSetting() {
  return { siderCollapsed: false, theme: 'light', language: defaultLanguage };
}

function getLocalSetting() {
  const localSetting = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
  return { ...defaultSetting(), ...localSetting };
}

function setLocalSetting(setting) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(setting));
}

const appSlice = createSlice({
  name: 'app',
  initialState: getLocalSetting(),
  reducers: {
    setSiderCollapsed: (state, action) => {
      setLocalSetting({ ...state, siderCollapsed: action.payload });
      state.siderCollapsed = action.payload;
    },
    setTheme: (state, action) => {
      setLocalSetting({ ...state, theme: action.payload });
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      if (state.language !== action.payload) {
        setLocalSetting({ ...state, language: action.payload });
        state.language = action.payload;
      }
    },
    setNextLanguage: state => {
      const nextLang =
        langs[(langs.indexOf(state.language) + 1) % langs.length];
      setLocalSetting({ ...state, language: nextLang });
      state.language = nextLang;
    },
  },
});

export const { setSiderCollapsed, setTheme, setLanguage, setNextLanguage } =
  appSlice.actions;
export default appSlice.reducer;
