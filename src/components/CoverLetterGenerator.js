import React, { useReducer, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, Container, Snackbar } from '@mui/material';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import DraftTabs from './DraftTabs';
import AddDraftDialog from './AddDraftDialog';
import CoverLetterForm from './CoverLetterForm';
import AuthDialog from './AuthDialog';
import axios from 'axios';

const initialState = {
  drafts: [], // Each draft should have `name`, `content`, and `isEditing` properties
  selectedDraft: 0,
  openSnackbar: false,
  dialogOpen: false,
  loading: false,
  isAuthenticated: false,
  loginDialogOpen: false,
  isEditing: false,
  newDraftName: '',
  editedDraftName: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };

    // === DRAFT SELECTORS ===
    case 'SET_SELECTED_DRAFT':
      return { ...state, selectedDraft: action.value };

    // === DRAFT ACTIONS ===
    case 'SET_DRAFTS':
      return {
        ...state,
        drafts: action.drafts,
        editorState: action.editorState,
      };
    case 'ADD_DRAFT': // INPUT PARAMS: draft
      return { ...state, drafts: [...state.drafts, action.draft] };
    case 'UPDATE_DRAFT_CONTENT':
      // eslint-disable-next-line no-case-declarations
      const updatedDrafts = [...state.drafts];
      updatedDrafts[action.index] = {
        ...updatedDrafts[action.index],
        content: action.content,
      };
      return { ...state, drafts: updatedDrafts };
    case 'EDIT_DRAFT':
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index
            ? { ...draft, name: state.editedDraftName }
            : draft
        ),
      };
    case 'UPDATE_DRAFT_NAME':
      return {
        ...state,
        drafts: state.drafts.map((draft, idx) =>
          idx === action.index
            ? { ...draft, name: action.name, isEditing: false }
            : draft
        ),
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        drafts: state.drafts.filter((_, idx) => idx !== action.index),
      };

    // === DRAFT ACTIONS II ===
    case 'SET_NEW_DRAFT_NAME':
      return { ...state, newDraftName: action.value };
    case 'SET_EDITED_DRAFT_NAME':
      return { ...state, editedDraftName: action.value };

    // === UI ACTIONS ===
    case 'TOGGLE_LOADING':
      return { ...state, loading: !state.loading }; // Toggle loading state
    case 'TOGGLE_IS_EDITING':
      return { ...state, isEditing: !state.isEditing }; // Toggle editing state

    // === UI ACTIONS II ===
    case 'TOGGLE_ADD_DRAFT_DIALOG':
      return { ...state, dialogOpen: !state.dialogOpen };
    case 'TOGGLE_SNACKBAR':
      return { ...state, openSnackbar: !state.openSnackbar };
    case 'TOGGLE_LOGIN_DIALOG':
      return { ...state, loginDialogOpen: !state.loginDialogOpen };

    // === AUTH ACTIONS ===
    case 'TOGGLE_AUTHENTICATION':
      return { ...state, isAuthenticated: !state.isAuthenticated };
    default:
      return state;
  }
}

