import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery,
  Link as MuiLink,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';

import { useState } from 'react';
import {
  MdNotificationsNone,
  MdInfoOutline,
  MdMenu,
  MdSupervisedUserCircle,
  MdVerifiedUser,
  MdPerson,
  MdSettings,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '@/routes/index';
import {
  CheckCircleRoundedIcon,
  MailIcon,
  PersonIcon,
} from 'assets/humanIcons';
import navImage from 'assets/img/layout/Navbar.png';
import ProfileImg from 'assets/img/profile/user-1.png';
import ProfileImgAuth from 'assets/img/profile/user-3.png';
import { useAuthStore } from 'contexts/AuthProvider';
import useMode from 'hooks/useMode';
import { SidebarResponsive } from '../sidebar/SidebarResponsive';
import { SearchBar } from './searchBar/SearchBar';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // width: '60%',
  background: theme.palette.common.white,
  boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
  borderRadius: '30px',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  p: '10px',
  flexDirection: 'row',
  width: { sm: '100%', md: 'auto' },
  maxWidth: '50%',
  flexWrap: {
    sm: 'wrap',
    md: 'nowrap',
  },
}));
export default function HeaderLinks(props) {
  const { secondary } = props;
  const { theme } = useMode();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { state } = useAuthStore(); // Use the useAuthStore hook to get state
  const { isAuthenticated } = state; // Destructure isAuthenticated from state
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mainMenuAnchorEl, setMainMenuAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMainMenuOpen = Boolean(mainMenuAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);
  const isInfoMenuOpen = Boolean(infoAnchorEl);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = event => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMainMenuOpen = event => {
    setMainMenuAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = event => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleInfoMenuOpen = event => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMainMenuClose = () => {
    setMainMenuAnchorEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleInfoMenuClose = () => {
    setInfoAnchorEl(null);
  };
  const navbarIcon = theme.palette.grey[500];
  const menuBg = theme.palette.common.white;
  const textColor = theme.palette.text.primary;
  const textColorBrand = theme.palette.primary.main;
  const shadow = '14px 17px 40px 4px rgba(112, 144, 176, 0.18)';
  const borderButton = theme.palette.divider;

  return (
    <StyledAppBar position="fixed" color="inherit" elevation={0} theme={theme}>
      <Toolbar>
        <SearchBar />
        <SidebarResponsive routes={routes} />
        <IconButton onClick={handleNotificationsMenuOpen}>
          <MdNotificationsNone color={navbarIcon} />
        </IconButton>
        <Menu
          anchorEl={notificationsAnchorEl}
          open={isNotificationsMenuOpen}
          onClose={handleNotificationsMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuList>
            <MenuItem>
              <Typography>No new notifications</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>View all notifications</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
        <IconButton onClick={handleInfoMenuOpen}>
          <MdInfoOutline color={navbarIcon} />
        </IconButton>
        <Menu
          anchorEl={infoAnchorEl}
          open={isInfoMenuOpen}
          onClose={handleInfoMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuList>
            <MenuItem>
              <Typography>App Info</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>Support</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
        <IconButton onClick={handleMainMenuOpen}>
          <MdSettings color={navbarIcon} />
        </IconButton>
        <Menu
          anchorEl={mainMenuAnchorEl}
          open={isMainMenuOpen}
          onClose={handleMainMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuList>
            <Box display="flex" flexDirection="column" p="10px">
              <MenuItem>
                <Typography color={textColor}>👋 Hey, Adela</Typography>
              </MenuItem>
              <MenuItem>
                <Typography>Profile Settings</Typography>
              </MenuItem>
              <MenuItem>
                <Typography>Newsletter Settings</Typography>
              </MenuItem>
              <MenuItem>
                <Typography color="error">Log out</Typography>
              </MenuItem>
            </Box>
          </MenuList>
        </Menu>
        {/* <IconButton onClick={handleProfileMenuOpen}>
          <Avatar
            sx={{ cursor: 'pointer', backgroundColor: '#11047A' }}
            name="Adela Parkson"
          />
        </IconButton> */}
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(anchorEl2 && {
              color: 'primary.main',
            }),
          }}
          onClick={handleClick2}
        >
          <Avatar
            src={isAuthenticated ? ProfileImgAuth : ProfileImg} // Use the authenticated profile image if authenticated
            alt="Profile"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        <Box>
          {/* ------------------------------------------- */}
          {/* Message Dropdown */}
          <Menu
            id="msgs-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            sx={{
              '& .MuiMenu-paper': {
                width: '200px',
              },
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonIcon width={20} />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <MailIcon width={20} />
              </ListItemIcon>
              <ListItemText>My Account</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <CheckCircleRoundedIcon width={20} />
              </ListItemIcon>
              <ListItemText>My Tasks</ListItemText>
            </MenuItem>
            <Box mt={1} py={1} px={2}>
              <Button
                to="/auth/login"
                variant="outlined"
                color="primary"
                component={Link}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

HeaderLinks.propTypes = {
  secondary: PropTypes.bool,
};
