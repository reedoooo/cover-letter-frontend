/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import {
  Box,
  Typography,
  Container,
  Paper,
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
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import Slide from '@mui/material/Slide';

import useRouter from 'hooks/useRouter';
import useMode from 'hooks/useMode';
import { actionTypes, useDraftsReducer } from 'hooks/useDraftReducer';
import useDraft from 'hooks/useDraft';
import constants from 'config/constants';
import { deleteDraft } from 'api';
import useAuth from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';

import RCButton from './themed/RCButton';
import AuthDialog from './AuthDialog';
import CoverLetterForm from './CoverLetterForm';
import DraftTabs from './DraftTabs';
import { LeftSection, RightSection, StyledIconButton } from './styled';
import RCTypography from './themed/RCTypography';
import RCBox from './themed/RCBox';
import NotificationSystem from './NotificationSystem';
import DashboardBox from './common/DashboardBox';

const { API_URL } = constants;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Generator(props) {
  const [state, dispatch] = useDraftsReducer();
  const {
    drafts,
    selectedDraftIndex,
    loading,
    isAuthenticated,
    newDraftName,
    editedDraftName,
    isEditing,
    formDisabled,
    anchorElUser,
    draftsBarVisible,
    dialogState,
    initAddContentVisible,
  } = state;
  const { loadDraftsFromLocalStorage, saveDraftsToLocalStorage } = useDraft();
  const { notifications, addNotification, removeNotification } =
    useNotification();

  const { navigate } = useRouter();
  const { theme } = useMode();
  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = localStorage.getItem('userToken');
  const { handleLogout } = useAuth(isAuthenticated, dispatch);
  const handleDispatch = useCallback(
    (type, field, value) => {
      dispatch({ type, field, value });
    },
    [dispatch]
  );
  const toggleDialog = useCallback(
    (dialog) => {
      console.log('DRAFTS', drafts);
      dispatch({ type: actionTypes.TOGGLE_DIALOG_STATE, dialog });
    },
    [dispatch]
  );
  const handleAddDraft = useCallback(() => {
    const newDraft = {
      title: newDraftName || `Draft ${drafts?.length + 1}`,
      pdfText: '',
      pdfUrl: '',
      formValues: {},
      linkedInUrl: constants.DEFAULT_LINKEDIN_URL,
      content: {
        name: newDraftName || `Draft ${drafts?.length + 1}`,
        text: '',
        html: '',
        pdf: '',
        blocks: [],
        metadata: {},
      },
      resSuccess: false,
      resError: false,
      resMessage: '',
    };
    dispatch({ type: actionTypes.ADD_DRAFT, draft: newDraft });
    handleDispatch(
      actionTypes.SET_SELECTED_DRAFT_INDEX,
      'selectedDraftIndex',
      drafts?.length
    );
    localStorage.setItem('selectedDraft', JSON.stringify(newDraft));
    handleDispatch(actionTypes.SET_FIELD, 'newDraftName', '');
    toggleDialog('addDraftDialogOpen');
    handleDispatch(actionTypes.SET_FIELD, 'formDisabled', false);

    // Add notification for adding a draft
    addNotification({
      color: 'success',
      icon: 'check_circle',
      title: 'Draft Added',
      dateTime: 'Just now',
      content: 'A new draft has been successfully added.',
    });
  }, [
    dispatch,
    drafts?.length,
    newDraftName,
    handleDispatch,
    toggleDialog,
    addNotification,
  ]);

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
    if (userToken) {
      handleDispatch(actionTypes.SET_FIELD, 'isAuthenticated', true);
      handleDispatch(actionTypes.SET_FIELD, 'formDisabled', false);
    } else {
      handleDispatch(actionTypes.SET_FIELD, 'isAuthenticated', false);
      handleDispatch(actionTypes.SET_FIELD, 'formDisabled', true);
    }
  }, [handleDispatch, userToken]);
  // useEffect(() => {
  //   if (formDisabled && !userToken) {
  //     handleDispatch(actionTypes.SET_FIELD, 'loginDialogOpen', true);
  //   }
  // }, [formDisabled, userToken, handleDispatch]);

  return (
    <Card>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mt: 4 }}>
          <Paper component={Grid} container>
            <Box component={Grid} item xs={draftsBarVisible ? 10 : 12}>
              {/* ================ NAVIGATION ================ */}
              <NavBar
                navigate={navigate}
                theme={theme}
                user={user}
                handleDispatch={handleDispatch}
                UserMenu={UserMenu}
              />
              {/* ================ COVER LETTER FORM ================ */}
              <CoverLetterForm
                selectedDraftIndex={selectedDraftIndex}
                isAuthenticated={isAuthenticated}
                actionTypes={actionTypes}
                drafts={drafts}
                loading={loading}
                dispatch={dispatch}
                formDisabled={formDisabled}
                handleDeleteDraft={handleDeleteDraft}
                initAddContentVisible={initAddContentVisible}
              />
            </Box>
            {/* ================ TABS DISPLAYED FOR DRAFTS ================ */}
            {draftsBarVisible && (
              <Box component={Grid} item xs={2}>
                <DraftTabs
                  drafts={drafts}
                  selectedDraftIndex={selectedDraftIndex}
                  isEditing={isEditing}
                  editedDraftName={editedDraftName}
                  setEditedDraftName={(name) =>
                    handleDispatch(
                      actionTypes.SET_FIELD,
                      'editedDraftName',
                      name
                    )
                  }
                  onTabChange={(event, newValue) => {
                    handleDispatch(
                      actionTypes.SET_SELECTED_DRAFT_INDEX,
                      'selectedDraftIndex',
                      newValue
                    );

                    localStorage.setItem(
                      'selectedDraft',
                      JSON.stringify(drafts[selectedDraftIndex])
                    );
                  }}
                  onEditDraftName={(index) => {
                    handleDispatch(actionTypes.TOGGLE_IS_EDITING);
                    handleDispatch(
                      actionTypes.SET_FIELD,
                      'editedDraftName',
                      drafts[index].title
                    );
                    handleDispatch(
                      actionTypes.SET_SELECTED_DRAFT_INDEX,
                      'selectedDraftIndex',
                      index
                    );
                  }}
                  onSaveDraftName={(index, name) => {
                    dispatch({
                      type: actionTypes.UPDATE_DRAFT_NAME,
                      index,
                      name,
                    });
                    handleDispatch(actionTypes.TOGGLE_IS_EDITING);
                  }}
                  onDeleteDraft={(index) => {
                    dispatch({ type: actionTypes.DELETE_DRAFT, index });
                    handleDispatch(
                      actionTypes.SET_SELECTED_DRAFT_INDEX,
                      'selectedDraftIndex',
                      0
                    );
                  }}
                  onOpenAddDialog={() => toggleDialog('addDraftDialogOpen')}
                />
              </Box>
            )}
          </Paper>
        </Box>
        <AddDraftDialog
          open={dialogState.addDraftDialogOpen}
          toggleDialog={toggleDialog}
          newDraftName={newDraftName}
          handleDispatch={handleDispatch}
          handleAddDraft={handleAddDraft}
        />
        <AuthDialogWrapper
          dialogState={dialogState.authDialogOpen}
          toggleDialog={toggleDialog}
          handleDispatch={handleDispatch}
          isAuthenticated={isAuthenticated}
          API_URL={API_URL}
          initAddContentVisible={initAddContentVisible}
          dispatch={dispatch}
        />
        <ViewDraftsDialog
          user={user}
          dialogState={dialogState.viewDraftsDialogOpen}
          toggleDialog={toggleDialog}
          handleDispatch={handleDispatch}
          dispatch={dispatch}
        />
        <ProfileDialog
          user={user}
          dialogState={dialogState.profileDialogOpen}
          toggleDialog={toggleDialog}
        />
        {/* ================ ADD DIALOG ================ */}
        {/* {dialogState.addDraftDialogOpen && (
          <Dialog
            open={dialogState.addDraftDialogOpen}
            TransitionComponent={Transition}
            onClose={() => toggleDialog('addDraftDialogOpen')}
          >
            <DialogTitle>Add a New Draft</DialogTitle>
            <DialogContent>
              <TextField
                // ! autoFocus <-- ESLINT: autoFocus is not allowed
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
                onClick={() => toggleDialog('addDraftDialogOpen')}
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
        )} */}
        {/* ================ AUTH DIALOG ================ */}
        {/* {dialogState.authDialogOpen && (
          <AuthDialog
            open={dialogState.authDialogOpen}
            onClose={() => toggleDialog('authDialogOpen')}
            onLoginSuccess={(token, userData) => {
              localStorage.setItem('userToken', token);
              localStorage.setItem('user', JSON.stringify(userData));
              handleDispatch(actionTypes.SET_FIELD, 'isAuthenticated', true);
              toggleDialog('authDialogOpen');
            }}
            actionTypes={actionTypes}
            apiUrl={API_URL}
            initAddContentVisible={initAddContentVisible}
            isAuthenticated={isAuthenticated}
            dispatch={dispatch}
          />
        )} */}
        {/* ================ VIEW DRAFTS DIALOG ================ */}
        {/* {user && dialogState.viewDraftsDialogOpen && (
          <Dialog
            open={dialogState.viewDraftsDialogOpen}
            onClose={() => toggleDialog('viewDraftsDialogOpen')}
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
                                  actionTypes.SET_SELECTED_DRAFT_INDEX,
                                  'selectedDraftIndex',
                                  index
                                );
                                toggleDialog('viewDraftsDialogOpen');
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
                onClick={() => toggleDialog('viewDraftsDialogOpen')}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )} */}
        {/* ================ PROFILE DIALOG ================ */}
        {/* {dialogState.profileDialogOpen && (
          <Dialog
            open={dialogState.profileDialogOpen}
            onClose={() => toggleDialog('profileDialogOpen')}
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
                onClick={() => toggleDialog('profileDialogOpen')}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )} */}
        {/* ================ SNACKBAR NOTIFICATIONS ================ */}
        <NotificationSystem
          notifications={notifications}
          handleClose={removeNotification}
        />
      </Paper>
    </Card>
  );

  function UserMenu() {
    return (
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
          handleDispatch(actionTypes.SET_FIELD, 'anchorElUser', null)
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
              onClick={handleLogout}
            >
              Logout
            </RCButton>
          </LeftSection>
          <RightSection theme={theme}>
            <MenuItem
              onClick={() => {
                toggleDialog('profileDialogOpen');
                handleDispatch(actionTypes.SET_FIELD, 'anchorElUser', null);
              }}
            >
              <PersonIcon sx={{ marginRight: 1 }} />
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleDialog('viewDraftsDialogOpen');
                handleDispatch(actionTypes.SET_FIELD, 'anchorElUser', null);
              }}
            >
              <EditNoteIcon sx={{ marginRight: 1 }} />
              <Typography textAlign="center">View Drafts</Typography>
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleDispatch(actionTypes.SET_FIELD, 'anchorElUser', null)
              }
            >
              <SettingsIcon sx={{ marginRight: 1 }} />
              <Typography textAlign="center">Settings</Typography>
            </MenuItem>
          </RightSection>
        </Box>
      </Menu>
    );
  }
}

