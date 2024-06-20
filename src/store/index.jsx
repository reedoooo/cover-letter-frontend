import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './Slices';

export const store = configureStore({
  reducer: reducers,
});
export const dispatch = store.dispatch;

export default store;
