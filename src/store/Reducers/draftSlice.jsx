// draftsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drafts: [],
  selectedDraftIndex: 0,
  newDraftName: '',
  editedDraftName: '',
  anchorElUser: null,
  userToken: null,

  loading: false,
  isAuthenticated: false,
  isEditing: false,
  formDisabled: true,
  draftsBarVisible: true,
  initAddContentVisible: false,

  dialogState: {
    viewDraftsDialogOpen: false,
    profileDialogOpen: false,
    addDraftDialogOpen: false,
    authDialogOpen: false,
  },
};

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setSelectedDraftIndex: (state, action) => {
      state.selectedDraftIndex = action.payload;
    },
    setDrafts: (state, action) => {
      state.drafts = action.payload;
    },
    addDraft: (state, action) => {
      state.drafts.push(action.payload);
    },
    updateDraftContent: (state, action) => {
      const { index, content } = action.payload;
      state.drafts[index] = { ...state.drafts[index], content };
    },
    editDraft: (state, action) => {
      state.drafts[action.payload.index].title = state.editedDraftName;
    },
    updateDraftName: (state, action) => {
      const { index, title } = action.payload;
      state.drafts[index] = { ...state.drafts[index], title, isEditing: false };
    },
    deleteDraft: (state, action) => {
      state.drafts = state.drafts.filter((_, idx) => idx !== action.payload);
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    toggleIsEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    toggleAuthentication: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    toggleDraftsBar: (state) => {
      state.draftsBarVisible = !state.draftsBarVisible;
    },
    toggleDialogState: (state, action) => {
      const dialog = action.payload;
      state.dialogState[dialog] = !state.dialogState[dialog];
    },
    toggleInitAddContentVisible: (state) => {
      state.initAddContentVisible = !state.initAddContentVisible;
    },
    saveDraft: (state, action) => {
      state.drafts.push(action.payload);
    },
    updateDraft: (state, action) => {
      const { index, draft } = action.payload;
      state.drafts[index] = { ...state.drafts[index], ...draft };
    },
    removeDraft: (state, action) => {
      state.drafts = state.drafts.filter(
        (draft) => draft._id !== action.payload,
      );
    },
    setLinkedInUrl: (state, action) => {
      state.drafts[state.selectedDraftIndex].linkedInUrl = action.payload;
    },
    setResFormat: (state, action) => {
      state.drafts[state.selectedDraftIndex].resFormat = action.payload;
    },
    setResText: (state, action) => {
      state.drafts[state.selectedDraftIndex].resText = action.payload;
    },
    setFormValues: (state, action) => {
      state.drafts[state.selectedDraftIndex].formValues = action.payload;
    },
    setGeneratedPdfUrl: (state, action) => {
      state.drafts[state.selectedDraftIndex].generatedPdfUrl = action.payload;
    },
  },
});

export const {
  setField,
  setSelectedDraftIndex,
  setDrafts,
  addDraft,
  updateDraftContent,
  editDraft,
  updateDraftName,
  deleteDraft,
  toggleLoading,
  toggleIsEditing,
  toggleAuthentication,
  toggleDraftsBar,
  toggleDialogState,
  toggleInitAddContentVisible,
  saveDraft,
  updateDraft,
  removeDraft,
  setLinkedInUrl,
  setResFormat,
  setResText,
  setFormValues,
  setGeneratedPdfUrl,
} = draftsSlice.actions;

export default draftsSlice.reducer;
