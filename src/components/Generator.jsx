/* eslint-disable react-hooks/exhaustive-deps */
import 'react-quill/dist/quill.snow.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import SettingsIcon from '@mui/icons-material/Settings';
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
  TableRow,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteDraft } from 'api';
import constants from 'config/constants';
import useAuth from 'hooks/useAuth';
import { actionTypes } from 'hooks/useDraftReducer';
import useDraftStorage from 'hooks/useDraftStorage';
import useMode from 'hooks/useMode';
import useNotification from 'hooks/useNotification';
import useRouter from 'hooks/useRouter';
import {
  setField,
  setSelectedDraftIndex,
  addDraft,
  toggleDialogState,
  removeDraft,
  updateDraftName,
  toggleIsEditing,
} from '../store/Reducers/draftSlice';
import AuthDialog from './AuthDialog';
import DashboardBox from './common/DashboardBox';
import CoverLetterForm from './CoverLetterForm';
import DraftTabs from './DraftTabs';
import NotificationSystem from './NotificationSystem';
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
import RCButton from './themed/RCButton';
import RCDialog from './themed/RCDialog';
import RCTypography from './themed/RCTypography';

const { API_URL } = constants;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Generator(props) {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const {
    drafts,
    selectedDraftIndex,
    newDraftName,
    dialogState,
    isAuthenticated,
    formDisabled,
    draftsBarVisible,
    loading,
    editedDraftName,
    isEditing,
    initAddContentVisible,
  } = useSelector((state) => state.drafts);
  const { saveDrafts } = useDraftStorage();
  const { notifications, addNotification, removeNotification } =
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
    [dispatch],
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

  const handleDeleteDraft = useCallback(
    async (draftId) => {
      try {
        await deleteDraft(draftId);
        dispatch(removeDraft(draftId));
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    },
    [dispatch],
  );

  // useEffect(() => {
  //   loadDraftsFromLocalStorage(dispatch);
  // }, [dispatch]);

  useEffect(() => {
    saveDrafts(drafts);
  }, [drafts, saveDrafts]);

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
                setAnchorElUser={setAnchorElUser}
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
                    handleDispatch('SET_FIELD', 'editedDraftName', name)
                  }
                  onTabChange={(event, newValue) => {
                    handleDispatch(
                      'SET_SELECTED_DRAFT_INDEX',
                      'selectedDraftIndex',
                      newValue,
                    );
                    localStorage.setItem(
                      'selectedDraft',
                      JSON.stringify(drafts[selectedDraftIndex]),
                    );
                  }}
                  onEditDraftName={(index) => {
                    dispatch(toggleIsEditing());
                    handleDispatch(
                      'SET_FIELD',
                      'editedDraftName',
                      drafts[index].title,
                    );
                    handleDispatch(
                      'SET_SELECTED_DRAFT_INDEX',
                      'selectedDraftIndex',
                      index,
                    );
                  }}
                  onSaveDraftName={(index, name) => {
                    dispatch(updateDraftName({ index, title: name }));
                    dispatch(toggleIsEditing());
                  }}
                  onDeleteDraft={(index) => {
                    dispatch(removeDraft(index));
                    handleDispatch(
                      'SET_SELECTED_DRAFT_INDEX',
                      'selectedDraftIndex',
                      0,
                    );
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
        <AddDraftDialog
          open={dialogState.addDraftDialogOpen}
          toggleDialog={() => dispatch(toggleDialogState('addDraftDialogOpen'))}
          newDraftName={newDraftName}
          handleDispatch={handleDispatch}
          handleAddDraft={handleAddDraft}
        />
        {/* ================ AUTH DIALOG ================ */}
        <AuthDialogWrapper
          dialogState={dialogState.authDialogOpen}
          toggleDialog={() => dispatch(toggleDialogState('authDialogOpen'))}
          handleDispatch={handleDispatch}
          isAuthenticated={isAuthenticated}
          API_URL={API_URL}
          initAddContentVisible={initAddContentVisible}
          dispatch={dispatch}
        />{' '}
        {/* ================ VIEW DRAFTS DIALOG ================ */}
        <ViewDraftsDialog
          user={user}
          dialogState={dialogState.viewDraftsDialogOpen}
          toggleDialog={() =>
            dispatch(toggleDialogState('viewDraftsDialogOpen'))
          }
          handleDispatch={handleDispatch}
          dispatch={dispatch}
          theme={theme}
        />{' '}
        {/* ================ PROFILE DIALOG ================ */}
        <ProfileDialog
          user={user}
          dialogState={dialogState.profileDialogOpen}
          toggleDialog={() => dispatch(toggleDialogState('profileDialogOpen'))}
        />
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
              onClick={handleLogout}
            >
              Logout
            </RCButton>
          </LeftSection>
          <RightSection theme={theme}>
            <MenuItem
              onClick={() => {
                dispatch(toggleDialogState('profileDialogOpen'));
                setAnchorElUser(null);
              }}
            >
              <PersonIcon sx={{ marginRight: 1 }} />
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(toggleDialogState('viewDraftsDialogOpen'));
                setAnchorElUser(null);
              }}
            >
              <EditNoteIcon sx={{ marginRight: 1 }} />
              <Typography textAlign="center">View Drafts</Typography>
            </MenuItem>
            <MenuItem onClick={() => setAnchorElUser(null)}>
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
// const NavBar = ({ navigate, theme, user, handleDispatch, UserMenu }) => {
//   return (
//     <AppBar position="static">
//       <DashboardBox
//         component={Container}
//         sx={{
//           backgroundColor: theme.palette.grey[100],
//           borderRadius: 'none !important',
//           borderColor: theme.palette.grey[800],
//           borderWidth: '1px',
//           [theme.breakpoints.down('md')]: {
//             padding: theme.spacing(1),
//           },
//           [theme.breakpoints.down('sm')]: {
//             padding: theme.spacing(0.5),
//           },
//         }}
//       >
//         <Toolbar
//           disableGutters
//           sx={{
//             flexDirection: 'column',
//             [theme.breakpoints.up('md')]: {
//               flexDirection: 'row',
//               alignItems: 'center',
//             },
//           }}
//         >
//           <Grid container alignItems="center" justifyContent="space-between">
//             <Grid item xs={12} md="auto" sx={{ textAlign: 'center' }}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: { xs: 'center', md: 'flex-start' },
//                 }}
//               >
//                 <Tooltip title="Back to Menu">
//                   <StyledIconButton
//                     onClick={() => navigate('/')}
//                     aria-label="Back to Menu"
//                     theme={theme}
//                     sx={{ mx: { xs: 1, md: 2 } }}
//                   >
//                     <Avatar>
//                       <ArrowBackIcon color={theme.palette.text.colorPrimary} />
//                     </Avatar>
//                   </StyledIconButton>
//                 </Tooltip>
//                 <RCTypography
//                   variant="h3"
//                   color="text"
//                   sx={({ breakpoints, typography: { size } }) => ({
//                     my: theme.spacing(1),
//                     py: theme.spacing(1),
//                     fontFamily: 'Roboto',
//                     textAlign: 'center',
//                     [breakpoints.down('md')]: {
//                       fontSize: size['2xl'],
//                     },
//                     [breakpoints.down('sm')]: {
//                       fontSize: size['xl'],
//                     },
//                   })}
//                 >
//                   AiCover Letter Generator
//                 </RCTypography>
//               </Box>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md="auto"
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: { xs: 'center', md: 'flex-end' },
//                 mt: { xs: 2, md: 0 },
//               }}
//             >
//               <Tooltip title="User settings">
//                 <StyledIconButton
//                   onClick={(event) =>
//                     handleDispatch(
//                       actionTypes.SET_FIELD,
//                       'anchorElUser',
//                       event.currentTarget
//                     )
//                   }
//                   theme={theme}
//                   sx={{ mx: { xs: 1, md: 2 } }}
//                 >
//                   <Avatar alt="User Profile">
//                     <GradingRoundedIcon
//                       color={theme.palette.text.colorPrimary}
//                     />
//                   </Avatar>
//                 </StyledIconButton>
//               </Tooltip>
//               <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     marginRight: theme.spacing(1),
//                     px: theme.spacing(1),
//                     [theme.breakpoints.down('md')]: {
//                       marginRight: theme.spacing(0.5),
//                       px: theme.spacing(0.5),
//                     },
//                   }}
//                 >
//                   {user?.username || 'Username'}
//                 </Typography>
//                 {UserMenu()}
//               </Box>
//               <Tooltip title="Open menu">
//                 <StyledIconButton
//                   onClick={() => handleDispatch(actionTypes.TOGGLE_DRAFTS_BAR)}
//                   aria-label="Toggle Drafts Bar"
//                   theme={theme}
//                   sx={{ mx: { xs: 1, md: 2 } }}
//                 >
//                   <Avatar>
//                     <MenuIcon color={theme.palette.text.colorPrimary} />
//                   </Avatar>
//                 </StyledIconButton>
//               </Tooltip>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </DashboardBox>
//     </AppBar>
//   );
// };

const NavBar = ({
  navigate,
  theme,
  user,
  handleDispatch,
  UserMenu,
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
        sx={{
          backgroundColor: theme.palette.grey[100],
          borderRadius: 'none !important',
          borderColor: theme.palette.grey[800],
          borderWidth: '1px',
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
            <Card sx={commonCardStyles}>
              <Paper sx={commonPaperStyles}>
                <StyledIconButton
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
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
              </Paper>
            </Card>
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    onClick={(event) => setAnchorElUser(event.currentTarget)}
                    theme={theme}
                  >
                    <Avatar alt="User Profile" />
                  </StyledIconButton>
                  {UserMenu()}
                </Box>
              </Paper>
            </Card>
          </Tooltip>
          <Tooltip title="Open menu">
            <Card
              sx={{
                ...commonCardStyles,
                ml: theme.spacing(2),
                [theme.breakpoints.down('md')]: {
                  ml: theme.spacing(1),
                  mt: theme.spacing(1),
                },
              }}
            >
              <Paper sx={commonPaperStyles}>
                <StyledIconButton
                  onClick={() => handleDispatch('TOGGLE_DRAFTS_BAR')}
                  aria-label="Toggle Drafts Bar"
                  theme={theme}
                >
                  <Avatar>
                    <MenuIcon color={theme.palette.text.colorPrimary} />
                  </Avatar>
                </StyledIconButton>
              </Paper>
            </Card>
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
}) => {
  const dispatch = useDispatch();

  return (
    <RCDialog
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
            variant="outlined"
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
        onChange={(e) =>
          dispatch(setField({ field: 'newDraftName', value: e.target.value }))
        }
        onKeyDown={(e) => e.key === 'Enter' && handleAddDraft()}
      />
    </RCDialog>
  );
};

const AuthDialogWrapper = ({
  dialogState,
  toggleDialog,
  isAuthenticated,
  initAddContentVisible,
}) => {
  const dispatch = useDispatch();

  return (
    <AuthDialog
      open={dialogState}
      onClose={toggleDialog}
      onLoginSuccess={(token, userData) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(setField({ field: 'isAuthenticated', value: true }));
      }}
      apiUrl={API_URL}
      initAddContentVisible={initAddContentVisible}
      isAuthenticated={isAuthenticated}
    />
  );
};

const ViewDraftsDialog = ({ user, dialogState, toggleDialog, theme }) => {
  const dispatch = useDispatch();

  return (
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        variant="outlined"
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
      <DialogActions
        sx={{ justifyContent: 'center', padding: theme.spacing(2) }}
      >
        <Button onClick={toggleDialog} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProfileDialog = ({ user, dialogState, toggleDialog }) => {
  return (
    <Dialog open={dialogState} onClose={toggleDialog} maxWidth="md" fullWidth>
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
        <Button onClick={toggleDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
