import AddIcon from '@mui/icons-material/Add';
import { StyledIconContainer } from './styled';
import RCTypography from './themed/RCTypography';
import RCButton from './themed/RCButton';

const CoverLetterFormSubmitButton = ({ loading, handleSubmit, theme }) => (
  <RCButton
    variant="contained"
    color="primary"
    type="submit"
    textSizeVariant="header"
    textWeightVariant="bold"
    size="large"
    sx={{ width: '100%', mt: 2 }}
    disabled={loading}
    startIcon={
      <StyledIconContainer
        theme={theme}
        sx={{
          borderRadius: `${theme.spacing(2)} !important`,
        }}
      >
        <AddIcon color="white" />
      </StyledIconContainer>
    }
  >
    Generate Cover Letter
    {/* <RCTypography variant="button" color="white">
      Generate Cover Letter
    </RCTypography> */}
  </RCButton>
);

export default CoverLetterFormSubmitButton;
