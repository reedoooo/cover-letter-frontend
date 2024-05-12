import { stateToHTML } from 'draft-js-export-html'; // Make sure to install draft-js-export-html
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import { Button, Divider, Menu, MenuItem, alpha } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import HtmlIcon from '@mui/icons-material/Html';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from 'styled-components';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: '2rem',
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      // eslint-disable-next-line max-len
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 24, // Increase icon size
        color: 'rgb(55, 65, 81)',
        marginRight: '2rem',
      },
      '&:active': {
        backgroundColor: alpha('rgb(55, 65, 81)', 0.1),
      },
    },
  },
}));
function DownloadButton({ editorState, label }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const downloadHTML = (contentState, fileName) => {
    const html = stateToHTML(contentState);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'draft.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const downloadPDF = async (contentState, fileName) => {
    const html = stateToHTML(contentState, {
      blockStyleFn: (block) => {
        const type = block.getType();
        if (type === 'header-one') {
          return {
            style: {
              fontSize: '22px',
              fontWeight: 'bold',
            },
          };
        }
        if (type === 'header-two') {
          return {
            style: {
              fontSize: '18px',
              fontWeight: 'bold',
            },
          };
        }
        return null;
      },
    });

    const styledHtml = `
			<div style="font-family: Arial, sans-serif; font-size: 14px; padding: 40px;">
				${html}
			</div>
		`;

    const container = document.createElement('div');
    container.innerHTML = styledHtml;
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        logging: true,
        letterRendering: 1,
        useCORS: true,
        scale: 2, // Improve resolution
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      // const pageRatio = pageWidth / pageHeight;

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      let heightLeft = imgHeight;

      let position = 0;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        if (heightLeft > 0) {
          pdf.addPage();
        }
        heightLeft -= pageHeight;
      }

      pdf.save(fileName || 'MyCoverLetter.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      document.body.removeChild(container); // Clean up
    }
  };
  const handleDownload = (type) => {
    const contentState = editorState.getCurrentContent();
    switch (type) {
      case 'pdf':
        downloadPDF(contentState, 'MyCoverLetter.pdf');
        break;
      case 'html':
        downloadHTML(contentState, 'MyCoverLetter.html');
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
    <React.Fragment>
      <Button
        id="download-button"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        disableElevation
        color="secondary"
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={<GetAppIcon />}
        sx={{ mt: 2, mb: 2, width: '50%' }}
      >
        {label || 'Download Draft Options'}
      </Button>
      <StyledMenu
        id="download-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
    </React.Fragment>
  );
}

export default DownloadButton;
