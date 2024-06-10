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
import styled from 'styled-components';
import routes from '@/routes/index';
import navImage from 'assets/img/layout/Navbar.png';
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
        <IconButton onClick={handleProfileMenuOpen}>
          <Avatar
            sx={{ cursor: 'pointer', backgroundColor: '#11047A' }}
            name="Adela Parkson"
          />
        </IconButton>
        <Menu
          anchorEl={profileAnchorEl}
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuList>
            <Box
              component="img"
              src={navImage}
              alt="Navbar Image"
              style={{ borderRadius: '16px', marginBottom: '28px' }}
            />
            <Box display="flex" flexDirection="column">
              <MuiLink href="https://horizon-ui.com/pro" target="_blank">
                <Button fullWidth variant="contained">
                  Buy Horizon UI PRO
                </Button>
              </MuiLink>
              <MuiLink
                href="https://horizon-ui.com/documentation/docs/introduction"
                target="_blank"
              >
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ borderColor: borderButton }}
                >
                  See Documentation
                </Button>
              </MuiLink>
              <MuiLink
                href="https://github.com/horizon-ui/horizon-ui-chakra"
                target="_blank"
              >
                <Button fullWidth variant="text" color={textColor}>
                  Try Horizon Free
                </Button>
              </MuiLink>
            </Box>
          </MenuList>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
}

HeaderLinks.propTypes = {
  secondary: PropTypes.bool,
};
