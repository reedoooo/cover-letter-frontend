import {
  Alert,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  Slide,
  Switch,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  PeopleAltRoundedIcon,
} from 'assets/humanIcons';
import { StyledIconContainer } from 'components/styled';
import { RCBox, RCButton, RCTypography } from 'components/themed';
import formFieldsConfigs from 'config/formFieldsConfigs';
import useAuth from 'hooks/useAuth';
import useMode from 'hooks/useMode';
import { toggleDialogState } from 'store/Reducers/navigationSlice.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AuthDialog({ onLoginSuccess, apiUrl }) {
  const dispatch = useDispatch();
  const { dialogState, formDisabled } = useSelector(state => state.navigation);
  const { isAuthenticated } = useSelector(state => state.user);
  const { handleAuthSubmit } = useAuth(isAuthenticated, dispatch);
  const { theme } = useMode();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      isSignup: false,
    },
    onSubmit: values =>
      handleAuthSubmit(values, onLoginSuccess, onClose, apiUrl),
  });

  useEffect(() => {
    if (dialogState.authDialogOpen) {
      window.scrollTo(0, 0);
    }
  }, [dialogState.authDialogOpen]);

  const renderFormFields = () => {
    return formFieldsConfigs['authConfigs'].map(field => {
      if (field.conditional && !formik.values[field.conditional]) {
        return null;
      }
      return (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          fullWidth={field.fullWidth}
          margin={field.margin}
        />
      );
    });
  };

  const initDialogToggle = () =>
    dispatch(toggleDialogState('initAddContentVisible'));
  const authDialogToggle = () => dispatch(toggleDialogState('authDialogOpen'));
  const onClose = () => {
    formDisabled
      ? authDialogToggle()
      : Alert('Please sign in or add a draft as a guest');
  };

  const handleContinueAsGuest = () => {
    initDialogToggle();
    authDialogToggle();
  };

  return (
    <Dialog
      open={dialogState.authDialogOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 'lg',
          overflow: 'visible',
          position: 'relative',
        },
      }}
    >
      <Card
        sx={{
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
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="primary"
          mx={2}
          mt={-5}
          p={2}
          mb={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 1900,
            position: 'relative',
          }}
          textAlign="center"
        >
          <RCTypography variant="h2" fontWeight="medium" color="white" mt={1}>
            {formik.values.isSignup ? 'Sign Up' : 'Login'}
          </RCTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Grid item xs={2}>
              <RCTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <StyledIconContainer
                  theme={theme}
                  sx={{
                    borderRadius: `${theme.spacing(8)} !important`,
                    '&:hover': {
                      backgroundColor: theme.palette.info.main,
                      '& svg': {
                        color: theme.palette.info.contrastText,
                      },
                    },
                  }}
                >
                  <FacebookIcon color="white" fontSize="inherit" />
                </StyledIconContainer>
              </RCTypography>
            </Grid>
            <Grid item xs={2}>
              <RCTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <StyledIconContainer
                  theme={theme}
                  sx={{
                    borderRadius: `${theme.spacing(8)} !important`,
                    '&:hover': {
                      backgroundColor: theme.palette.info.main,
                      '& svg': {
                        color: theme.palette.info.contrastText,
                      },
                    },
                  }}
                >
                  <GitHubIcon color="white" fontSize="inherit" />
                </StyledIconContainer>
              </RCTypography>
            </Grid>
            <Grid item xs={2}>
              <RCTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <StyledIconContainer
                  theme={theme}
                  sx={{
                    borderRadius: `${theme.spacing(8)} !important`,
                    '&:hover': {
                      backgroundColor: theme.palette.info.main,
                      '& svg': {
                        color: theme.palette.info.contrastText,
                      },
                    },
                  }}
                >
                  <GoogleIcon color="white" />
                </StyledIconContainer>
              </RCTypography>
            </Grid>
          </Grid>
        </RCBox>
        <RCBox pt={4} pb={3} px={3}>
          <RCBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <DialogContent>
              {renderFormFields()}
              <FormControlLabel
                control={
                  <Switch
                    name="isSignup"
                    checked={formik.values.isSignup}
                    onChange={() =>
                      formik.setFieldValue('isSignup', !formik.values.isSignup)
                    }
                  />
                }
                label={
                  formik.values.isSignup
                    ? 'Switch to Login'
                    : 'Switch to Signup'
                }
              />
            </DialogContent>
            <DialogActions
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'space-between',
              }}
            >
              <RCBox p={2}>
                <RCButton
                  variant="contained"
                  color="secondary"
                  size="large"
                  textSizeVariant="header"
                  textWeightVariant="bold"
                  onClick={handleContinueAsGuest}
                  fullWidth
                  startIcon={
                    <StyledIconContainer
                      theme={theme}
                      sx={{
                        borderRadius: `${theme.spacing(2)} !important`,
                      }}
                    >
                      <PeopleAltRoundedIcon color="white" />
                    </StyledIconContainer>
                  }
                  sx={{ width: '100%', fontWeight: 'medium' }}
                >
                  Continue as Guest
                </RCButton>
              </RCBox>
              <RCBox p={2} justifyContent="space-around">
                <RCButton
                  type="submit"
                  variant="outlined"
                  color="success"
                  sx={{ mx: theme.spacing(1) }}
                >
                  {formik.values.isSignup ? 'Sign Up' : 'Login'}
                </RCButton>
                <RCButton onClick={onClose} color="error">
                  Cancel
                </RCButton>
              </RCBox>
            </DialogActions>
          </RCBox>
        </RCBox>
      </Card>
    </Dialog>
  );
}

export default AuthDialog;
