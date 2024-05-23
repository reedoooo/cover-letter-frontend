const { Box, Backdrop, Paper, Typography } = require('@mui/material');

const { FormContainer } = require('../styled');
const { default: RCButton } = require('../themed/RCButton');

const FormContainerWithBackdrop = ({
  children,
  theme,
  formDisabled,
  actionTypes,
  dispatch,
}) => (
  <FormContainer theme={theme} maxwidth="lg">
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
          justifyContent: 'center',
        }}
        open={formDisabled}
      >
        <Paper sx={{ padding: theme.spacing(4), textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create a new cover letter to get started
          </Typography>
          <RCButton
            variant="contained"
            onClick={() =>
              dispatch({ type: actionTypes.TOGGLE_ADD_DRAFT_DIALOG })
            }
          >
            Create New Cover Letter
          </RCButton>
        </Paper>
      </Backdrop>
      {children}
    </Box>
  </FormContainer>
);

export default FormContainerWithBackdrop;
