const {
  Box,
  alpha,
  Menu,
  Paper,
  IconButton,
  DialogTitle,
  TableHead,
  TableCell,
  Link,
  Avatar,
} = require('@mui/material');
const { default: styled } = require('styled-components');

const StyledIconContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.background.default}`,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: theme.palette.dark.main,
    backgroundColor: theme.palette.background.hover,
  },
}));

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
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.grey[300],
    boxShadow:
      // eslint-disable-next-line max-len
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 24, // Increase icon size
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
    },
  },
}));

const ScrollablePaper = styled(Paper)(({ theme }) => ({
  maxHeight: 'calc(90vh - 96px)',
  padding: theme.spacing(2),
  marginRight: theme.spacing(2),
  height: '297mm',
  // padding: theme.spacing(2),
  boxSizing: 'border-box',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflowY: 'auto',
  backgroundColor: '#fff',
}));

const EditorContainer = styled(Paper)(({ theme }) => ({
  minHeight: 'calc(80vh - 96px)',
  maxHeight: 'calc(80vh - 96px)',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

const PdfPreviewContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginRight: theme.spacing(2),
  // marginLeft: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  border: `2px solid ${theme.palette.background.default}`,
  '&:hover': {
    color: theme.palette.dark.main,
    backgroundColor: theme.palette.background.hover,
  },
  '&:selected': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));
const LeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '200px',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const RightSection = styled(Box)(({ theme }) => ({
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
}));
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.dark,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
export {
  StyledIconContainer,
  StyledIconButton,
  StyledMenu,
  ScrollablePaper,
  EditorContainer,
  PdfPreviewContainer,
  FormContainer,
  LeftSection,
  RightSection,
  StyledDialogTitle,
  StyledTableHead,
  StyledTableCell,
  StyledLink,
  StyledAvatar,
};
