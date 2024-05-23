/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
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
  Grid,
  Card,
  AppBar,
  Toolbar,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import DraftTabs from './DraftTabs';
import CoverLetterForm from './CoverLetterForm';
import AuthDialog from './AuthDialog';

import useRouter from 'hooks/useRouter';
import useMode from 'hooks/useMode';
import { actionTypes, useDraftsReducer } from 'hooks/useDraftReducer';
import useDraft from 'hooks/useDraft';

import constants from 'config/constants';
import RCButton from './themed/RCButton';
import { deleteDraft } from 'api';
import { LeftSection, RightSection, StyledIconButton } from './styled';
import RCTypography from './themed/RCTypography';
import RCBox from './themed/RCBox';

const { API_URL } = constants;
function Generator(props) {
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
    formDisabled,
    anchorElUser,
    draftsBarVisible,
    viewDraftsDialogOpen,
    profileDialogOpen,
  } = state;
  const { loadDraftsFromLocalStorage, saveDraftsToLocalStorage } = useDraft();
  const { navigate } = useRouter();
  const { theme } = useMode();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDispatch = useCallback(
    (type, field, value) => {
      dispatch({ type, field, value });
    },
    [dispatch]
  );
  const toggleDialog = useCallback(
    (type) => {
      dispatch({ type });
    },
    [dispatch]
  );
  const handleAddDraft = useCallback(() => {
    const newDraft = {
      name: newDraftName || `Draft ${drafts?.length + 1}`,
      pdfText: '',
      pdfUrl: '',
      rawInputValues: {},
      content: {
        name: newDraftName || `Draft ${drafts?.length + 1}`,
        pdf: '',
        html: '',
        text: '',
        blocks: '',
      },
      resSuccess: false,
      resError: false,
      resMessage: '',
    };
    dispatch({ type: actionTypes.ADD_DRAFT, draft: newDraft });
    handleDispatch(
      actionTypes.SET_SELECTED_DRAFT,
      'selectedDraft',
      drafts?.length
    );
    handleDispatch(actionTypes.SET_FIELD, 'newDraftName', '');
    toggleDialog(actionTypes.TOGGLE_ADD_DRAFT_DIALOG);
    handleDispatch(actionTypes.SET_FIELD, 'formDisabled', false);
  }, [dispatch, drafts?.length, newDraftName, handleDispatch, toggleDialog]);
  const handleDeleteDraft = useCallback(
    async (draftId) => {
      try {
        await deleteDraft(draftId);
        dispatch({ type: actionTypes.REMOVE_DRAFT, draftId });
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    loadDraftsFromLocalStorage(dispatch);
  }, [dispatch]);

  useEffect(() => {
    saveDraftsToLocalStorage(drafts);
  }, [drafts]);
  useEffect(() => {
    if (formDisabled && !isAuthenticated) {
      handleDispatch(actionTypes.SET_FIELD, 'loginDialogOpen', true);
    }
  }, [formDisabled, isAuthenticated, handleDispatch]);

  return (
    <Card>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mt: 4 }}>
          <Paper component={Grid} container>
            <Box component={Grid} item xs={draftsBarVisible ? 10 : 12}>
              {/* ================ NAVIGATION ================ */}
              <AppBar position="static">
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    {/* === TOOLBAR/BACK BUTTON === */}
                    <Tooltip title="Back to Menu">
                      <StyledIconButton
                        onClick={() => navigate('/')}
                        aria-label="Back to Menu"
                        theme={theme}
                      >
                        <Avatar>
                          <ArrowBackIcon
                            color={theme.palette.text.colorPrimary}
                          />
                        </Avatar>
                      </StyledIconButton>
                    </Tooltip>
                    <Card
                      sx={{
                        overflow: 'visible',
                        '&.MuiDialog-paper': {
                          boxShadow: 'none',
                          overflow: 'visible',
                          '& .MuiDialogActions-root': {
                            padding: 0,
                            overflow: 'visible !important',
                          },
                        },
                      }}
                    >
                      <RCBox
                        // borderRadius="lg"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: theme.spacing(2),
                          p: theme.spacing(1),
                        }}
                      >
                        <RCTypography
                          variant="h1"
                          color="text"
                          sx={({ breakpoints, typography: { size } }) => ({
                            my: theme.spacing(1),
                            py: theme.spacing(1),
                            fontFamily: 'Roboto',
                            [breakpoints.down('md')]: {
                              fontSize: size['3xl'],
                            },
                          })}
                        >
                          Cover Letter Generator
                        </RCTypography>
                      </RCBox>
                    </Card>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* === TOOLBAR/USER SETTINGS === */}
                    <Tooltip title="User settings">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="body1"
                          sx={{
                            marginRight: theme.spacing(1),
                          }}
                        >
                          {user?.username || 'Username'}
                        </Typography>
                        <StyledIconButton
                          onClick={(event) =>
                            handleDispatch(
                              actionTypes.SET_FIELD,
                              'anchorElUser',
                              event.currentTarget
                            )
                          }
                          theme={theme}
                        >
                          <Avatar alt="User Profile" />
                        </StyledIconButton>
                        <Menu
                          sx={{
                            mt: '45px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            flexDirection: 'row',
                          }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={() =>
                            handleDispatch(
                              actionTypes.SET_FIELD,
                              'anchorElUser',
                              null
                            )
                          }
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <LeftSection theme={theme}>
                              <Avatar
                                alt="User Profile"
                                src={user?.avatarUrl}
                                sx={{
                                  width: 100,
                                  height: 100,
                                  marginBottom: theme.spacing(2),
                                }}
                              />
                              <RCButton
                                theme={theme}
                                variant="contained"
                                color="error"
                                startIcon={<LogoutIcon />}
                                onClick={() => {
                                  handleDispatch(actionTypes.LOGOUT);
                                  handleDispatch(
                                    actionTypes.SET_FIELD,
                                    'anchorElUser',
                                    null
                                  );
                                }}
                              >
                                Logout
                              </RCButton>
                            </LeftSection>
                            <RightSection theme={theme}>
                              <MenuItem
                                onClick={() => {
                                  toggleDialog(
                                    actionTypes.TOGGLE_PROFILE_DIALOG
                                  );
                                  handleDispatch(
                                    actionTypes.SET_FIELD,
                                    'anchorElUser',
                                    null
                                  );
                                }}
                              >
                                <PersonIcon sx={{ marginRight: 1 }} />

                                <Typography textAlign="center">
                                  Profile
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  toggleDialog(
                                    actionTypes.TOGGLE_VIEW_DRAFTS_DIALOG
                                  );
                                  handleDispatch(
                                    actionTypes.SET_FIELD,
                                    'anchorElUser',
                                    null
                                  );
                                }}
                              >
                                <EditNoteIcon sx={{ marginRight: 1 }} />

                                <Typography textAlign="center">
                                  View Drafts
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleDispatch(
                                    actionTypes.SET_FIELD,
                                    'anchorElUser',
                                    null
                                  )
                                }
                              >
                                <SettingsIcon sx={{ marginRight: 1 }} />
                                <Typography textAlign="center">
                                  Settings
                                </Typography>
                              </MenuItem>
                            </RightSection>
                          </Box>
                        </Menu>
                        {/* <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={() =>
                            handleDispatch(
                              actionTypes.SET_FIELD,
                              'anchorElUser',
                              null
                            )
                          }
                        >
                          <MenuItem
                            onClick={() => {
                              toggleDialog(actionTypes.TOGGLE_PROFILE_DIALOG);
                              handleDispatch(
                                actionTypes.SET_FIELD,
                                'anchorElUser',
                                null
                              );
                            }}
                          >
                            <Typography textAlign="center">Profile</Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              toggleDialog(
                                actionTypes.TOGGLE_VIEW_DRAFTS_DIALOG
                              );
                              handleDispatch(
                                actionTypes.SET_FIELD,
                                'anchorElUser',
                                null
                              );
                            }}
                          >
                            <Typography textAlign="center">
                              View Drafts
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleDispatch(
                                actionTypes.SET_FIELD,
                                'anchorElUser',
                                null
                              )
                            }
                          >
                            <Typography textAlign="center">Settings</Typography>
                          </MenuItem>
                        </Menu> */}
                      </Box>
                    </Tooltip>
                    {/* === TOOLBAR/MENU BUTTON === */}
                    <Tooltip title="Open menu">
                      <StyledIconButton
                        onClick={() =>
                          toggleDialog(actionTypes.TOGGLE_DRAFTS_BAR)
                        }
                        aria-label="Toggle Drafts Bar"
                        theme={theme}
                      >
                        <Avatar>
                          <MenuIcon color={theme.palette.text.colorPrimary} />
                        </Avatar>
                      </StyledIconButton>
                    </Tooltip>
                  </Toolbar>
                </Container>
              </AppBar>
              {/* ================ COVER LETTER FORM ================ */}
              <CoverLetterForm
                selectedDraft={selectedDraft}
                isAuthenticated={isAuthenticated}
                actionTypes={actionTypes}
                drafts={drafts}
                loading={loading}
                dispatch={dispatch}
                formDisabled={formDisabled}
                handleDeleteDraft={handleDeleteDraft}
              />
            </Box>
            {/* ================ TABS DISPLAYED FOR DRAFTS ================ */}
            {draftsBarVisible && (
              <Box component={Grid} item xs={2}>
                <DraftTabs
                  drafts={drafts}
                  selectedDraft={selectedDraft}
                  isEditing={isEditing}
                  editedDraftName={editedDraftName}
                  setEditedDraftName={(name) =>
                    handleDispatch(
                      actionTypes.SET_FIELD,
                      'editedDraftName',
                      name
                    )
                  }
                  onTabChange={(event, newValue) =>
                    handleDispatch(
                      actionTypes.SET_SELECTED_DRAFT,
                      'selectedDraft',
                      newValue
                    )
                  }
                  onEditDraftName={(index) => {
                    toggleDialog(actionTypes.TOGGLE_IS_EDITING);
                    handleDispatch(
                      actionTypes.SET_FIELD,
                      'editedDraftName',
                      drafts[index].name
                    );
                    handleDispatch(
                      actionTypes.SET_SELECTED_DRAFT,
                      'selectedDraft',
                      index
                    );
                  }}
                  onSaveDraftName={(index, name) => {
                    dispatch({
                      type: actionTypes.UPDATE_DRAFT_NAME,
                      index,
                      name,
                    });
                    toggleDialog(actionTypes.TOGGLE_IS_EDITING);
                  }}
                  onDeleteDraft={(index) => {
                    dispatch({ type: actionTypes.DELETE_DRAFT, index });
                    handleDispatch(
                      actionTypes.SET_SELECTED_DRAFT,
                      'selectedDraft',
                      0
                    );
                  }}
                  onOpenAddDialog={() =>
                    toggleDialog(actionTypes.TOGGLE_ADD_DRAFT_DIALOG)
                  }
                />
              </Box>
            )}
          </Paper>
        </Box>
        {/* ================ ADD DIALOG ================ */}
        {dialogOpen && (
          <Dialog
            open={dialogOpen}
            onClose={() =>
              handleDispatch(actionTypes.SET_FIELD, 'dialogOpen', false)
            }
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
                  handleDispatch(
                    actionTypes.SET_FIELD,
                    'newDraftName',
                    e.target.value
                  )
                }
                onKeyDown={(e) => e.key === 'Enter' && handleAddDraft()}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  handleDispatch(actionTypes.SET_FIELD, 'dialogOpen', false)
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
        )}
        {/* ================ AUTH DIALOG ================ */}
        {loginDialogOpen && (
          <AuthDialog
            open={loginDialogOpen}
            onClose={() =>
              handleDispatch(actionTypes.SET_FIELD, 'loginDialogOpen', false)
            }
            onLoginSuccess={(token, userData) => {
              localStorage.setItem('userToken', token);
              localStorage.setItem('user', JSON.stringify(userData));
              handleDispatch(actionTypes.SET_FIELD, 'isAuthenticated', true);
              toggleDialog(actionTypes.TOGGLE_LOGIN_DIALOG);
            }}
            apiUrl={API_URL}
          />
        )}
        {/* ================ VIEW DRAFTS DIALOG ================ */}
        {user && viewDraftsDialogOpen && (
          <Dialog
            open={viewDraftsDialogOpen}
            onClose={() =>
              handleDispatch(
                actionTypes.SET_FIELD,
                'viewDraftsDialogOpen',
                false
              )
            }
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>View Drafts</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Text</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.coverLetters?.map((draft, index) => (
                      <TableRow key={index}>
                        <TableCell color="primary">
                          {draft.content.name}
                        </TableCell>
                        <TableCell color="primary">
                          {draft.content.text}
                        </TableCell>
                        <TableCell color="primary">
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              gap: 1,
                              width: '100%',
                            }}
                          >
                            <RCButton
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                handleDispatch(
                                  actionTypes.SET_SELECTED_DRAFT,
                                  'selectedDraft',
                                  index
                                );
                                toggleDialog(
                                  actionTypes.TOGGLE_VIEW_DRAFTS_DIALOG
                                );
                              }}
                            >
                              View
                            </RCButton>
                            <RCButton
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                dispatch({
                                  type: actionTypes.REMOVE_DRAFT,
                                  index,
                                })
                              }
                            >
                              Delete
                            </RCButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  handleDispatch(
                    actionTypes.SET_FIELD,
                    'viewDraftsDialogOpen',
                    false
                  )
                }
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {/* ================ PROFILE DIALOG ================ */}
        {profileDialogOpen && (
          <Dialog
            open={profileDialogOpen}
            onClose={() => toggleDialog(actionTypes.TOGGLE_PROFILE_DIALOG)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Username"
                  value={user?.username || ''}
                  variant="outlined"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Email"
                  value={user?.email || ''}
                  variant="outlined"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Full Name"
                  value={user?.fullName || ''}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => toggleDialog(actionTypes.TOGGLE_PROFILE_DIALOG)}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {/* ================ SNACKBAR NOTIFICATIONS ================ */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() =>
            handleDispatch(actionTypes.SET_FIELD, 'openSnackbar', false)
          }
          message="Cover letter generated"
        />
      </Paper>
    </Card>
  );
}

export default Generator;
