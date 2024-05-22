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
  Drawer,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardBox from './common/DashboardBox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import DraftTabs from './DraftTabs';
import CoverLetterForm from './CoverLetterForm';
import AuthDialog from './AuthDialog';
import useRouter from 'hooks/useRouter';
import useMode from 'hooks/useMode';
import { actionTypes, useDraftsReducer } from 'hooks/useDraftReducer';
import useDraft from 'hooks/useDraft';

function CoverLetterGenerator(props) {
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
  const { loadDraftsFromLocalStorage, saveDraftsToLocalStorage } = useDraft();
  const { navigate } = useRouter();
  const { theme } = useMode();
  // TODO: ADD UI FOR: const { handleLogout } = useAuth(isAuthenticated, dispatch);

  const [formDisabled, setFormDisabled] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleSidebar = useCallback(
    () => setDrawerOpen(!drawerOpen),
    [drawerOpen]
  ); // const [logoutClicked, setLogoutClicked] = useState(false);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
      resHTML: '',
      resBlock: '',
    };
    dispatch({ type: actionTypes.ADD_DRAFT, draft: newDraft });
    dispatch({ type: actionTypes.SET_SELECTED_DRAFT, value: drafts?.length });
    dispatch({ type: actionTypes.SET_FIELD, field: 'newDraftName', value: '' });
    dispatch({ type: actionTypes.TOGGLE_ADD_DRAFT_DIALOG });
    setFormDisabled(false); // Enable the form after adding a new draft
  };
  return (
    <Card>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mt: 4 }}>
          <Paper component={Grid} container>
            <Box component={Grid} item xs={9}>
              {/* ================ NAVIGATION ================ */}
              <AppBar position="static">
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    {/* === NAV BACK BUTTON === */}
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
                      <Avatar>
                        <ArrowBackIcon
                          color={theme.palette.text.colorPrimary}
                        />
                      </Avatar>
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="body1"
                        sx={{
                          marginRight: theme.spacing(1),
                        }}
                      >
                        Username
                      </Typography>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="User Profile" />
                        </IconButton>
                      </Tooltip>
                      <Menu
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
                        onClose={handleCloseUserMenu}
                      >
                        {['Profile', 'My account', 'Settings'].map(
                          (setting) => (
                            <MenuItem
                              key={setting}
                              onClick={handleCloseUserMenu}
                            >
                              <Typography textAlign="center">
                                {setting}
                              </Typography>
                            </MenuItem>
                          )
                        )}
                      </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open menu">
                        <IconButton onClick={toggleSidebar} sx={{ p: 0 }}>
                          <MenuIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
              <Drawer
                variant="persistent"
                open={drawerOpen}
                onClose={toggleSidebar}
                sx={{
                  width: 300,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: 300,
                    transition: 'width 0.3s ease-in-out',
                    overflowX: 'hidden',
                    '&:hover': {
                      width: 50,
                    },
                  },
                }}
              >
                <DashboardBox
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: theme.spacing(2),
                    width: '100%',
                    height: '100%',
                  }}
                >
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
                </DashboardBox>{' '}
              </Drawer>
              {/* ================ COVER LETTER FORM ================ */}
              <CoverLetterForm
                selectedDraft={selectedDraft}
                isAuthenticated={isAuthenticated}
                actionTypes={actionTypes}
                drafts={drafts}
                loading={loading}
                dispatch={dispatch}
                formDisabled={formDisabled}
              />
            </Box>
            {/* ================ TABS DISPLAYED FOR DRAFTS ================ */}
            <Box component={Grid} item xs={3}>
              <DashboardBox
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: theme.spacing(2),
                  width: '100%',
                  height: '100%',
                }}
              >
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
            </Box>
          </Paper>
          {/* ================ SNACKBAR NOTIFICATIONS ================ */}
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
          {/* ================ AUTH DIALOG ================ */}
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
    </Card>
  );
}

export default CoverLetterGenerator;
