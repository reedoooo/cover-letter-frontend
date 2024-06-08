/* eslint-disable import/namespace */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddBox as AddBoxIcon,
  ArrowBack as ArrowBackIcon,
  Cancel as CancelIcon,
  EditNote as EditNoteIcon,
  GradingRounded as GradingRoundedIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  PictureAsPdfRounded as PictureAsPdfRoundedIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import 'react-quill/dist/quill.snow.css';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from 'config/constants';
import useAuth from 'hooks/useAuth';
import useDraftStorage from 'hooks/useDraftStorage';
import useMode from 'hooks/useMode';
import useNotification from 'hooks/useNotification';
import useRouter from 'hooks/useRouter';
import { dispatch } from 'store/index';
import {
  addDraft,
  removeDraft,
  setField,
  setSelectedDraftIndex,
  toggleIsEditing,
  updateDraftName,
} from 'store/Reducers/draftSlice';
import { toggleDialogState } from 'store/Reducers/navigationSlice';
import {
  LeftSection,
  RightSection,
  StyledAvatar,
  StyledDialogTitle,
  StyledIconButton,
  StyledLink,
  StyledTableCell,
  StyledTableHead,
} from './styled';
import { RCButton, RCDialog, RCTypography } from './themed';
import {
  AuthDialog,
  CoverLetterForm,
  DashboardBox,
  DraftTabs,
  NotificationSystem,
} from '.';

const { API_URL } = constants;

function Generator(props) {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    drafts,
    selectedDraftIndex,
    newDraftName,
    loading,
    editedDraftName,
    isEditing,
  } = useSelector(state => state.drafts);
  const { dialogState, formDisabled, draftsBarVisible } = useSelector(
    state => state.navigation
  );
  const { isAuthenticated } = useSelector(state => state.user);
  const { saveDrafts } = useDraftStorage();
  const { addNotification, removeNotification, notifications } =
    useNotification();
  const { navigate } = useRouter();
  const { theme } = useMode();
  const { handleLogout } = useAuth(isAuthenticated, dispatch);
  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = localStorage.getItem('userToken');

  const handleDispatch = useCallback(
    (type, field, value) => {
      dispatch(setField({ field, value }));
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
    dispatch(addDraft(newDraft));
    dispatch(setSelectedDraftIndex(drafts?.length));
    handleDispatch('SET_FIELD', 'newDraftName', '');
    handleDispatch('SET_FIELD', 'formDisabled', false);
    dispatch(toggleDialogState('addDraftDialogOpen'));
    addNotification({
      color: 'success',
      icon: 'check_circle',
      title: 'Draft Added',
      dateTime: 'Just now',
      content: 'A new draft has been successfully added.',
    });
    saveDrafts(drafts);
  }, [dispatch, drafts, newDraftName, saveDrafts, addNotification]);

  useEffect(() => {
    if (userToken) {
      handleDispatch('SET_FIELD', 'isAuthenticated', true);
      handleDispatch('SET_FIELD', 'formDisabled', false);
    } else {
      handleDispatch('SET_FIELD', 'isAuthenticated', false);
      handleDispatch('SET_FIELD', 'formDisabled', true);
    }
  }, [handleDispatch, userToken]);

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
                anchorElUser={anchorElUser}
                setAnchorElUser={setAnchorElUser}
              />
              {/* ================ COVER LETTER FORM ================ */}
              <CoverLetterForm />
            </Box>
            {/* ================ TABS DISPLAYED FOR DRAFTS ================ */}
            {draftsBarVisible && (
              <Box component={Grid} item xs={2}>
                <DraftTabs
                  drafts={drafts}
                  selectedDraftIndex={selectedDraftIndex}
                  isEditing={isEditing}
                  editedDraftName={editedDraftName}
                  setEditedDraftName={name =>
                    handleDispatch('SET_FIELD', 'editedDraftName', name)
                  }
                  onTabChange={(event, newValue) => {
                    handleDispatch(
                      'SET_SELECTED_DRAFT_INDEX',
                      'selectedDraftIndex',
                      newValue
                    );
                    localStorage.setItem(
                      'selectedDraft',
                      JSON.stringify(drafts[selectedDraftIndex])
                    );
                  }}
                  onEditDraftName={index => {
                    dispatch(toggleIsEditing());
                    handleDispatch(
                      'SET_FIELD',
                      'editedDraftName',
                      drafts[index].title
                    );
                  }}
                  onSaveDraftName={(index, name) => {
                    dispatch(
                      updateDraftName({
                        index,
                        title: name,
                      })
                    );
                  }}
                  onDeleteDraft={index => {
                    dispatch(removeDraft(index));
                    handleDispatch('SET_FIELD', 'selectedDraftIndex', 0);
                  }}
                  onOpenAddDialog={() =>
                    dispatch(toggleDialogState('addDraftDialogOpen'))
                  }
                />
              </Box>
            )}
          </Paper>
        </Box>
        {/* ================ ADD DIALOG ================ */}
        {/* <AddDraftDialog
          open={dialogState.addDraftDialogOpen}
          toggleDialog={() => dispatch(toggleDialogState('addDraftDialogOpen'))}
          newDraftName={newDraftName}
          handleDispatch={handleDispatch}
          handleAddDraft={handleAddDraft}
        /> */}
        {/* ================ AUTH DIALOG ================ */}
        <AuthDialogWrapper />
        {/* ================ VIEW DRAFTS DIALOG ================ */}
        {/* <ViewDraftsDialog
          user={user}
          dialogState={dialogState.viewDraftsDialogOpen}
          toggleDialog={() =>
            dispatch(toggleDialogState('viewDraftsDialogOpen'))
          }
          dispatch={dispatch}
          theme={theme}
        /> */}
        {/* ================ PROFILE DIALOG ================ */}
        {/* <ProfileDialog
          dialogState={dialogState.profileDialogOpen}
          toggleDialog={() => dispatch(toggleDialogState('profileDialogOpen'))}
        /> */}
        {/* ================ SNACKBAR NOTIFICATIONS ================ */}
        <NotificationSystem
          notifications={notifications}
          handleClose={removeNotification}
        />
      </Paper>
    </Card>
  );
}

