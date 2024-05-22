import React from 'react';
import {
  Button,
  Grid,
  Box,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';
import HtmlIcon from '@mui/icons-material/Html';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import useMode from 'hooks/useMode';
import RCButton from './themed/RCButton';
import { StyledIconContainer, StyledMenu } from './styled';
import { downloadHTML, downloadPDF } from 'utils/downloadUtils';

function EditorActions({
  draftContent,
  loading,
  handleDraftEdit,
  handleDraftDelete,
  handleDraftSave,
}) {
  const { theme } = useMode();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (type) => {
    const content = draftContent;
    switch (type) {
      case 'pdf':
        downloadPDF(content, 'MyCoverLetter.pdf');
        break;
      case 'html':
        downloadHTML(content, 'MyCoverLetter.html');
        break;
      case 'docx':
        console.log('DOCX download is not implemented yet.');
        break;
      default:
        console.error('Download type not handled:', type);
    }
    handleClose();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDraftEdit}
                sx={{ width: '100%', mb: theme.spacing(2) }}
                disabled={loading}
                startIcon={<EditIcon />}
              >
                Rename Draft
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <RCButton
                variant="outlined"
                color="error"
                size="large"
                onClick={handleDraftDelete}
                sx={{ width: '50%' }}
                disabled={loading}
                startIcon={<DeleteIcon />}
              >
                Delete Draft
              </RCButton>
              <RCButton
                variant="outlined"
                color="info"
                size="large"
                onClick={handleDraftSave}
                sx={{ width: '50%' }}
                disabled={loading}
                startIcon={<SaveIcon />}
              >
                Save Draft
              </RCButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            id="download-button"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant="contained"
            disableElevation
            color="secondary"
            label="Download"
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                flexGrow: 1,
              }}
            >
              <Typography variant="button" fontSize="1.2rem">
                Download
              </Typography>{' '}
              <StyledIconContainer theme={theme}>
                <KeyboardArrowDownIcon fontSize="3rem" />
              </StyledIconContainer>
            </Box>
          </Button>
          <StyledMenu
            id="download-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            theme={theme}
            MenuListProps={{
              'aria-labelledby': 'download-button',
            }}
          >
            <MenuItem onClick={() => handleDownload('pdf')} disableRipple>
              <PictureAsPdfIcon />
              PDF
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => handleDownload('html')} disableRipple>
              <HtmlIcon />
              HTML
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => handleDownload('docx')} disableRipple>
              <FilePresentIcon /> DOCX (Not Implemented)
            </MenuItem>
          </StyledMenu>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditorActions;
