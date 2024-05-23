import React from 'react';
import {
  Button,
  Grid,
  Box,
  Divider,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import HtmlIcon from '@mui/icons-material/Html';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download'; // Import the Download icon

import useMode from 'hooks/useMode';
import { downloadHTML, downloadPDF } from 'utils/downloadUtils';

import RCButton from './themed/RCButton';
import { StyledIconContainer, StyledMenu } from './styled';

function ResultActions({
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
        <Grid item xs={12}>
          <Tooltip title="Rename Draft">
            <RCButton
              variant="outlined"
              color="primary"
              onClick={handleDraftEdit}
              sx={{ width: '100%', mb: theme.spacing(2) }}
              disabled={loading}
              startIcon={<EditIcon />}
            >
              Rename Draft
            </RCButton>
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <Tooltip title="Delete Draft">
            <RCButton
              variant="outlined"
              color="error"
              size="large"
              onClick={handleDraftDelete}
              sx={{ width: '100%' }}
              disabled={loading}
              startIcon={<DeleteIcon />}
            >
              Delete Draft
            </RCButton>
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <Tooltip title="Save Draft">
            <RCButton
              variant="outlined"
              color="info"
              size="large"
              onClick={handleDraftSave}
              sx={{ width: '100%' }}
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              Save Draft
            </RCButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Download Options">
            <Button
              id="download-button"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant="contained"
              disableElevation
              color="secondary"
              startIcon={<DownloadIcon fontSize="medium" />} // Add the Download icon here
              sx={{
                width: '100%',
                border: `2px solid ${theme.palette.secondary.main}`,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="button" fontSize="1.2rem">
                  Download
                </Typography>
                <StyledIconContainer theme={theme}>
                  <KeyboardArrowDownIcon fontSize="medium" />
                </StyledIconContainer>
              </Box>
            </Button>
          </Tooltip>

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

export default ResultActions;
