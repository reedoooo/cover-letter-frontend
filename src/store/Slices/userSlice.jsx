import { createSlice } from '@reduxjs/toolkit';

const LOCAL_NAME = 'userStorage';

function defaultSetting() {
  return {
    userInfo: {
      name: '',
      description: '',
    },
  };
}

function getLocalState() {
  const localSetting = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
  return { ...defaultSetting(), ...localSetting };
}

function setLocalState(setting) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(setting));
}

const userSlice = createSlice({
  name: 'user',
  initialState: getLocalState(),
  reducers: {
    updateUserInfo: (state, action) => {
      const updatedUserInfo = { ...state.userInfo, ...action.payload };
      setLocalState({ ...state, userInfo: updatedUserInfo });
      state.userInfo = updatedUserInfo;
    },
    resetUserInfo: state => {
      const defaultUserInfo = defaultSetting().userInfo;
      setLocalState({ ...state, userInfo: defaultUserInfo });
      state.userInfo = defaultUserInfo;
    },
  },
});

export const { updateUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
