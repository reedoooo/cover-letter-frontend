import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import {
  Dialog,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  TextField,
  Grid,
  Card,
  Slide,
} from '@mui/material';
import MuiLink from '@mui/material/Link';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';

import formFieldsConfigs from 'config/formFieldsConfigs';
import useAuth from 'hooks/useAuth';
import useMode from 'hooks/useMode';

import { StyledIconContainer } from './styled';
import RCBox from './themed/RCBox';
import RCButton from './themed/RCButton';
import RCTypography from './themed/RCTypography';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AuthDialog({
  open,
  onClose,
  onLoginSuccess,
  apiUrl,
  isAuthenticated,
  dispatch,
  initAddContentVisible,
  actionTypes,
}) {
  const { handleAuthSubmit } = useAuth(isAuthenticated, dispatch);
  const { theme } = useMode();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      isSignup: false,
    },
    onSubmit: (values) =>
      handleAuthSubmit(values, onLoginSuccess, onClose, apiUrl),
  });
  useEffect(() => {
    if (open) {
      window.scrollTo(0, 0);
    }
  }, [open]);
  const renderFormFields = () => {
    return formFieldsConfigs['authConfigs'].map((field) => {
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
  const handleContinueAsGuest = () => {
    dispatch({
      type: actionTypes.TOGGLE_INIT_ADD_CONTENT_VISIBLE,
      payload: true,
    });
    dispatch({
      type: actionTypes.TOGGLE_DIALOG_STATE,
      dialog: 'authDialogOpen',
    });
  };

  return (
    <Dialog
      open={open}
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
        {/* <DialogTitle>{formik.values.isSignup ? 'Sign Up' : 'Login'}</DialogTitle> */}
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
                // alignItems: 'flex-end',
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
                  size="large"
                  textSizeVariant="header"
                  textWeightVariant="bold"
                  sx={{
                    mx: theme.spacing(1),
                  }}
                >
                  {formik.values.isSignup ? 'Sign Up' : 'Login'}
                </RCButton>
                <RCButton
                  onClick={onClose}
                  variant="outlined"
                  color="error"
                  size="large"
                  textSizeVariant="header"
                  textWeightVariant="bold"
                  sx={{
                    mx: theme.spacing(1),
                  }}
                >
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
