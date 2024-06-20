import {
  Alert,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  Switch,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import {
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  PeopleAltRoundedIcon,
} from 'assets/humanIcons';
import { StyledIconContainer } from 'components/styled';
import { RCBox, RCButton, RCTypography } from 'components/themed';
import formFieldsConfigs from 'config/formFieldsConfigs';
import { useAuthStore } from 'contexts/AuthProvider';
import useMode from 'hooks/useMode';
import { dispatch } from 'store/index';
import { toggleDialogState } from 'store/Reducers/navigationSlice.jsx';
import LoadingIndicator from 'utils/LoadingIndicator';

export const AuthPages = () => {
  const { state, actions } = useAuthStore();
  const { handleAuthSubmit } = actions;
  const { user, formDisabled, isAuthenticated } = state;
  const navigate = useNavigate();
  const { theme } = useMode();
  const pageRef = React.createRef();
  const formRef = React.createRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      isSignup: false,
    },
    onSubmit: values => handleAuthSubmit(values),
  });

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
  const onClose = () => {
    formDisabled
      ? alert('Please sign in or add a draft as a guest')
      : console.log('Form closed'); // Adjust this as needed
  };

  const handleContinueAsGuest = () => {
    initDialogToggle();
    onClose();
  };

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (state.status === 'loading') {
    return <LoadingIndicator />;
  }
  return (
    <RCBox
      theme={theme}
      ref={pageRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          borderRadius: 'lg',
          boxShadow: theme.shadows[3],
        }}
      >
        <RCBox
          theme={theme}
          ref={formRef}
          variant="outlined"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="primary"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 1900,
            position: 'relative',
            textAlign: 'center',
            p: 2,
            m: 1,
          }}
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
                      backgroundColor: theme.palette.info?.main,
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
            <CardContent>
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
            </CardContent>
            <CardActions
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
            </CardActions>
          </RCBox>
        </RCBox>
      </Card>
    </RCBox>
  );
};

export default AuthPages;