export default Generator;
const NavBar = ({ navigate, theme, user, handleDispatch, UserMenu }) => {
  return (
    <AppBar position="static">
      <DashboardBox
        component={Container}
        sx={{
          backgroundColor: theme.palette.grey[100],
          borderRadius: 'none !important',
          borderColor: theme.palette.grey[800],
          borderWidth: '1px',
        }}
      >
        <Toolbar disableGutters>
          <Tooltip title="Back to Menu">
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
              <Card sx={{ backgroundColor: theme.palette.black.light }}>
                <Paper
                  sx={{
                    p: theme.spacing(0.5),
                    m: theme.spacing(0.75),
                    backgroundColor: theme.palette.grey[200],
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <StyledIconButton
                    onClick={() => navigate('/')}
                    aria-label="Back to Menu"
                    theme={theme}
                  >
                    <Avatar>
                      <ArrowBackIcon color={theme.palette.text.colorPrimary} />
                    </Avatar>
                  </StyledIconButton>
                </Paper>
              </Card>
            </Card>
          </Tooltip>
          <Card
            sx={{
              ml: theme.spacing(2),
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
            <Card sx={{ backgroundColor: theme.palette.black.light }}>
              <Paper
                sx={{
                  p: theme.spacing(2),
                  m: theme.spacing(1),
                  backgroundColor: theme.palette.grey[200],
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
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
                  <Avatar alt="User Profile">
                    <GradingRoundedIcon
                      color={theme.palette.text.colorPrimary}
                    />
                  </Avatar>
                </StyledIconButton>
                <RCTypography
                  variant="h3"
                  color="text"
                  sx={({ breakpoints, typography: { size } }) => ({
                    my: theme.spacing(1),
                    py: theme.spacing(1),
                    fontFamily: 'Roboto',
                    [breakpoints.down('md')]: { fontSize: size['3xl'] },
                  })}
                >
                  AiCover Letter Generator
                </RCTypography>
              </Paper>
            </Card>
          </Card>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="User settings">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                sx={{ marginRight: theme.spacing(1) }}
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
              {UserMenu()}
            </Box>
          </Tooltip>
          <Tooltip title="Open menu">
            <StyledIconButton
              onClick={() => handleDispatch(actionTypes.TOGGLE_DRAFTS_BAR)}
              aria-label="Toggle Drafts Bar"
              theme={theme}
            >
              <Avatar>
                <MenuIcon color={theme.palette.text.colorPrimary} />
              </Avatar>
            </StyledIconButton>
          </Tooltip>
        </Toolbar>
      </DashboardBox>
    </AppBar>
  );
};

const AddDraftDialog = ({
  open,
  toggleDialog,
  newDraftName,
  handleDispatch,
  handleAddDraft,
}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    onClose={() => toggleDialog('addDraftDialogOpen')}
  >
    <DialogTitle>Add a New Draft</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        id="name"
        label="Draft Name"
        type="text"
        fullWidth
        variant="outlined"
        value={newDraftName}
        onChange={(e) =>
          handleDispatch(actionTypes.SET_FIELD, 'newDraftName', e.target.value)
        }
        onKeyDown={(e) => e.key === 'Enter' && handleAddDraft()}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => toggleDialog('addDraftDialogOpen')}
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
);

const AuthDialogWrapper = ({
  dialogState,
  toggleDialog,
  handleDispatch,
  isAuthenticated,
  API_URL,
  initAddContentVisible,
  dispatch,
}) => (
  <AuthDialog
    open={dialogState}
    onClose={() => toggleDialog('authDialogOpen')}
    onLoginSuccess={(token, userData) => {
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      handleDispatch(actionTypes.SET_FIELD, 'isAuthenticated', true);
      toggleDialog('authDialogOpen');
    }}
    actionTypes={actionTypes}
    apiUrl={API_URL}
    initAddContentVisible={initAddContentVisible}
    isAuthenticated={isAuthenticated}
    dispatch={dispatch}
  />
);

const ViewDraftsDialog = ({
  user,
  dialogState,
  toggleDialog,
  handleDispatch,
  dispatch,
}) => (
  <Dialog
    open={dialogState}
    onClose={() => toggleDialog('viewDraftsDialogOpen')}
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
                <TableCell color="primary">{draft.content.name}</TableCell>
                <TableCell color="primary">{draft.content.text}</TableCell>
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
                          actionTypes.SET_SELECTED_DRAFT_INDEX,
                          'selectedDraftIndex',
                          index
                        );
                        toggleDialog('viewDraftsDialogOpen');
                      }}
                    >
                      View
                    </RCButton>
                    <RCButton
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        dispatch({ type: actionTypes.REMOVE_DRAFT, index })
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
        onClick={() => toggleDialog('viewDraftsDialogOpen')}
        color="primary"
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

const ProfileDialog = ({ user, dialogState, toggleDialog }) => (
  <Dialog
    open={dialogState}
    onClose={() => toggleDialog('profileDialogOpen')}
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
      <Button onClick={() => toggleDialog('profileDialogOpen')} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
