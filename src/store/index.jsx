// src/store/index.jsx
import { configureStore } from '@reduxjs/toolkit';

import draftsReducer from './Reducers/draftSlice';

export const store = configureStore({
  reducer: {
    drafts: draftsReducer,
  },
});
