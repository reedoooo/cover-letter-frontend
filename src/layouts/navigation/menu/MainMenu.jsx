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
  const textColor = '#8F9BBA';
  const textHover = '#1B2559';
  const iconColor = '#422AFB';
  const bgList = '#E9EDF7';
  const bgShadow = '14px 17px 40px 4px rgba(112, 144, 176, 0.08)';
  const bgButton = '#F4F7FE';
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
          '&:hover': {
            backgroundColor: '#E9EDF7',
          },
          '&:focus': {
            backgroundColor: '#F4F7FE',
          },
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
