// useDraftsReducer.js
import { useReducer } from 'react';

const initialState = {
  drafts: [],
  selectedDraft: 0,
  newDraftName: '',
  editedDraftName: '',
  anchorElUser: null,
  openSnackbar: false,
  dialogOpen: false,
  loading: false,
  isAuthenticated: false,
  loginDialogOpen: false,
  isEditing: false,
  formDisabled: true,
  draftsBarVisible: true,
  viewDraftsDialogOpen: false,
  profileDialogOpen: false,
};

const actionTypes = {
  SET_FIELD: 'SET_FIELD',
  SET_SELECTED_DRAFT: 'SET_SELECTED_DRAFT',
  SET_DRAFTS: 'SET_DRAFTS',

  ADD_DRAFT: 'ADD_DRAFT',
  UPDATE_DRAFT_CONTENT: 'UPDATE_DRAFT_CONTENT',
  EDIT_DRAFT: 'EDIT_DRAFT',
  UPDATE_DRAFT_NAME: 'UPDATE_DRAFT_NAME',
  DELETE_DRAFT: 'DELETE_DRAFT',

  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_IS_EDITING: 'TOGGLE_IS_EDITING',
  TOGGLE_SNACKBAR: 'TOGGLE_SNACKBAR',
  TOGGLE_AUTHENTICATION: 'TOGGLE_AUTHENTICATION',
  TOGGLE_DRAFTS_BAR: 'TOGGLE_DRAFTS_BAR',

  TOGGLE_ADD_DRAFT_DIALOG: 'TOGGLE_ADD_DRAFT_DIALOG',
  TOGGLE_LOGIN_DIALOG: 'TOGGLE_LOGIN_DIALOG',
  TOGGLE_VIEW_DRAFTS_DIALOG: 'TOGGLE_VIEW_DRAFTS_DIALOG',
  TOGGLE_PROFILE_DIALOG: 'TOGGLE_PROFILE_DIALOG',

  SAVE_DRAFT: 'SAVE_DRAFT',
  UPDATE_DRAFT: 'UPDATE_DRAFT',
  REMOVE_DRAFT: 'REMOVE_DRAFT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return { ...state, [action.field]: action.value };
    case actionTypes.SET_SELECTED_DRAFT:
      return { ...state, selectedDraft: action.value };
    case actionTypes.SET_DRAFTS:
      return { ...state, drafts: action.drafts };
    case actionTypes.ADD_DRAFT:
      return { ...state, drafts: [...state.drafts, action.draft] };
    case actionTypes.UPDATE_DRAFT_CONTENT:
      // eslint-disable-next-line no-case-declarations
      const updatedDrafts = [...state.drafts];
      updatedDrafts[action.index] = {
        ...updatedDrafts[action.index],
        content: action.content,
      };
      return { ...state, drafts: updatedDrafts };
    case actionTypes.EDIT_DRAFT:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index
            ? { ...draft, name: state.editedDraftName }
            : draft
        ),
      };
    case actionTypes.UPDATE_DRAFT_NAME:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index
            ? { ...draft, name: action.name, isEditing: false }
            : draft
        ),
      };
    case actionTypes.DELETE_DRAFT:
      return {
        ...state,
        drafts: state.drafts.filter((_, idx) => idx !== action.index),
      };

    case actionTypes.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case actionTypes.TOGGLE_IS_EDITING:
      return { ...state, isEditing: !state.isEditing };
    case actionTypes.TOGGLE_ADD_DRAFT_DIALOG:
      return { ...state, dialogOpen: !state.dialogOpen };
    case actionTypes.TOGGLE_SNACKBAR:
      return { ...state, openSnackbar: !state.openSnackbar };
    case actionTypes.TOGGLE_LOGIN_DIALOG:
      return { ...state, loginDialogOpen: !state.loginDialogOpen };
    case actionTypes.TOGGLE_AUTHENTICATION:
      return { ...state, isAuthenticated: !state.isAuthenticated };
    case actionTypes.TOGGLE_DRAFTS_BAR:
      return { ...state, draftsBarVisible: !state.draftsBarVisible };
    case actionTypes.TOGGLE_VIEW_DRAFTS_DIALOG:
      return { ...state, viewDraftsDialogOpen: !state.viewDraftsDialogOpen };
    case actionTypes.TOGGLE_PROFILE_DIALOG:
      return { ...state, profileDialogOpen: !state.profileDialogOpen };

    case actionTypes.SAVE_DRAFT:
      return { ...state, drafts: [...state.drafts, action.draft] };
    case actionTypes.UPDATE_DRAFT:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index ? { ...draft, ...action.draft } : draft
        ),
      };
    case actionTypes.REMOVE_DRAFT:
      return {
        ...state,
        drafts: state.drafts.filter((draft) => draft._id !== action.draftId),
      };
    default:
      return state;
  }
};

const useDraftsReducer = () => {
  return useReducer(reducer, initialState);
};

export { useDraftsReducer, actionTypes };
