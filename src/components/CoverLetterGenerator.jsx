/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import {
  Box,
  Typography,
  Container,
  Snackbar,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxIcon from '@mui/icons-material/AddBox';

import DashboardBox from './common/DashboardBox';

import DraftTabs from './DraftTabs';
import CoverLetterForm from './CoverLetterForm';
import AuthDialog from './AuthDialog';
import useRouter from 'hooks/useRouter';
import useMode from 'hooks/useMode';
import { actionTypes, useDraftsReducer } from 'hooks/useDraftReducer';
import useDraft from 'hooks/useDraft';

function CoverLetterGenerator() {
  const [state, dispatch] = useDraftsReducer();
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
  const [formDisabled, setFormDisabled] = useState(true);
  const { loadDraftsFromLocalStorage, saveDraftsToLocalStorage } = useDraft();
  const { navigate } = useRouter();
  const { theme } = useMode();
  // TODO: ADD UI FOR: const { handleLogout } = useAuth(isAuthenticated, dispatch);

  useEffect(() => {
    loadDraftsFromLocalStorage(dispatch);
  }, [dispatch]);

  useEffect(() => {
    saveDraftsToLocalStorage(drafts);
  }, [drafts]);

  const handleAddDraft = () => {
    const newDraft = {
      name: newDraftName || `Draft ${drafts?.length + 1}`,
      pdfText: '', // Raw HTML content
      pdfUrl: '', // PDF URL
      rawInputValues: {}, // Raw input values
      // FIELDS FOR SERVER RESPONSE
      resSuccess: false,
      resError: false,
      resMessage: '',
      resText: '',
      resPdfUrl: '',
      resHtml: '',
      resBlocks: '',
    };
    dispatch({ type: actionTypes.ADD_DRAFT, draft: newDraft });
    dispatch({ type: actionTypes.SET_SELECTED_DRAFT, value: drafts?.length });
    dispatch({ type: actionTypes.SET_FIELD, field: 'newDraftName', value: '' });
    dispatch({ type: actionTypes.TOGGLE_ADD_DRAFT_DIALOG });
    setFormDisabled(false); // Enable the form after adding a new draft
  };
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mt: 4 }}>
          {/* ================ NAVIGATION ================ */}
          <DashboardBox
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: theme.spacing(2),
              width: '100%',
            }}
          >
            <IconButton
              onClick={() => navigate('/')}
              aria-label="Back to Collections"
              sx={{
                marginLeft: theme.spacing(0.5),
                border: `2px solid ${theme.palette.background.default}`,
                '&:hover': {
                  color: theme.palette.dark.main,
                  backgroundColor: theme.palette.background.hover,
                },
              }}
            >
              <ArrowBackIcon color={theme.palette.text.colorPrimary} />
            </IconButton>
            <Typography variant="h3" sx={{ color: 'text.contrastText' }}>
              Cover Letter Generator
            </Typography>
            <DraftTabs
              drafts={drafts}
              selectedDraft={selectedDraft}
              isEditing={isEditing}
              editedDraftName={editedDraftName}
              setEditedDraftName={(name) =>
                dispatch({
                  type: actionTypes.SET_FIELD,
                  field: 'editedDraftName',
                  value: name,
                })
              }
              onTabChange={(event, newValue) => {
                dispatch({
                  type: actionTypes.SET_SELECTED_DRAFT,
                  value: newValue,
                });
              }}
              onEditDraftName={(index) => {
                dispatch({ type: actionTypes.TOGGLE_IS_EDITING });
                dispatch({
                  type: actionTypes.SET_FIELD,
                  field: 'editedDraftName',
                  value: drafts[index].name,
                });
                dispatch({
                  type: actionTypes.SET_SELECTED_DRAFT,
                  value: index,
                });
              }}
              onSaveDraftName={(index, name) => {
                dispatch({
                  type: actionTypes.UPDATE_DRAFT_NAME,
                  index,
                  name,
                });
                dispatch({ type: actionTypes.TOGGLE_IS_EDITING });
              }}
              onDeleteDraft={(index) => {
                dispatch({
                  type: actionTypes.DELETE_DRAFT,
                  index,
                });
                dispatch({
                  type: actionTypes.SET_SELECTED_DRAFT,
                  value: 0,
                });
              }}
              onOpenAddDialog={() => {
                dispatch({ type: actionTypes.TOGGLE_ADD_DRAFT_DIALOG });
              }}
            />
          </DashboardBox>
          {/* ================ NAVIGATION ================ */}

          {/* ================ ADD DIALOG ================ */}
          <Dialog
            open={dialogOpen}
            onClose={() => {
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'dialogOpen',
                value: false,
              });
            }}
          >
            <DialogTitle>Add a New Draft</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Draft Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newDraftName}
                onChange={(e) =>
                  dispatch({
                    type: actionTypes.SET_FIELD,
                    field: 'newDraftName',
                    value: e.target.value,
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && handleAddDraft()}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  dispatch({
                    type: actionTypes.SET_FIELD,
                    field: 'dialogOpen',
                    value: false,
                  })
                }
                startIcon={<CancelIcon />}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddDraft}
                startIcon={<AddBoxIcon />}
                variant="outlined"
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
          {/* ================ ADD DIALOG ================ */}
          {/* <AddDraftDialog
            open={dialogOpen}
            onClose={() => {
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'dialogOpen',
                value: false,
              });
            }}
            draftName={newDraftName}
            setDraftName={(name) =>
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'newDraftName',
                value: name,
              })
            }
            onCancel={() => {
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'dialogOpen',
                value: false,
              });
            }}
            onSubmit={handleAddDraft}
          /> */}
          {/* ================ MAIN CONTENT(LEFT) ================ */}
          <CoverLetterForm
            selectedDraft={selectedDraft}
            isAuthenticated={isAuthenticated}
            actionTypes={actionTypes}
            drafts={drafts}
            loading={loading}
            dispatch={dispatch}
            formDisabled={formDisabled}
          />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() =>
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'openSnackbar',
                value: false,
              })
            }
            message="Cover letter generated"
          />
          <AuthDialog
            open={loginDialogOpen}
            onClose={() =>
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'loginDialogOpen',
                value: false,
              })
            }
            onLoginSuccess={(token, userData) => {
              localStorage.setItem('userToken', token);
              localStorage.setItem('user', JSON.stringify(userData));
              dispatch({
                type: actionTypes.SET_FIELD,
                field: 'isAuthenticated',
                value: true,
              });
              dispatch({ type: actionTypes.TOGGLE_LOGIN_DIALOG });
            }}
            apiUrl={process.env.REACT_APP_API_URL}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default CoverLetterGenerator;
