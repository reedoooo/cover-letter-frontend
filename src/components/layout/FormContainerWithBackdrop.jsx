import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState } from 'react';

import { FormContainer } from 'components/styled';
import RCBox from 'components/themed/RCBox';
import RCTypography from 'components/themed/RCTypography';

const {
  Box,
  Backdrop,
  Paper,
  Grid,
  Card,
  Avatar,
  Slide,
} = require('@mui/material');

const { default: RCButton } = require('../themed/RCButton');

const FormContainerWithBackdrop = ({
  children,
  theme,
  formDisabled,
  actionTypes,
  dispatch,
  isAuthenticated,
  drafts,
  dialogState,
  initAddContentVisible,
  addDraftDialogOpen,
  viewDraftsDialogOpen,
}) => {
  // const [showContent, setShowContent] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    if (isAuthenticated && drafts.length > 0) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
    }
  }, [isAuthenticated, drafts]);

  const handleGoToSignIn = () => {
    dispatch({
      type: actionTypes.TOGGLE_INIT_ADD_CONTENT_VISIBLE,
    });
    window.scrollTo(0, 0);
    dispatch({
      type: actionTypes.TOGGLE_DIALOG_STATE,
      dialog: 'authDialogOpen',
    });
  };

  const handleCreateDraft = () => {
    dispatch({
      type: actionTypes.TOGGLE_INIT_ADD_CONTENT_VISIBLE,
    });
    dispatch({
      type: actionTypes.TOGGLE_DIALOG_STATE,
      dialog: 'addDraftDialogOpen',
    });
  };

  return (
    <FormContainer theme={theme} maxwidth="md">
      <Box sx={{ position: 'relative' }}>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: formDisabled ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            // mx: 'auto',
            px: 'auto',
            paddingTop: '10vh', // Adjust padding to move content to the top quarter
          }}
          open={formDisabled}
        >
          {' '}
          <Slide
            direction="up"
            in={!initAddContentVisible}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <RCBox mt={6} mb={3} alignItems="flex-start">
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid
                    item
                    xs={8}
                    // lg={8}
                    component={Paper}
                    sx={{
                      p: 2,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Card>
                      <RCBox p={2} alignItems="center">
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} alignItems="center">
                            <RCBox
                              p={2}
                              lineHeight={2}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                            >
                              <Avatar
                                sx={{
                                  width: theme.spacing(10),
                                  height: theme.spacing(10),
                                  mr: theme.spacing(2),
                                  backgroundColor: theme.palette.primary.main,
                                }}
                              >
                                <EditNoteIcon />
                              </Avatar>
                              <RCTypography variant="h3" color="dark">
                                Create a new cover letter to get started
                              </RCTypography>
                            </RCBox>
                          </Grid>
                          <Grid item xs={4}>
                            <RCBox p={2} lineHeight={2}>
                              <RCButton
                                variant="contained"
                                color="primary"
                                size="large"
                                textSizeVariant="header"
                                textWeightVariant="bold"
                                onClick={handleCreateDraft}
                                fullWidth
                                sx={{ width: '100%', fontWeight: 'bold' }}
                              >
                                Create New Cover Letter
                              </RCButton>{' '}
                            </RCBox>
                          </Grid>
                          <Grid item xs={8}>
                            <RCBox
                              p={2}
                              lineHeight={2}
                              variant="outlined"
                              sx={{
                                borderColor: 'grey.500',
                                border: 1,
                                borderRadius: 1,
                              }}
                            >
                              <RCTypography
                                variant="button"
                                color="textTertiary"
                                fontWeight="regular"
                              >
                                Click the "Create New Cover Letter" button to
                                get started, or sign in to continue with an
                                existing cover letter.
                              </RCTypography>
                            </RCBox>
                          </Grid>
                        </Grid>
                      </RCBox>
                    </Card>
                  </Grid>
                </Grid>
              </RCBox>
              {/* </Slide>
            <Slide direction="up" in={!showContent} mountOnEnter unmountOnExit> */}
              <RCBox mt={6} mb={3} width="50%" mx="auto">
                <Grid container spacing={3} justifyContent="center">
                  <Grid
                    item
                    xs={8}
                    // lg={8}
                    component={Paper}
                    sx={{
                      p: theme.spacing(2),
                    }}
                  >
                    <RCBox p={2}>
                      <RCButton
                        variant="contained"
                        color="secondary"
                        size="large"
                        textSizeVariant="header"
                        textWeightVariant="bold"
                        onClick={handleGoToSignIn}
                        fullWidth
                        sx={{ width: '100%', fontWeight: 'bold' }}
                      >
                        Go to Sign In
                      </RCButton>
                    </RCBox>
                  </Grid>
                </Grid>
              </RCBox>
            </Box>
          </Slide>
        </Backdrop>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>{children}</Box>
        </Slide>
      </Box>
    </FormContainer>
  );
};

export default FormContainerWithBackdrop;