function UserMenu({ anchorElUser, setAnchorElUser, theme }) {
  const menuData = [
    {
      label: 'Profile',
      icon: 'account_circle',
      dialog: 'profileDialogOpen',
    },
    { label: 'View Drafts', icon: 'edit', dialog: 'viewDraftsDialogOpen' },
    { label: 'Settings', icon: 'settings', dialog: 'settingsDialogOpen' },
    { label: 'Logout', icon: 'logout', dialog: 'logoutDialogOpen' },
  ];
  const user = {};
  // GET USER FROM LOCAL STORAGE

  const { navigate } = useRouter();

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
      onClose={() => setAnchorElUser(null)}
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
            // onClick={handleLogout}
          >
            Logout
          </RCButton>
        </LeftSection>
        <RightSection theme={theme}>
          {menuData.map(item => (
            <MenuItem
              key={item.dialog}
              onClick={() => {
                navigate(`/${item.label.toLowerCase().replace(' ', '-')}`);
                dispatch(toggleDialogState(item.dialog));
                setAnchorElUser(null);
              }}
            >
              {item.icon === 'account_circle' && (
                <PersonIcon sx={{ marginRight: 1 }} />
              )}
              {item.icon === 'edit' && <EditNoteIcon sx={{ marginRight: 1 }} />}
              {item.icon === 'settings' && (
                <SettingsIcon sx={{ marginRight: 1 }} />
              )}
              {item.icon === 'logout' && <LogoutIcon sx={{ marginRight: 1 }} />}
              <Typography textAlign="center">{item.label}</Typography>
            </MenuItem>
          ))}
        </RightSection>
      </Box>
    </Menu>
  );
}

export default Generator;

