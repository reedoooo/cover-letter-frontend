import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  TextField,
  Grid,
  Card,
} from '@mui/material';
import { useFormik } from 'formik';
import FacebookIcon from '@mui/icons-material/Facebook';
import MuiLink from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import useMode from 'hooks/useMode';
import formFieldsConfigs from 'config/formFieldsConfigs';
import useAuth from 'hooks/useAuth';

import RCTypography from './themed/RCTypography';
import RCBox from './themed/RCBox';
import RCButton from './themed/RCButton';
import { StyledIconContainer } from './styled';

function AuthDialog({ open, onClose, onLoginSuccess, apiUrl }) {
  const { handleAuthSubmit } = useAuth();
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
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
            <DialogActions>
              <RCButton type="submit" variant="outlined" color="success">
                {formik.values.isSignup ? 'Sign Up' : 'Login'}
              </RCButton>
              <RCButton onClick={onClose} variant="outlined" color="error">
                Cancel
              </RCButton>
            </DialogActions>
          </RCBox>
        </RCBox>
      </Card>
    </Dialog>
  );
}

export default AuthDialog;
