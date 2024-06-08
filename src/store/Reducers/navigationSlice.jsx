import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogState: {
    viewDraftsDialogOpen: false,
    profileDialogOpen: false,
    addDraftDialogOpen: false,
    authDialogOpen: false,
  },
  draftsBarVisible: true,
  initAddContentVisible: false,
  formDisabled: true,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleDialogState: (state, action) => {
      const dialog = action.payload;
      state.dialogState[dialog] = !state.dialogState[dialog];
    },
    toggleDraftsBar: state => {
      state.draftsBarVisible = !state.draftsBarVisible;
    },
    toggleInitAddContentVisible: state => {
      state.initAddContentVisible = !state.initAddContentVisible;
    },
    toggleFormDisabled: state => {
      state.formDisabled = !state.formDisabled;
    },
  },
});

export const {
  toggleDialogState,
  toggleDraftsBar,
  toggleInitAddContentVisible,
  toggleFormDisabled,
} = navigationSlice.actions;
export default navigationSlice.reducer;
