import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import React from 'react';
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
} from 'react-icons/md';
import useMode from 'hooks/useMode';

export const MainMenu = props => {
  const { ...rest } = props;
  const { colorModeValues } = useMode();
  const textColor = colorModeValues('secondaryGray.500', 'white');
  const textHover = colorModeValues(
    { color: 'secondaryGray.900', bg: 'unset' },
    { color: 'secondaryGray.500', bg: 'unset' }
  );
  const iconColor = colorModeValues('brand.500', 'white');
  const bgList = colorModeValues('white', 'whiteAlpha.100');
  const bgShadow = colorModeValues(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );
  const bgButton = colorModeValues('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = colorModeValues(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' }
  );
  const bgFocus = colorModeValues(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' }
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box {...rest}>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: bgButton,
          '&:hover': bgHover,
          '&:focus': bgFocus,
          width: '37px',
          height: '37px',
          lineHeight: '100%',
          borderRadius: '10px',
        }}
      >
        <MdOutlineMoreHoriz color={iconColor} size="24px" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        sx={{
          width: '150px',
          backdropFilter: 'blur(63px)',
          backgroundColor: bgList,
          boxShadow: bgShadow,
          borderRadius: '20px',
          padding: '15px',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            transition: '0.2s linear',
            color: textColor,
            '&:hover': textHover,
            padding: '0px',
            borderRadius: '8px',
            marginBottom: '10px',
            '&:active': { backgroundColor: 'transparent' },
            '&:focus': { backgroundColor: 'transparent' },
          }}
        >
          <ListItemIcon>
            <MdOutlinePerson size="16px" />
          </ListItemIcon>
          <ListItemText
            primary="Panel 1"
            primaryTypographyProps={{
              fontSize: 'sm',
              fontWeight: 400,
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            transition: '0.2s linear',
            color: textColor,
            '&:hover': textHover,
            padding: '0px',
            borderRadius: '8px',
            marginBottom: '10px',
            '&:active': { backgroundColor: 'transparent' },
            '&:focus': { backgroundColor: 'transparent' },
          }}
        >
          <ListItemIcon>
            <MdOutlineCardTravel size="16px" />
          </ListItemIcon>
          <ListItemText
            primary="Panel 2"
            primaryTypographyProps={{
              fontSize: 'sm',
              fontWeight: 400,
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            transition: '0.2s linear',
            color: textColor,
            '&:hover': textHover,
            padding: '0px',
            borderRadius: '8px',
            marginBottom: '10px',
            '&:active': { backgroundColor: 'transparent' },
            '&:focus': { backgroundColor: 'transparent' },
          }}
        >
          <ListItemIcon>
            <MdOutlineLightbulb size="16px" />
          </ListItemIcon>
          <ListItemText
            primary="Panel 3"
            primaryTypographyProps={{
              fontSize: 'sm',
              fontWeight: 400,
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            transition: '0.2s linear',
            color: textColor,
            '&:hover': textHover,
            padding: '0px',
            borderRadius: '8px',
            marginBottom: '10px',
            '&:active': { backgroundColor: 'transparent' },
            '&:focus': { backgroundColor: 'transparent' },
          }}
        >
          <ListItemIcon>
            <MdOutlineSettings size="16px" />
          </ListItemIcon>
          <ListItemText
            primary="Panel 4"
            primaryTypographyProps={{
              fontSize: 'sm',
              fontWeight: 400,
            }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MainMenu;