function CoverLetterGenerator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    drafts,
    selectedDraft,
    openSnackbar,
    dialogOpen,
    loading,
    isAuthenticated,
    loginDialogOpen,
    newDraftName,
    editedDraftName,
    isEditing,
  } = state;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    // Load drafts from local storage
    const savedDrafts = localStorage.getItem('coverLetterDrafts');
    if (savedDrafts) {
      const drafts = JSON.parse(savedDrafts).map((draft) => ({
        ...draft,
        content: EditorState.createWithContent(convertFromRaw(draft.content)),
      }));
      dispatch({ type: 'SET_DRAFTS', drafts });
    }
  }, []);

  useEffect(() => {
    // Update editor state when selected draft changes
    const currentDraft = state.drafts[state.selectedDraft];
    if (currentDraft) {
      setEditorState(currentDraft.content);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [state.drafts, state.selectedDraft]);
  useEffect(() => {
    const rawDrafts = drafts.map((draft) => ({
      ...draft,
      content: JSON.stringify(convertToRaw(draft.content.getCurrentContent())),
    }));
    localStorage.setItem('coverLetterDrafts', JSON.stringify(rawDrafts));
  }, [drafts]);

  useEffect(() => {
    // Periodically check if the user token is still valid
    const intervalId = setInterval(async () => {
      if (localStorage.getItem('userToken')) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/validate-token`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          if (response.status !== 200) {
            throw new Error('Token validation failed');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          logoutUser(); // Log out user if token is invalid
        }
      }
    }, 600000); // Check every 10 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [isAuthenticated]);

  const logoutUser = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      localStorage.removeItem('coverLetterDrafts');
      localStorage.clear();
      dispatch({ type: 'TOGGLE_AUTHENTICATION', isAuthenticated: false });
      alert('Your session has expired. Please log in again.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleAddDraft = () => {
    console.log('DRAFTS:', drafts);
    const newDraft = {
      name: newDraftName || `Draft ${drafts.length + 1}`,
      content: EditorState.createEmpty(),
    };
    dispatch({ type: 'ADD_DRAFT', draft: newDraft });
    dispatch({ type: 'SELECT_DRAFT', index: drafts.length });
    dispatch({ type: 'SET_FIELD', field: 'newDraftName', value: '' });
    dispatch({ type: 'TOGGLE_ADD_DRAFT_DIALOG' });
  };

  const handleSaveDraft = async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'TOGGLE_LOGIN_DIALOG' });
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
      dispatch({
        type: 'UPDATE_DRAFT_CONTENT',
        index: state.selectedDraft,
        content: editorState,
      });
      dispatch({ type: 'TOGGLE_SNACKBAR' });
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      dispatch({ type: 'TOGGLE_LOADING' });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
          Cover Letter Generator
        </Typography>
        <DraftTabs
          drafts={drafts}
          selectedDraft={selectedDraft}
          isEditing={isEditing}
          editedDraftName={editedDraftName}
          setEditedDraftName={(name) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'editedDraftName',
              value: name,
            })
          }
          onTabChange={(event, newValue) => {
            dispatch({
              type: 'SET_FIELD',
              field: 'selectedDraft',
              value: newValue,
            });
          }}
          onEditDraftName={(index) => {
            dispatch({ type: 'TOGGLE_IS_EDITING' });
            dispatch({
              type: 'SET_FIELD',
              field: 'editedDraftName',
              value: drafts[index].name,
            });
            dispatch({
              type: 'SET_FIELD',
              field: 'selectedDraft',
              value: index,
            });
          }}
          onSaveDraftName={(index, name) => {
            dispatch({
              type: 'UPDATE_DRAFT_NAME',
              index,
              name,
            });

            dispatch({ type: 'TOGGLE_IS_EDITING' });
          }}
          onDeleteDraft={(index) => {
            dispatch({
              type: 'DELETE_DRAFT',
              index,
            });
            dispatch({
              type: 'SET_FIELD',
              field: 'selectedDraft',
              value: 0,
            });
          }}
          onOpenAddDialog={() => {
            dispatch({ type: 'TOGGLE_ADD_DRAFT_DIALOG' });
          }}
        />
        <AddDraftDialog
          open={dialogOpen}
          onClose={() => {
            dispatch({
              type: 'SET_FIELD',
              field: 'dialogOpen',
              value: false,
            });
          }}
          draftName={newDraftName}
          setDraftName={(name) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'newDraftName',
              value: name,
            })
          }
          onCancel={() => {
            dispatch({
              type: 'SET_FIELD',
              field: 'dialogOpen',
              value: false,
            });
          }}
          onSubmit={handleAddDraft}
        />
        <CoverLetterForm
          editorState={editorState}
          setEditorState={setEditorState}
          isAuthenticated={isAuthenticated}
          selectedDraft={selectedDraft}
          isEditing={isEditing}
          dispatch={dispatch}
          drafts={drafts}
          handleSaveDraft={handleSaveDraft}
          loading={loading}
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
          onLoginSuccess={(token, userData) => {
            localStorage.setItem('userToken', token);
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({
              type: 'SET_FIELD',
              field: 'isAuthenticated',
              value: true,
            });
            dispatch({ type: 'TOGGLE_LOGIN_DIALOG' });
          }}
          apiUrl={process.env.REACT_APP_API_URL}
        />
      </Box>
    </Container>
  );
}

export default CoverLetterGenerator;