const NavBar = ({
  navigate,
  theme,
  user,
  handleDispatch,
  UserMenu,
  anchorElUser,
  setAnchorElUser,
}) => {
  const commonCardStyles = {
    overflow: 'visible',
    backgroundColor: theme.palette.black.light,
    '&.MuiDialog-paper': {
      boxShadow: 'none',
      overflow: 'visible',
      '& .MuiDialogActions-root': {
        padding: 0,
        overflow: 'visible !important',
      },
    },
  };
  const commonPaperStyles = {
    p: theme.spacing(0.5),
    m: theme.spacing(0.75),
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'row',
    borderRadius: theme.borders.borderRadius.lg,
  };
  return (
    <AppBar position="static">
      <DashboardBox
        component={Container}
        backgroundColor={theme.palette.grey[100]}
        borderRadius="none !important"
        borderColor={theme.palette.grey[800]}
        borderWidth="1px"
        sx={{
          padding: theme.spacing(2),
          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
          },
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.5),
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          }}
        >
          <Tooltip title="Back to Menu">
            <Card sx={commonCardStyles}>
              <Paper sx={commonPaperStyles}>
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
          </Tooltip>
          <Box
            sx={{
              ml: theme.spacing(2),
              overflow: 'visible',
              [theme.breakpoints.down('md')]: {
                ml: theme.spacing(1),
              },
            }}
          >
            <StyledIconButton
              onClick={event => setAnchorElUser(event.currentTarget)}
              theme={theme}
            >
              <Avatar>
                <GradingRoundedIcon color={theme.palette.text.colorPrimary} />
              </Avatar>
            </StyledIconButton>
            <RCTypography
              variant="h3"
              color="text"
              sx={({ breakpoints, typography: { size } }) => ({
                my: theme.spacing(1),
                py: theme.spacing(1),
                px: theme.spacing(1),
                fontFamily: 'Roboto',
                [breakpoints.down('md')]: {
                  fontSize: size['2xl'],
                },
                [breakpoints.down('sm')]: {
                  fontSize: size['xl'],
                },
              })}
            >
              AiCover Letter Generator
            </RCTypography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="User settings">
            <Card
              sx={{
                ...commonCardStyles,
                [theme.breakpoints.down('md')]: {
                  mt: theme.spacing(1),
                },
              }}
            >
              <Paper
                sx={{
                  ...commonPaperStyles,
                  [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: theme.spacing(1),
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginRight: theme.spacing(1),
                      px: theme.spacing(1),
                      [theme.breakpoints.down('md')]: {
                        marginRight: theme.spacing(0.5),
                        px: theme.spacing(0.5),
                      },
                    }}
                  >
                    {user?.username || 'Username'}
                  </Typography>
                  <StyledIconButton
                    onClick={event => setAnchorElUser(event.currentTarget)}
                    theme={theme}
                  >
                    <Avatar alt="User Profile" />
                  </StyledIconButton>
                  {UserMenu(anchorElUser, setAnchorElUser, theme)}
                </Box>
              </Paper>
            </Card>
          </Tooltip>
          <Tooltip title="Open menu">
            <StyledIconButton
              sx={{ ml: theme.spacing(2) }}
              onClick={() => handleDispatch('TOGGLE_DRAFTS_BAR')}
              aria-label="Toggle Drafts Bar"
              theme={theme}
            >
              <MenuIcon color={theme.palette.text.colorPrimary} />
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
  handleAddDraft,
  handleDispatch,
}) => {
  const dialogRef = useRef(null);
  return (
    <RCDialog
      ref={dialogRef}
      open={open}
      onClose={toggleDialog}
      title="Add a New Draft"
      transition="slide"
      actions={
        <>
          <Button
            onClick={toggleDialog}
            startIcon={<CancelIcon />}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddDraft}
            startIcon={<AddBoxIcon />}
            color="primary"
          >
            Add
          </Button>
        </>
      }
    >
      <TextField
        margin="dense"
        id="name"
        label="Draft Name"
        type="text"
        fullWidth
        variant="outlined"
        value={newDraftName}
        onChange={e =>
          handleDispatch('SET_FIELD', 'newDraftName', e.target.value)
        }
        onKeyDown={e => e.key === 'Enter' && handleAddDraft()}
      />
    </RCDialog>
  );
};

const AuthDialogWrapper = () => (
  <AuthDialog
    onLoginSuccess={(token, userData) => {
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setField({ field: 'isAuthenticated', value: true }));
    }}
    apiUrl={API_URL}
  />
);

const ViewDraftsDialog = ({ user, dialogState, toggleDialog, theme }) => (
  <Dialog open={dialogState} onClose={toggleDialog} maxWidth="md" fullWidth>
    <StyledDialogTitle theme={theme}>View Drafts</StyledDialogTitle>
    <DialogContent>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead theme={theme}>
            <TableRow>
              <StyledTableCell theme={theme}>Name</StyledTableCell>
              <StyledTableCell theme={theme}>Link</StyledTableCell>
              <StyledTableCell theme={theme}>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {user?.coverLetters?.map((draft, index) => (
              <TableRow key={index} hover>
                <TableCell>{draft.content.name}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <StyledAvatar theme={theme}>
                      <PictureAsPdfRoundedIcon />
                    </StyledAvatar>
                    <StyledLink
                      href={draft.content.pdf}
                      target="_blank"
                      theme={theme}
                    >
                      {draft.content.name}
                    </StyledLink>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <RCButton
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        dispatch(setSelectedDraftIndex(index));
                        toggleDialog();
                      }}
                    >
                      View
                    </RCButton>
                    <RCButton
                      color="error"
                      onClick={() => dispatch(removeDraft(index))}
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
    <DialogActions sx={{ justifyContent: 'center', padding: theme.spacing(2) }}>
      <Button onClick={toggleDialog} color="primary" variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

const ProfileDialog = ({ user, dialogState, toggleDialog }) => (
  <RCDialog
    open={dialogState}
    onClose={toggleDialog}
    title="Profile"
    maxWidth="md"
    actions={
      <Button onClick={toggleDialog} color="primary">
        Close
      </Button>
    }
  >
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
  </RCDialog>
);
