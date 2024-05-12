import React, { useReducer, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, Container, Snackbar } from '@mui/material';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import DraftTabs from './DraftTabs';
import AddDraftDialog from './AddDraftDialog';
import CoverLetterForm from './CoverLetterForm';
import AuthDialog from './AuthDialog';
import axios from 'axios';

const initialState = {
  editorState: EditorState.createEmpty(),
  drafts: [],
  selectedDraft: 0,
  openSnackbar: false,
  dialogOpen: false,
  loading: false,
  isAuthenticated: false,
  loginDialogOpen: false,
  newDraftName: '',
  editedDraftName: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_DRAFTS':
      return {
        ...state,
        drafts: action.drafts,
        editorState: action.editorState,
      };
    case 'UPDATE_DRAFT':
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index
            ? { ...draft, name: state.editedDraftName }
            : draft
        ),
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        drafts: state.drafts.filter((_, idx) => idx !== action.index),
      };
    case 'SET_OPEN_SNACKBAR':
      return { ...state, openSnackbar: action.value };
    case 'SET_OPEN_DIALOG':
      return { ...state, dialogOpen: action.value };
    case 'TOGGLE_LOADING':
      return { ...state, loading: !state.loading }; // Toggle loading state
    case 'SET_SELECTED_DRAFT':
      return { ...state, selectedDraft: action.value };
    case 'SET_LOGIN_DIALOG_OPEN':
      return { ...state, loginDialogOpen: action.value };
    case 'SET_NEW_DRAFT_NAME':
      return { ...state, newDraftName: action.value };
    case 'SET_EDITED_DRAFT_NAME':
      return { ...state, editedDraftName: action.value };
    default:
      return state;
  }
}

function CoverLetterGenerator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    editorState,
    drafts,
    selectedDraft,
    openSnackbar,
    dialogOpen,
    loading,
    isAuthenticated,
    loginDialogOpen,
    newDraftName,
    editedDraftName,
  } = state;

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      dispatch({ type: 'SET_FIELD', field: 'isAuthenticated', value: true });
      startTokenValidationTimer();
    }
    return () => clearInterval(tokenValidationTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const savedDrafts = localStorage.getItem('coverLetterDrafts');
    if (savedDrafts) {
      try {
        const parsedDrafts = JSON.parse(savedDrafts).map((draft) => ({
          ...draft,
          content: EditorState.createWithContent(convertFromRaw(draft.content)),
        }));
        dispatch({
          type: 'SET_DRAFTS',
          drafts: parsedDrafts,
          editorState:
            parsedDrafts[selectedDraft]?.content || EditorState.createEmpty(),
        });
      } catch (error) {
        console.error('Failed to load drafts:', error);
        dispatch({ type: 'SET_FIELD', field: 'drafts', value: [] });
      }
    }
  }, [selectedDraft]);

  let tokenValidationTimer;
  const startTokenValidationTimer = () => {
    tokenValidationTimer = setInterval(async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/validate-token`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );
        if (response.status !== 200) throw new Error('Token validation failed');
      } catch (error) {
        console.error('Token is invalid:', error);
        logoutUser();
      }
    }, 600000);
  };
  const handleAddDraft = () => {
    const newDraft = {
      name: newDraftName || `Draft ${drafts.length + 1}`,
      content: EditorState.createEmpty(),
    };
    const updatedDrafts = [...drafts, newDraft];

    dispatch({
      type: 'SET_DRAFTS',
      drafts: updatedDrafts,
      editorState: newDraft.content,
    });
    dispatch({
      type: 'SET_SELECTED_DRAFT',
      value: updatedDrafts.length - 1,
    });
    dispatch({ type: 'SET_FIELD', field: 'newDraftName', value: '' });
    dispatch({ type: 'SET_OPEN_DIALOG', value: false });
  };
  const handleSaveDraft = async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'SET_LOGIN_DIALOG_OPEN', value: true });
      return;
    }
    dispatch({ type: 'TOGGLE_LOADING' });
    const content = convertToRaw(editorState.getCurrentContent());
    const contentName = drafts[selectedDraft].name;
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cover-letter/save-draft`,
        { content, contentName, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log('Draft saved:', response.data);
      dispatch({ type: 'SET_OPEN_SNACKBAR', value: true });
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      dispatch({ type: 'TOGGLE_LOADING' });
    }
  };

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'SET_FIELD', field: 'isAuthenticated', value: true });
    dispatch({ type: 'SET_FIELD', field: 'loginDialogOpen', value: false });
  };

  const logoutUser = () => {
    localStorage.removeItem('userToken');
    dispatch({ type: 'SET_FIELD', field: 'isAuthenticated', value: false });
    alert('Your session has expired. Please login again.');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
          Cover Letter Generator
        </Typography>
        <DraftTabs {...{ drafts, selectedDraft, editedDraftName, dispatch }} />
        <AddDraftDialog
          {...{
            dispatch,
            open: dialogOpen,
            onClose: () =>
              dispatch({
                type: 'SET_FIELD',
                field: 'dialogOpen',
                value: false,
              }),
            onSubmit: handleAddDraft,
            draftName: newDraftName,
            setDraftName: (name) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'newDraftName',
                value: name,
              }),
          }}
        />
        <CoverLetterForm
          {...{
            editorState,
            selectedDraft,
            loading,
            dispatch,
            drafts,
            handleSaveDraft,
          }}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() =>
            dispatch({ type: 'SET_FIELD', field: 'openSnackbar', value: false })
          }
          message="Cover letter generated"
        />
        <AuthDialog
          open={loginDialogOpen}
          onClose={() =>
            dispatch({
              type: 'SET_FIELD',
              field: 'loginDialogOpen',
              value: false,
            })
          }
          onLoginSuccess={handleLoginSuccess}
          apiUrl={process.env.REACT_APP_API_URL}
        />
      </Box>
    </Container>
  );
}

export default CoverLetterGenerator;
