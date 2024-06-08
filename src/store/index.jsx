// src/store/index.jsx

import { configureStore } from '@reduxjs/toolkit';
import appTasksReducer from './Reducers/appTasksSlice';
import draftsReducer from './Reducers/draftSlice';
import navigationReducer from './Reducers/navigationSlice';
import userReducer from './Reducers/userSlice';

export const store = configureStore({
  reducer: {
    tasks: appTasksReducer,
    drafts: draftsReducer,
    user: userReducer,
    navigation: navigationReducer,
  },
});
export const dispatch = store.dispatch;

export default store;
