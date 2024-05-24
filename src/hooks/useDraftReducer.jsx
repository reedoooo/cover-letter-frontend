// useDraftsReducer.js
import { useReducer } from 'react';

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

const actionTypes = {
  SET_FIELD: 'SET_FIELD',
  SET_SELECTED_DRAFT_INDEX: 'SET_SELECTED_DRAFT_INDEX',
  SET_DRAFTS: 'SET_DRAFTS',

  ADD_DRAFT: 'ADD_DRAFT',
  UPDATE_DRAFT_CONTENT: 'UPDATE_DRAFT_CONTENT',
  EDIT_DRAFT: 'EDIT_DRAFT',
  UPDATE_DRAFT_NAME: 'UPDATE_DRAFT_NAME',
  DELETE_DRAFT: 'DELETE_DRAFT',

  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_IS_EDITING: 'TOGGLE_IS_EDITING',
  TOGGLE_AUTHENTICATION: 'TOGGLE_AUTHENTICATION',
  TOGGLE_DRAFTS_BAR: 'TOGGLE_DRAFTS_BAR',

  TOGGLE_DIALOG_STATE: 'TOGGLE_DIALOG_STATE',
  TOGGLE_INIT_ADD_CONTENT_VISIBLE: 'TOGGLE_INIT_ADD_CONTENT_VISIBLE',
  SAVE_DRAFT: 'SAVE_DRAFT',
  UPDATE_DRAFT: 'UPDATE_DRAFT',
  REMOVE_DRAFT: 'REMOVE_DRAFT',

  SET_LINKEDIN_URL: 'SET_LINKEDIN_URL',
  SET_RES_FORMAT: 'SET_RES_FORMAT',
  SET_RES_TEXT: 'SET_RES_TEXT',
  SET_FORM_VALUES: 'SET_FORM_VALUES',
  SET_GENERATED_PDF_URL: 'SET_GENERATED_PDF_URL',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return { ...state, [action.field]: action.value };
    case actionTypes.SET_SELECTED_DRAFT_INDEX:
      return { ...state, selectedDraftIndex: action.value };
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
            ? { ...draft, title: state.editedDraftName }
            : draft
        ),
      };
    case actionTypes.UPDATE_DRAFT_NAME:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index
            ? { ...draft, title: action.title, isEditing: false }
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
    case actionTypes.TOGGLE_AUTHENTICATION:
      return { ...state, isAuthenticated: !state.isAuthenticated };
    case actionTypes.TOGGLE_DRAFTS_BAR:
      return { ...state, draftsBarVisible: !state.draftsBarVisible };
    // EX: dispatch({ type: actionTypes.TOGGLE_DIALOG_STATE, dialog: 'viewDraftsDialogOpen' });
    case actionTypes.TOGGLE_DIALOG_STATE:
      return {
        ...state,
        dialogState: {
          ...state.dialogState,
          [action.dialog]: !state.dialogState[action.dialog],
        },
      };
    case actionTypes.TOGGLE_INIT_ADD_CONTENT_VISIBLE:
      return {
        ...state,
        initAddContentVisible: !state.initAddContentVisible,
      };
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
    case actionTypes.SET_LINKEDIN_URL:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === state.selectedDraftIndex
            ? { ...draft, linkedInUrl: action.linkedInUrl }
            : draft
        ),
      };
    case actionTypes.SET_RES_FORMAT:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === state.selectedDraftIndex
            ? { ...draft, resFormat: action.resFormat }
            : draft
        ),
      };
    case actionTypes.SET_RES_TEXT:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === state.selectedDraftIndex
            ? { ...draft, resText: action.resText }
            : draft
        ),
      };
    case actionTypes.SET_FORM_VALUES:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === state.selectedDraftIndex
            ? { ...draft, formValues: action.formValues }
            : draft
        ),
      };
    case actionTypes.SET_GENERATED_PDF_URL:
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === state.selectedDraftIndex
            ? { ...draft, generatedPdfUrl: action.pdfUrl }
            : draft
        ),
      };
    default:
      return state;
  }
};

const useDraftsReducer = () => {
  return useReducer(reducer, initialState);
};

export { useDraftsReducer, actionTypes };
