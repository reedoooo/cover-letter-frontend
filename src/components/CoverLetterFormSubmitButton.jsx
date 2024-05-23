import AddIcon from '@mui/icons-material/Add';
import { StyledIconContainer } from './styled';
import RCTypography from './themed/RCTypography';
import RCButton from './themed/RCButton';

const CoverLetterFormSubmitButton = ({ loading, handleSubmit, theme }) => (
  <RCButton
    variant="contained"
    color="primary"
    type="submit"
    sx={{ width: '100%', mt: 2 }}
    disabled={loading}
    startIcon={
      <StyledIconContainer theme={theme}>
        <AddIcon color="white" />
      </StyledIconContainer>
    }
  >
    <RCTypography variant="button" color="white">
      Generate Cover Letter
    </RCTypography>
  </RCButton>
);

export default CoverLetterFormSubmitButton;
